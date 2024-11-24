import React from 'react';
import './hero.css'
import profileImg from '../assets/PortFolioProfile.jpeg'
import passPortPic from '../assets/PassPortAI.png'

const Hero = () => {
  const handleSetMenu = (attribute) => {
    console.log(attribute, "this is what we are setting");
    // setMenu(attribute)
   const section= document.getElementById(attribute)
   if(section){
    section.scrollIntoView({behavior:'smooth'})
   }
  }
  return (
    <div className='hero' id='Home'>
      <div className='profileImgDiv'>
        <img src={passPortPic} alt='noProPic' className='profileImg'></img>
      </div>
      <p><span>I'm Veena Ragi</span>-working as a Web Developer. I am good at React, Node JS.</p>
      <p>I am Web Developer from Hyderabad, India with 6 months of experience.</p>
      <div className='resumeButtonContainer'>
      <button className='connectButton' onClick={() => handleSetMenu("Contact")}>Connect With Me</button>
      <button className='myResumeButton'>My Resume</button>
      </div>

    </div>
  );
}

export default Hero;
