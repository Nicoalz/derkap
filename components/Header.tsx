import { ChevronLeft, User } from 'lucide-react';
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="w-full flex px-10  justify-between items-center py-6 md:px-12">
      <Link href={"/"} className='flex items-center gap-x-2'>
        <ChevronLeft size={24} />
        Retour
      </Link>
      <Link href="/profile">
        <User size={30} />
      </Link>
    </header >
  );
};

export default Header;

