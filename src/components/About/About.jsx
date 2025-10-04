import React from 'react';
import profile from '../assets/VeenaProfileCropped3.png'
import './About.css'
const About = () => {
    return (
        <div className='about' id='AboutMe'>
            <h1>About Me</h1>
            <div className='aboutSections'>
                <div className='aboutLeft'>
                    <div className='aboutProPic'>
                        <img src={profile} alt='no profile pic' />
                    </div>
                </div>
                <div className='aboutRight'>
                    <div className='aboutPara'>
                        <p>Full Stack Developer – passionate about debugging and optimizing systems to deliver solutions that directly boost business growth.</p>
                    </div>
                    <div className='aboutSkillsContainer'>
                        <div className='skill'>
                            <p>HTML & CSS</p>
                            <hr style={{ width: '60%' }} />
                        </div>
                        <div className='skill'>
                            <p>React JS</p>
                            <hr style={{ width: '70%' }} />
                        </div>
                        <div className='skill'>
                            <p>JavaScript</p>
                            <hr style={{ width: '60%' }} />
                        </div>
                        <div className='skill'>
                            <p>MySQL</p>
                            <hr style={{ width: '50%' }} />
                        </div>
                        <div className='skill'>
                            <p>Node JS</p>
                            <hr style={{ width: '50%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default About;
