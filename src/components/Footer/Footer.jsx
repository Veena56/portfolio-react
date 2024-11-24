import React from 'react';
import { GoPerson } from "react-icons/go";
import './Footer.css'
const Footer = () => {
  return (
    <div>
      <div className='footer'>
        <div className='footerTop'>
          <div>
            <h1>Veena Ragi</h1>
            <p>I am a web developer with 6 months of experience.
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
            <p>Term of Services</p>
            <p>Privacy Policy</p>
            <p>Connect With Me</p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Footer;
