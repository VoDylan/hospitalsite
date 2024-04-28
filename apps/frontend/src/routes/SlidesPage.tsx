import Carousel from "../components/homepage/Carousel.tsx";
import ServicesPreview from "../components/homepage/ServicesPreview.tsx";
import HeroText from "../components/homepage/HeroText.tsx";

function MapPage() {
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
        }}
      >
        <Carousel />
        <ServicesPreview />
        <HeroText />
      </div>
    </>
  );
}

export default MapPage;
