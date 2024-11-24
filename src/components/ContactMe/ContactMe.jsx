import React, { useState } from 'react';
import { FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import './contactMe.css'
import { IoCallOutline } from "react-icons/io5";
const ContactMe = () => {
    const [result, setResult] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult("Sending...")
        const formData = new FormData(e.target);
        formData.append("access_key", "1b304226-62f1-4e1f-8b9a-e347992d300e")
        const response = await fetch('https://api.web3forms.com/submit', {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        if (data.success) {
            setResult("Form Submitted Successfully")
            e.target.reset();
            alert("Email sent successfully!")

        }
        else {
            console.log("Error", data);
            setResult(data.message);
            alert("Can't Send email!!!")
        }

    }
    return (
        <div className='contactMe' id='Contact'>
            <div className='contactTitle'>
                Get in touch
            </div>
            <div className='contactMeSubDiv'>
                <div className='contactSection'>
                    <div className='contactLeft'>
                        <h1>Let's talk</h1>
                        <p>I'm currently open to new projects, so please feel free to reach out!</p>
                        <div className='contactDetails'>
                            <FiMail />
                            <p>veena.raagi@gmail.com</p>
                        </div>
                        <div className='contactDetails'>
                            <GrLocation />
                            <p>  Shivam Road, Tarnaka, Hyderabad.</p>
                        </div>
                        <div className='contactDetails'>
                            <IoCallOutline />
                            <p>+91 6309167613</p>
                        </div>
                    </div>
                </div>
                <form className='contactRight' onSubmit={(e) => handleSubmit(e)}>
                    <label>Your Name: <span>*</span></label>
                    <input type='text' placeholder='Enter your name' name='name' />
                    <label>Your Email: <span>*</span></label>
                    <input type='email' placeholder='Enter your mail' />
                    <label>Write your message here:<span>*</span></label>
                    <textarea name='message' cols={8} placeholder='Enter your message here' ></textarea>
                    <button className='submitButton' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ContactMe;
