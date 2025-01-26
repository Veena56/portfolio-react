import React from 'react';

const ChatMessage = ({ chatItem }) => {

    return (
        <div className={`message ${chatItem.role === "model" ? "bot" : "user"}-Message`}>
            {chatItem.role === 'model' }
            <p className='messageText'>{chatItem.text}</p>
        </div>
    );
}

export default ChatMessage;
