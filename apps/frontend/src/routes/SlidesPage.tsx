import TopBanner from "../components/TopBanner.tsx";
import MainCarousel from "../components/Carousel.tsx";

function MapPage() {
  return (
    <>
      <div
        style={{
          // Set the background image
          backgroundColor: "#FCFCFC",
        }}
      >
        <TopBanner />
        <MainCarousel />
      </div>
    </>
  );
}

export default MapPage;
