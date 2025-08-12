import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';
export const login =async (req,res)=>
{
   
    const {username,password} =req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
    if(!user || !isPasswordCorrect)
        return res.status(201).json({error: "Invalid User or Password"});
    generateTokenAndSetCookie(user._id,res);
    res.status(200).json({
        _id :user._id,
        fullName:user.fullName,
        username:user.username,
        profilepic:user.profilepic,
    });
    console.log("Login");
};
export const logout=(req,res)=>
{   
    try
    {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logout successful"});
    }
    catch(error)
    {
         console.log("Internal Error in logout controller ",error.message);
        req.status(500).json({error:"Internal server error"});
    }
};
export const signup=async (req,res)=>
{
    console.log(req.body);
    try{
        const {fullName,userName: username,password,confirmPassword,gender}= req.body;
        if(password!=confirmPassword)
        {   console.log("Password do not match!");
            return res.status(400).json({error : "Password do not match!"});
        }
        const user = await User.findOne({username});
        if(user)
        {
            console.log(user);
            return res.status(400).json({error : "User Exists !"})
        }
        //http://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilepic : gender=="male"?boyProfilePic:girlProfilePic,
        })
        if(newUser)
        {   
         generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id :newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilepic:newUser.profilepic,
        });
        }
        
    }
    catch(error)
    {
        console.log("Internal server error",error.message)
        res.status(500).json({error:"Internal server error"});
    }
    console.log("signin");
};