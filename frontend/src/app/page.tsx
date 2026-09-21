import Highlights from "@root/components/pages/home/highlights/highlights";
import Footer from "@components/global/footer/footer";
import Navbar from "@components/global/navbar/navbar";
import { CarouselStateProvider } from "@root/contexts/carousel/carouselContext";
import UpcomingEvents from "@root/components/pages/home/upcoming-events/upcoming-events";
import Container from "@root/components/global/container";

export default function Home() {

  return (
    <>
      <Navbar />
      <CarouselStateProvider>
        <Highlights />
      </CarouselStateProvider>
      <Container background="dark">
        <UpcomingEvents/>
      </Container>
      <Footer />
    </>
  );
}
