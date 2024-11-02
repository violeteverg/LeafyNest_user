import AboutUs from "./components/aboutUs/AboutUs";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import ListProduct from "./components/listProduct/listProduct";
import Navbar from "./components/navbar/Navbar";
import Section from "./components/section/Section";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ListProduct />
      <AboutUs />
      <Section />
      <Footer />
    </>
  );
}

export default App;
