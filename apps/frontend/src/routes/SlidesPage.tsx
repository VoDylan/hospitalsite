import Carousel from "../components/homepage/Carousel.tsx";
import ServicesPreview from "../components/homepage/ServicesPreview.tsx";
import HeroText from "../components/homepage/HeroText.tsx";

function HeroPage() {
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
        }}
      >
        <Carousel />
        <HeroText/>
        <ServicesPreview />
      </div>
    </>
  );
}

export default HeroPage;
