import React, { ReactNode } from "react";
import Navbar from "./Navbar";

type PageProps = {
  children: ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="relative flex h-fit min-h-[100svh] w-screen flex-col items-center gap-8 overflow-y-auto scroll-smooth bg-gradient-to-b from-blue-50 to-white bg-fixed p-2 pt-0 font-overused md:p-10">
      <Navbar />
      {children}
    </div>
  );
};

export default Page;
