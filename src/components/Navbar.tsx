import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full p-2 sm:p-0 sm:px-2">
      <Link
        href="/"
        className="flex items-end text-2xl font-medium hover:text-red-500"
      >
        <p className="text-lg font-normal">{`blog.`}</p>CHRIS McCULLY
      </Link>
    </div>
  );
};

export default Navbar;
