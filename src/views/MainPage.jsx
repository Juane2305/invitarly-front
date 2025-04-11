import Header from '../components/Header'
import { ImagenPrincipal } from '../components/ImagenPrincipal'
import TestimonialSlider from '../components/TestimonialSlider'
import Funciones from '../components/Funciones'
import Banner from '../components/Banner'
import PlanesSection from '../components/PlanesSection'
import FAQSection from '../components/FAQSection'
import Footer from '../components/Footer'
import ContactSection from '../components/ContactSection'
import ScrollEfecto from '../components/ScrollEfecto'

const MainPage = () => {
  return (
    <div>
        <Header/>
        <ImagenPrincipal/>
        <ScrollEfecto/>
        <Funciones/>
        <Banner/>
        <PlanesSection/>
        <TestimonialSlider/>
        <FAQSection/>
        <ContactSection/>
        <Footer/>
    </div>
  )
}

export default MainPage;
