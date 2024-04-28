import Carousel from "../components/homepage/Carousel.tsx";
import ServicesPreview from "../components/homepage/ServicesPreview.tsx";
import HeroButtons from "../components/homepage/HeroButtons.tsx";
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
        <HeroButtons />
      </div>
    </>
  );
}

export default HeroPage;
