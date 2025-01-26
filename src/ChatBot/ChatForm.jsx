import React, { useEffect, useRef } from 'react';

const ChatForm = ({chatHistory,setChatHistory,generateBotResponse}) => {

    const inputRef=useRef();
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        const userMessage=inputRef.current.value.trim();
        if(!userMessage) return
        inputRef.current.value=''
        setChatHistory(prev=>[...prev,{role:"user",text:userMessage}])
        console.log(userMessage,"this is the user message");
        console.log(inputRef.current);
        setTimeout(() => {
        setChatHistory(prev=>[...prev,{role:"model",text:"Thinking..."}])
        console.log();
         generateBotResponse([...chatHistory,{role:"user",text:"Thinking..."}])

        }, 600);
    }
useEffect(()=>{
    console.log(chatHistory,"this is the chat history");
},[chatHistory])
    return (
        <div>
            <form onSubmit={handleFormSubmit} className='chatForm'>
                <input ref={inputRef}  type='text' placeholder='Message...' className='messageInput' required />
                <button type='submit'>
                    up arrow
                </button>
            </form>
        </div>
    );
}

export default ChatForm;
