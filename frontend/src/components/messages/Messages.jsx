import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useRef,useEffect } from "react";
import useListenMessages from "../../hooks/useListenMessages";

 const Messages = () => {
	const {messages,loading} = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(()=>{setTimeout(()=>{lastMessageRef.current?.scrollIntoView({behaviour: "smooth"});},100);},[messages]);
 	return (
 		<div className='px-4 flex-1 overflow-auto'>
			{!loading && Array.isArray(messages) && messages.length > 0 && messages.map((message)=>(<div  ref={lastMessageRef}>
				<Message key = {message._id} message={message}></Message>
			</div>))}
 			{loading && [...Array(3)].map((_,idx)=><MessageSkeleton key = {idx}/>)}
 		
		{!loading && messages.length==0 &&(<p className="text-center text-white">Send a message to conversation</p>)}
		</div>
 	);
 };	
 export default Messages;