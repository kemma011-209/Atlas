import { Expand } from "lucide-react";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-10 px-4 pl-16 flex justify-between items-center">
        <div className="text-lg font-secondary">Know The World</div>
        <h1 className="font-secondary font-light text-2xl tracking-[0.1em]">
          ATLAS
        </h1>
      </div>
      <div className="w-full h-full bg-black rounded-tl-lg">{children}</div>
    </div>
  );
};

export default Layout;
