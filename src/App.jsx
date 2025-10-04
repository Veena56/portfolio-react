import './App.css';
import './components/Global.css';
import About from './components/About/About';
import ContactMe from './components/ContactMe/ContactMe';
import Footer from './components/Footer/Footer';
import Hero from './components/HeroSection/Hero';
import MyWork from './components/MyWork/MyWork';
import Services from './components/Services/Services';
import Navbar from './components/navbar/Nav'; 


function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <MyWork/>
      <ContactMe />
      <Footer/>
    </>
  )
}

export default App
