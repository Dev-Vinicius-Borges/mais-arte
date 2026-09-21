import Highlights from "@components/pages/highlights/highlights";
import Footer from "@components/global/footer/footer";
import Navbar from "@components/global/navbar/navbar";
import { CarouselStateProvider } from "@root/contexts/carousel/carouselContext";

export default function Home() {

  return (
    <>
      <Navbar />
      <CarouselStateProvider>
        <Highlights />
      </CarouselStateProvider>
      <Footer />
    </>
  );
}
