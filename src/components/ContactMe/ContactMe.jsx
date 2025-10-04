import React, { useEffect, useState } from 'react';
import { FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import './contactMe.css'
import { IoCallOutline } from "react-icons/io5";
const ContactMe = () => {
    const [loading, setLoading] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: ""
    });
    const handleErrors = () => {
        const newErrors = {
            name: "",
            email: "",
            message: ""
        }
        let isValid = true;
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = `Please enter the ${key} `
                isValid = false;
            }
            else {
                newErrors[key] = ''
            }
        });
        setErrors(newErrors);
        return isValid;
    }
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setFormData(prev => (
            { ...prev, [name]: value }
        ))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(formData, "this is the formdata");
        const isValid = handleErrors();
        if (!isValid) {
            setLoading(false);
            console.log("Please fix the form errors")
            return;
        }
        const formDataToSend = new FormData(e.target);
        // return
        formDataToSend.append("access_key", import.meta.env.VITE_W3_FORMS_ACCESS_KEY);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: "POST",
            body: formDataToSend
        });
        const data = await response.json();
        console.log(data, "this si the dataaa");
        if (data.success) {
            setLoading(false)
            e.target.reset();
            alert("Email sent successfully!")
        }
        else {
            console.log("Error", data);
            setLoading(false)
            alert("Can't Send email!!!")
        }


    }
    return (
        <div className='contactMe' id='Contact'>
            <h1 className='contactTitle'>
                Get in touch
            </h1>
            <div className='contactMeSubDiv'>
                <div className='contactSection'>
                    <div className='contactLeft'>
                        <h1>Let's talk</h1>
                        <p>I'm currently open to new projects, so please feel free to reach out!</p>
                        <div className='contactDetails'>
                            <FiMail />
                            <a href='mailto:veena.raagi@gmail.com?subject=Inquiry from Portfolio'>veena.raagi@gmail.com</a>
                        </div>
                        <div className='contactDetails'>
                            <GrLocation />
                            <a href='https://maps.app.goo.gl/t5RjRMs4q5QfsN9b8' target='_blank'>  Shivam Road, Tarnaka, Hyderabad.</a>
                        </div>
                        {/* <div className='contactDetails'>
                            <IoCallOutline />
                            <a href='tel: +916309167613'>+91 6309167613</a>
                        </div> */}
                    </div>
                </div>
                <form className='contactRight' onSubmit={(e) => handleSubmit(e)}>
                    <div className='partitionDiv'>
                        <div className='formLabelDiv'>
                            <label>Your Name: <span>*</span></label>
                            <input type='text' placeholder='Enter your name' name='name'
                                onChange={handleFormChange}
                            />
                            {errors && errors?.name}
                        </div>
                        <div className='formLabelDiv' >
                            <label>Your Email: <span>*</span></label>
                            <input type='email' name='email' placeholder='Enter your mail' onChange={handleFormChange} />
                            {errors && errors?.email}
                        </div>
                    </div>
                    <div className='messageDiv'>
                        <label>Write your message here:<span>*</span></label>
                        <textarea name='message' cols={8} placeholder='Enter your message here' onChange={handleFormChange}></textarea>
                        {errors && errors?.message}
                    </div>
                    {/* <button className='submitButton' disabled={loading} type='submit'>Submit</button> */}
                    <button className='submitButton' disabled={loading} type='submit'>
                        {loading ? (
                            <>
                                Sending...
                                <span className='spinner'>
                                </span>
                            </>
                        ) : ("Send Message")}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default ContactMe;
