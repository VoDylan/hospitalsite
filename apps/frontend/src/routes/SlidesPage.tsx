import TopBanner from "../components/banner/TopBanner.tsx";
import MainCarousel from "../components/homepage/Carousel.tsx";

function MapPage() {
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
        }}
      >
        <TopBanner />
        <MainCarousel />
      </div>
    </>
  );
}

export default MapPage;
