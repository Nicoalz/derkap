import React from "react";
import Link from "next/link";
import { usePWA } from "@/contexts/pwa-context";
import { Home, User, Kaps, Photo, Notification } from "@/components/Icon";

const tabs = [
  {
    name: "Home",
    route: "/",
    icon: Home,
  },
  {
    name: "Kaps",
    route: "/kaps",
    icon: Kaps,
  },
  {
    name: "Photo",
    route: "/photo",
    icon: Photo,
  },
  {
    name: "Notification",
    route: "/notification",
    icon: Notification,
  },
  {
    name: "Profile",
    route: "/profile",
    icon: User,
  },

];

const BottomNavbar: React.FC = () => {
  const { currentPath } = usePWA();

  return (
    <nav className="fixed bottom-0 w-full left-1/2 transform -translate-x-1/2 bg-white/60 backdrop-blur-lg border border-gray-300 text-black/70 rounded-t-lg	 shadow-lg flex justify-around items-center py-4 pt-2">
      {tabs.map((tab, index) => {
        const IconComponent = tab.icon;
        const isActive = currentPath === tab.route;
        return (
          <Link
            className={`p-2 rounded-full flex flex-col items-center`}
            key={index}
            href={tab.route}
          >
            <IconComponent className="w-6 h-6" isActive={isActive} />
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavbar;
