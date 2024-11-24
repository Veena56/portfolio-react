import './App.css'
import About from './components/About/About'
import ScientificCalculator2 from './components/Calc/Calc2'
import ContactMe from './components/ContactMe/ContactMe'
import Footer from './components/Footer/Footer'
import Hero from './components/HeroSection/Hero'
import MyWork from './components/MyWork/MyWork'
import Services from './components/Services/Services'
import Navbar from './components/navbar/navbar'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      {/* <ScientificCalculator2/> */}
      {/* <MyWork/> */}
      <ContactMe />
      {/* <ScientificCalculator2/> */}
      <Footer/>
    </>
  )
}

export default App
