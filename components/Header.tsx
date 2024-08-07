import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="w-full flex justify-center items-center py-6 px-4 md:px-12">
      <Link href="/">
        {/* <Image alt="logo" src={"/logo.png"} width={150} height={150} /> */}
      </Link>
    </header>
  );
};

export default Header;

