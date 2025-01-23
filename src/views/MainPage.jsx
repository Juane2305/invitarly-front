import Header from '../components/Header'
import { ImagenPrincipal } from '../components/ImagenPrincipal'
import TestimonialSlider from '../components/TestimonialSlider'
import Funciones from '../components/Funciones'
import PlantillasSection from '../components/PlantillasSection'
import Banner from '../components/Banner'
import PlanesSection from '../components/PlanesSection'

export const MainPage = () => {
  return (
    <div>
        <Header/>
        <ImagenPrincipal/>
        <Funciones/>
        <Banner/>
        <PlanesSection/>
        <TestimonialSlider/>
    </div>
  )
}
