import React, { useState } from 'react';
import './chatBot.css'
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
const ChatBot = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const generateBotResponse=async(history)=>{
        console.log(history,"this is the history");
        // const envURL=process.env.VITE_API_URL;
        const envFileDhi=import.meta.env;
        const url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=AIzaSyAddbnbO_wfAbH4Yug-miwR1SZy61nMUiQ";
         console.log(envFileDhi,"bbbbbbbbbbbbb");
        console.log(import.meta.env.VITE_API_URL,"vvvvvvvvvvvvvvvv");
        history=history.map(({role,text})=>({role,parts:[{text}]}))
        console.log(history);
        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                contents:history
            })
        }
        try {
            const response=await fetch(url,requestOptions);
            const data=await response.json();
            console.log(data,"thhis is the data in response");
            // if(!response) throw new Error(data.error.message||"Something went wrong")
            if (!response) throw new Error(data.error.message || "Something went wrong");

        } catch (error) {
            console.log(error,"this is the error i got");
        }
        
    }
    return (
        <div className='chatBotContainer'>
            <div className='chatbotPopup'>
                <div className='chatHeader'>
                    <div className='headerInfo'>
                        <h2 className='logoText'>ChatBot</h2>
                    </div>
                    <button>
                        down arrow
                    </button>
                </div>
                {/* chat body */}
                <div className='chatBody'>
                    <div className='message botMessage'>
                        {/* rendering the chat dynamically */}
                        {/* <SiChatbot /> */}
                    </div>
                    <p>Hi there! how can I help uh today?</p>
                    {chatHistory.map((chatItem, index) => (
                        <ChatMessage key={index} chatItem={chatItem} />
                    ))}
                </div>
                <div className='chatFooter'>
                    <ChatForm setChatHistory={setChatHistory} chatHistory={chatHistory} 
                     generateBotResponse={generateBotResponse}
                        
                     />
                </div>
            </div>
        </div>
    );
}

export default ChatBot;
