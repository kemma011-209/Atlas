import { Expand } from "lucide-react";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-10 px-12 pl-16 flex justify-between items-center">
        <div className="text-md font-primary font-light">Know The World</div>
        <h1 className="font-secondary font-light text-2xl tracking-[0.1em]">
          ATLAS
        </h1>
        <div className="w-7 h-7 rounded bg-zinc-300 border-zinc-800 border flex justify-center items-center p-1">
          <Expand className="stroke-[0.8]" />
        </div>
      </div>
      <div className="w-full h-full bg-black rounded-tl-lg">{children}</div>
    </div>
  );
};

export default Layout;
