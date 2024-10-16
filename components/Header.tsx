import { ChevronLeft, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
  withText?: boolean;
  isLink?: boolean;
  link?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  withText,
  isLink,
  link,
  children,
}) => {
  return (
    <header className="w-full flex justify-between items-center p-4 min-h-[65px] h-fit relative">
      <Link href={'/'} className="flex items-center gap-x-2">
        <ChevronLeft size={24} />
        {withText && 'Retour'}
      </Link>

      <h1 className="abs-center font-champ text-xl tracking-wider capitalize max-w-52 text-wrap overflow-hidden text-ellipsis text-center">
        {title}
      </h1>

      {isLink ? (
        <Link href={link ? link : '/'}>
          <User size={24} />
        </Link>
      ) : (
        children
      )}
    </header>
  );
};

export default Header;
