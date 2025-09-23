import React from 'react';
import './Services.css'
import ProjectData from './ProjectData';
const Services = () => {
  return (
    <div className='services' id='Services'>
      <div className='servicesTitle'>
        <h1>My Projects</h1>
        <div className='servicesContainer'>
          {ProjectData.map((item,index)=>(
            <div key={index} className='serviceFormat'>
            <h3> {item.pNo}</h3>
              <h2>{item.pName}</h2>
              <p>{item.pDesc}</p>
              {/* <div className='servicesReadmore'>
                <p style={{fontWeight:"600"}}>{item.technologiesUsed}</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
