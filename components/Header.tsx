import Link from "next/link";
import React from "react";

import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="w-full flex justify-center items-center py-6 px-4 md:px-12 sticky top-0 backdrop-blur-lg bg-custom-dark-blue/70 z-10">
      <Link href="/">
        <Image alt="logo" src={"/logo.png"} width={150} height={150} />
      </Link>
    </header>
  );
};

export default Header;
