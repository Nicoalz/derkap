import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon,
  UserIcon as UserIconSolid
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

import { usePWA } from "@/contexts/pwa-context";

const GlassIconSolid = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
  </svg>
);

const tabs = [
  {
    name: "Home",
    route: "/",
    outline: HomeIcon,
    solid: HomeIconSolid,
  },
  {
    name: "Explorer",
    route: "/explore",
    outline: MagnifyingGlassIcon,
    solid: GlassIconSolid,
  },
  {
    name: "Profile",
    route: "/profile",
    outline: UserIcon,
    solid: UserIconSolid,
  }
];

const BottomNavbar: React.FC = () => {
  const { currentPath } = usePWA();

  return (

    <nav className="fixed bottom-0 w-full bg-custom-dark border-t-[0.5px] border-custom-primary text-custom-primary flex justify-around items-center pt-4 pb-10 px-2">
      {tabs.map((tab, index) => (
        <Link
          className={`p-1 rounded-xl flex flex-col items-center w-1/6 ${currentPath === tab.route && "text-custom-primary"
            }`}
          key={index}
          href={tab.route}
        >
          {currentPath === tab.route ? (
            <tab.solid className="w-7 h-7" />
          ) : (
            <tab.outline className="w-7 h-7" />
          )}
        </Link>
      ))}
    </nav>

  );
};

export default BottomNavbar;
