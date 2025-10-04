import React from 'react';
import { GoPerson } from "react-icons/go";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import './Footer.css'
const Footer = () => {
  return (
    <div>
      <div className='footer'>
        <div className='footerTop'>
          <div>
            <h1>Veena Ragi</h1>
            <p>
              {/* I am a web developer with 1.6 years of experience. */}
              I don’t just code — I debug, optimize, and deliver growth.
            </p>
          </div>
          <div className='footerTopRight'>
            <div className='footerWithEmailInput'>
              <GoPerson />
              <input type='email' placeholder='Enter your email' />
            </div>
            <div className='footerSubscribeBtn'>Subscribe</div>
          </div>
        </div>
        <hr />
        <div className='footerBottom'>
          <p className='footerBottomLeft'>
            © 2024 Veena Ragi. All rights reserved.
          </p>
          <div className='footerBottomRight'>
            <a >
              <FaLinkedin />
            </a>
            <a>
              <FaGithub />
            </a>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Footer;
