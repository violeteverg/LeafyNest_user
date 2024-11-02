import AboutUs from "@/components/aboutUs/AboutUs";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import ListProduct from "@/components/listProduct/listProduct";
import Section from "@/components/section/Section";

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
