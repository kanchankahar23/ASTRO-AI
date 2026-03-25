import AboutUs from '../components/Home/AboutUs'
import HeroSection from '../components/Home/Herosection'
// import HeroSection from '../components/Home/HeroSection'
import HoroscopeSection from '../components/Home/HoroscopeSection'
import ServicesSection from '../components/Home/ServicesSection'

const Home = () => {
    return (
        <div  style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>          
            <HeroSection/>
            <HoroscopeSection />
            <AboutUs/>
            <ServicesSection />
        </div>
    )
}

export default Home