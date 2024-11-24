import React from 'react';
import './Services.css'
import ServiceData from './ServiceData';
import { FaArrowRight } from "react-icons/fa6";
const Services = () => {
  return (
    <div className='services' id='Services'>
      <div className='servicesTitle'>
        <h1>My Services</h1>
        <div className='servicesContainer'>
          {ServiceData.map((item,index)=>(
            <div key={index} className='serviceFormat'>
            <h3> {item.sNo}</h3>
              <h2>{item.sName}</h2>
              <p>{item.sDesc}</p>
              <div className='servicesReadmore'>
                <p style={{fontWeight:"600"}}>{item.technologiesUsed}</p>
                
                {/* <FaArrowRight /> */}
              </div>
            </div>
           
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
