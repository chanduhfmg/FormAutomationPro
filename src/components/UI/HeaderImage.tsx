import React from "react";

type props = {
    headerContent?: React.ReactNode;
};

const HeaderImage = ({ headerContent }: props) => {
  return (
    <div className="flex  md:flex-row items-center gap-6 md:gap-16">
      
      <img
        src="/image.png"
        alt="Header"
        className="w-24 sm:w-28 md:w-[120px] h-auto object-contain"
      />

      <div className=" p-4 sm:p-5 w-full md:w-80 text-black leading-relaxed font-[cursive] text-center md:text-left">
        {headerContent}
      </div>

    </div>
  );
};

export default HeaderImage;