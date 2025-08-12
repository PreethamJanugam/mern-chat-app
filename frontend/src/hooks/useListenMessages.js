import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notifications.mp3"
const useListenMessages = () => {
    const { socket } = useSocketContext();
    
    const { addMessage } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake =true;
            const sound = new Audio(notificationSound);
            sound.play();
            addMessage(newMessage);
        });

        
        return () => socket?.off("newMessage");
    }, [socket, addMessage]);
};

export default useListenMessages;