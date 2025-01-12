import Header from '../components/Header'
import { ImagenPrincipal } from '../components/ImagenPrincipal'
import TestimonialSlider from '../components/TestimonialSlider'
import Funciones from '../components/Funciones'
import PlantillasSection from '../components/PlantillasSection'

export const MainPage = () => {
  return (
    <div>
        <Header/>
        <ImagenPrincipal/>
        <Funciones/>
        <PlantillasSection/>
        <TestimonialSlider/>
    </div>
  )
}
