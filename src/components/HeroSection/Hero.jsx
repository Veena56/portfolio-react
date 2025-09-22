import React from 'react';
import './hero.css';
import profileImg from '../assets/PortFolioProfile.jpeg';
import passPortPic from '../assets/PassPortAI.png';

const Hero = () => {
  // const myResume = '/Resume-Veena Ragi.pdf';
  const handleSetMenu = (attribute) => {
    console.log(attribute, "this is what we are setting");
    // setMenu(attribute)
    const section = document.getElementById(attribute)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const handleViewPdf = () => {
    window.open("/portfolio-react/Resume_Veena_Ragi_full stack developer.pdf", "_blank"); // Opens in a new tab
  };
  return (
    <div className='hero' id='Home'>
      <div className='profileImgDiv'>
        <img src={passPortPic} alt='noProPic' className='profileImg'></img>
      </div>
      <p><span>Hi! I'm Veena Ragi</span>
        - A passionate Full Stack Developer with 
        {/* ~2 years of */}
        {} experience in building scalable, responsive web applications.
      </p>
      <p>
        {/* I love solving problems, writing clean code, and turning ideas into impactful digital products. */}
        I don’t just code — I debug, optimize, and deliver growth.
      </p>
      <div className='resumeButtonContainer'>
        <button className='connectButton' onClick={() => handleSetMenu("Contact")}>Connect With Me</button>
        <button className='myResumeButton' onClick={handleViewPdf} >My Resume</button>
      </div>

    </div>
  );
}

export default Hero;
