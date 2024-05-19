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
    name: "Discover",
    route: "/discover",
    outline: MagnifyingGlassIcon,
    solid: MagnifyingGlassIcon,
  },
  {
    name: "Home",
    route: "/",
    outline: HomeIcon,
    solid: HomeIconSolid,
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

    <nav className="fixed bottom-0 w-full bg-custom-dark border-t-[0.5px] border-custom-primary text-custom-primary flex justify-around items-center pt-4 pb-14 px-2">
      {tabs.map((tab, index) => (
        <Link
          className={`p-1 rounded-xl flex flex-col items-center w-1/6 ${currentPath === tab.route && "text-black/90 bg-custom-primary"
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
