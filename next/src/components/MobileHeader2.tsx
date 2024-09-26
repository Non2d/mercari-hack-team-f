import React from 'react';

interface MobileHeaderProps {
  title: string;
}

const MobileHeader2: React.FC<MobileHeaderProps> = ({ title }) => {
  return (
    <div className="relative w-[390px] h-[41px]">
      <img className="absolute w-[473px] h-px top-10 left-0" alt="Vector" src={"vector2"} />
      <div className="absolute w-[390px] h-10 top-0 left-0">
        <div className="relative w-[454px] h-[25px] top-[15px] left-4">
          <div className="left-0 [font-family:'Roboto-Regular',Helvetica] font-normal absolute h-[22px] top-0.5 text-black text-sm tracking-[0] leading-[22px] whitespace-nowrap">
            すぐ売れる
          </div>
          <div className="left-[123px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold absolute h-[22px] top-0.5 text-black text-sm tracking-[0] leading-[22px] whitespace-nowrap">
            高く売れる
          </div>
          <div className="left-[246px] [font-family:'Roboto-Regular',Helvetica] font-normal absolute h-[22px] top-0.5 text-black text-sm tracking-[0] leading-[22px] whitespace-nowrap">
            競争相手が少ない
          </div>
          <div className="absolute h-[22px] top-0.5 left-[395px] [font-family:'Roboto-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[22px] whitespace-nowrap">
            トレンド
          </div>
          <img className="absolute w-[127px] h-px top-[25px] left-[94px]" alt="Line" src={"line95"} />
        </div>
      </div>
    </div>
  );
};

export default MobileHeader2;