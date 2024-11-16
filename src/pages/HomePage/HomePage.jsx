import AboutUs from "@/components/AboutUs/AboutUs";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import ListProduct from "@/components/ListProduct/ListProduct";
import Section from "@/components/Section/Section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ListProduct />
      <AboutUs />
      <Section />
      <Footer />
    </>
  );
}
