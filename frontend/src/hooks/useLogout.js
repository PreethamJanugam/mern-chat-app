import React from 'react'
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
const useLogout = () => {
  const [Loading,setLoading]=useState(false);
  const {setAuthUser} = useAuthContext();
  const logout = async()=>{
    setLoading(true);
    try
    {
        const res = await fetch("/api/auth/logout",{
                method:"POST",
                headers:{"Context-Type":"application/json"},
        });
        const data = await res.json();
        if(data.error)
        {
            throw new Error(data.error);
        }
        localStorage.removeItem("chat-user");
        setAuthUser(null);
    }
    catch(e)
    {
        toast.error(e.message);
    }
    finally{
        setLoading(false);
    }
  }
  return {Loading,logout};
};

export default useLogout;
