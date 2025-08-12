import Conversation from "../models/conversation.model.js";
import Message from "../models/messages.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js"; // Make sure io is imported

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId],
            });
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Run database saves in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // --- SOCKET.IO LOGIC ---
        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId) {
            // io.to(<socket_id>).emit() is used to send events to a specific client
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        // --- SEND RESPONSE LAST ---
        // Only send the response after all database and socket operations are successful
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        // This will now only run if an error occurs BEFORE a response is sent
        res.status(500).json({ error: "Internal server error" });
    }
};
export const getMessage =async (req,res)=>{
    try{
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants :{$all :[senderId,userToChatId]},
        }).populate("messages");
        if(!conversation)
        {
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
        res.status(200).json(messages);
    }
    catch(error){
        console.log("errore occured in get message Controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
};