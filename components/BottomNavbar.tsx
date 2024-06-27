import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon,
  UserIcon as UserIconSolid
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

import { usePWA } from "@/contexts/pwa-context";

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
    solid: MagnifyingGlassIcon,
  },
  {
    name: "Profile",
    route: "/profile",
    outline: UserIcon,
    solid: UserIconSolid,
  },
];

const BottomNavbar: React.FC = () => {
  const { currentPath } = usePWA();

  return (
    <nav className="fixed bottom-4 w-full max-w-md left-1/2 transform -translate-x-1/2 bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl text-custom-primary flex justify-around items-center py-4 px-2">
      {tabs.map((tab, index) => (
        <Link
          className={`p-1 rounded-xl flex flex-col items-center w-1/6 ${currentPath === tab.route && "text-black/90"
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
