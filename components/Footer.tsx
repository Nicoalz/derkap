import { networkLinks } from "@/libs/links";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex-col md:flex-row w-full flex justify-between items-center px-4 sm:px-12 bg-custom-dark-blue/70 py-16 text-gray-600 border-t border-white/20 gap-3">
      <Link href="/">
        <Image alt="logo" src={"/logo.png"} width={50} height={50} />
      </Link>
      <div>
        <nav className="flex items-center justify-center flex-wrap">
          {networkLinks.map((link, index) => (
            <Link
              className="mx-4"
              target={link.isBlank ? "_blank" : "_self"}
              key={index}
              href={link.route}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <div>
        <p>Derkap © {year}</p>
      </div>
    </footer>
  );
};

export default Footer;
