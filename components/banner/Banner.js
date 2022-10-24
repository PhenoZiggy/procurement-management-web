import Image from 'next/image';
import React from 'react';

const Banner = ({ image, header, content, children }) => {
  return (
    <div className="bg-[#CAC2BC] h-full py-16">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1 ">
          <div className="h-full flex justify-center items-center">
            <div className="text-left w-72 space-y-10">
              <h3 className="font-bold text-5xl">{header}</h3>
              <p className="">{content}</p>
              {children && children}
            </div>
          </div>
        </div>
        <div className="flex-1 items-center justify-center -z-0">
          <Image src={image} widt="100" alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
