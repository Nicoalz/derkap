import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

interface DrawerComponentProps {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  trigger,
  title,
  children,
  isOpen,
  onClose,
}) => {
  console.log(isOpen)
  return (
    <>
      {trigger}
      <Drawer open={isOpen} onOpenChange={open => !open && onClose()}>
        <DrawerContent className="w-full max-w-md h-auto rounded-t-xl bg-white">
          <DrawerHeader>
            <DrawerTitle className="text-center text-2xl font-bold">
              {title}
            </DrawerTitle>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
