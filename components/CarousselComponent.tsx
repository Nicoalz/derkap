import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface CarouselComponentProps {
  children: React.ReactNode
}

const CarouselComponent = ({ children }: CarouselComponentProps) => {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {children}
      </CarouselContent>
      <CarouselPrevious className="text-white" />
      <CarouselNext className="text-white" />
    </Carousel>
  )
}

export default CarouselComponent