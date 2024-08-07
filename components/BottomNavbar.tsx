import { Home, Kaps, Notification, Photo, User } from "@/components/Icon";
import { usePWA } from "@/contexts/pwa-context";
import Link from "next/link";
import React from "react";

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
    name: "Capture",
    route: "/capture",
    icon: Photo,
  },
  {
    name: "Notification",
    route: "/notifications",
    icon: Notification,
  },
  {
    name: "Profile",
    route: "/profile",
    icon: User,
  },

];

const   BottomNavbar: React.FC = () => {
  const { currentPath } = usePWA();

  return (
    <div className='w-full px-2 fixed bottom-6 left-1/2 transform -translate-x-1/2'>
      <nav className="w-full bg-white/60 bg-blur text-black/70 rounded-lg shadow-lg flex justify-around items-center p-4">
        {tabs.map((tab, index) => {
          const IconComponent = tab.icon;
          const isActive = currentPath === tab.route;
          return (
            <Link
              className={`p-2 rounded-full flex flex-col items-center`}
              key={index}
              href={tab.route}
            >
              <IconComponent className="w-6 h-6 " isActive={isActive} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNavbar;
