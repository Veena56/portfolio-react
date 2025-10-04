import React, { useEffect, useState } from 'react';
import './hero.css';
import passPortPic from '../assets/VeenaProfileCropped3.png';

const Hero = () => {
  const texts=["Full Stack Developer", "Debugging Expert", "Problem Solver"];
  const [text, setText]=useState("");
  const[count,setCount]=useState(0);
  const[index,setIndex]=useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  // useEffect(()=>{
  //   const currentText=texts[index];
  //   let typingSpeed = isDeleting ? 50 : 120;
  //   const timeout=setTimeout(() => {
  //     if(!isDeleting){
  //       setText(currentText.substring(0,count+1));
  //       setCount(count+1);
  //       if(count+1===currentText.length){
  //         setIsDeleting(true);
  //       }
  //     }
  //     else{
  //       setText(currentText.substring(0,count-1));
  //       setCount(count-1);
  //       if(count-1===0){
  //         setIsDeleting(false);
  //         setIndex((index+1)%texts.length);
  
  //       }
  //     }
  //   })
  //   return ()=>clearTimeout(timeout)
  //   },[count,isDeleting,index,texts]);



  // const myResume = '/Resume-Veena Ragi.pdf';
  
  useEffect(() => {
    const currentText = texts[index];
    let typingSpeed = isDeleting ? 50 : 120; // faster delete, slower type

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // typing
        setText(currentText.substring(0, count + 1));
        setCount(count + 1);

        if (count + 1 === currentText.length) {
          // pause before deleting
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        // deleting
        setText(currentText.substring(0, count - 1));
        setCount(count - 1);

        if (count - 1 === 0) {
          setIsDeleting(false);
          setIndex((index + 1) % texts.length); // move to next word
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [count, isDeleting, index, texts]);

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
      {/* <div className='profileImgDiv'>
        <img src={passPortPic} alt='noProPic' className='profileImg'></img>
      </div> */}
      <div className='profileTextDiv'>
      <p><span>Hi! I'm Veena Ragi</span> </p>
        <span className="typing">- {text}</span>
      <p>
      {/* with  */}
        {/* { } experience in building scalable, responsive web applications. */}
        Building Scalable, High-Performance Web Solutions.
      </p>
      <p>
        I don’t just code — I debug, optimize, and deliver growth.
      </p>
      <div className='resumeButtonContainer'>
        <button className='connectButton' onClick={() => handleSetMenu("Contact")}>Connect With Me</button>
        <button className='myResumeButton' onClick={handleViewPdf} >My Resume</button>
      </div>
      </div>
    </div>
  );
}

export default Hero;
