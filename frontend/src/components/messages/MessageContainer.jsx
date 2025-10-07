// src/components/messages/MessageContainer.jsx

import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useConversation from '../../zustand/useConversation';
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { IoArrowBack } from "react-icons/io5"; // Import a back icon

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        // This cleanup function runs when the component unmounts
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        // 1. Apply conditional classes to this container
        <div 
            className={`md:min-w-[450px] flex-col 
                       ${selectedConversation ? "flex" : "hidden sm:flex"}`}
        >
            {!selectedConversation ? <NoChatSelected /> : (
                <>
                    {/* Header */}
                    <div className='bg-slate-500 px-4 py-2 mb-2 flex items-center gap-3'>
                        {/* 2. Add the back button for mobile */}
                        <button 
                            className="btn btn-circle btn-sm sm:hidden" 
                            onClick={() => setSelectedConversation(null)}
                        >
                            <IoArrowBack />
                        </button>
                        <span className='label-text'>To:</span> 
                        <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome {authUser.fullName} 👋</p>
                <p>Select a chat to start messaging</p>
            </div>
        </div>
    );
};

export default MessageContainer;