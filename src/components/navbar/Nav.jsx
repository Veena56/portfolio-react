import React, { useRef, useState } from 'react';
import './navbar.css'
import logo2 from '../../assets/transparent-background-logo-8.png'
import { CiMenuFries } from "react-icons/ci";
const Navbar = () => {
  
  const [menu, setMenu] = useState("");
  const[isMenuOpen,setIsMenuOpen]=useState(false)
  const menuRef=useRef()
  const openMenu=()=>{
    setIsMenuOpen(prev=>!prev)
    isMenuOpen?menuRef.current.style.right="-350px": menuRef.current.style.right="0"
   ;
  }

  const handleSetMenu = (attribute,event) => {
    event.preventDefault();
    console.log(attribute, "this is what we are setting");
    setMenu(attribute)
   const section= document.getElementById(attribute)
   if(section){
    section.scrollIntoView({behavior:'smooth'})
   }
  }

  return (
    <div className='navBar'>
      <div className='navBarImg'>
        <img src={logo2} alt='no logo img'></img>
        <CiMenuFries className={`menuOpen ${isMenuOpen?"":""}`} onClick={openMenu}/>
        {/* <IoMdClose className={`menuClose ${isMenuOpen?"show":"hide"}`}onClick={closeMenu}/> */}

      </div>
      <ul className='navMenu' ref={menuRef}>
        <li onClick={(e) => handleSetMenu("Home",e)}><a href='home'><p className={menu === "Home" ? "underLine" : ""} >Home</p></a></li>
        <li onClick={(e) => handleSetMenu("AboutMe",e)}> <a href='about'><p className={menu === "AboutMe" ? "underLine" : ""} >About Me</p></a></li>
        <li onClick={(e) => handleSetMenu("myProjects",e)}><a href='myProjects'><p className={menu === "myProjects" ? "underLine" : ""} >My Projects</p></a></li>
        {/* <li onClick={(e) => handleSetMenu("Portfolio",e)}><a href='portfolio'><p className={menu === "Portfolio" ? "underLine" : ""} >Portfolio</p></a></li> */}
       <li onClick={(e) => handleSetMenu("Contact",e)}> <a href='contactMe'><p className={menu === "Contact" ? "underLine" : ""} >Contact</p></a></li> 
      </ul>
      <div className='navConnect' onClick={(e) => handleSetMenu("Contact",e)}>Connect With Me</div>
    </div>
  );
}
export default Navbar;
