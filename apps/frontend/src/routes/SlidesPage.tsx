import TopBanner from "../components/TopBanner.tsx";
import MainCarousel from "../components/Carousel.tsx";

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
