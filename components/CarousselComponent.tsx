import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface CarouselComponentProps {
  children: React.ReactNode;
  setApi?: (api: CarouselApi) => void;
}

const CarouselComponent = ({ children, setApi }: CarouselComponentProps) => {
  return (
    <Carousel className="w-full" setApi={setApi}>
      <CarouselContent>{children}</CarouselContent>
      {/* <CarouselPrevious className="text-white" />
      <CarouselNext className="text-white" /> */}
    </Carousel>
  );
};

export default CarouselComponent;
