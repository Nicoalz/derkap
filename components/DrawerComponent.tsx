import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import Button from '@/components/Button';

interface DrawerComponentProps {
  buttonText: string;
  title: string;
  children: React.ReactNode;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ buttonText, title, children }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button text={buttonText} />
      </DrawerTrigger>
      <DrawerContent className="w-full max-w-md h-auto rounded-t-xl bg-white"> 
        <DrawerHeader>
          <DrawerTitle className="text-center text-2xl font-bold">{title}</DrawerTitle>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerComponent;
