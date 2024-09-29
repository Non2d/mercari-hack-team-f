import React from "react";
interface DanshariBoxProps {
    product_name: string;
    img_url: string;
    prop2: string;
    prop3: string;
}
import Image from 'next/image';

import { judgeSupportLabels } from "../utils/judgeSupportLabels";

export const DanshariBoxComponent = ({ product_name, img_url, prop2, prop3 }: DanshariBoxProps) => {
    return (
        <div className="relative w-[171px] h-[209px] bg-[#DADADA] rounded-[14px] overflow-hidden border border-solid border-[#4DC9FF]">
            <div className="relative w-[171px] h-[209px] bg-[#DADADA] rounded-[14px] overflow-hidden border border-solid border-[#4DC9FF]">
                <Image
                    className="absolute inset-0 w-full h-full object-cover"
                    src={img_url} // 外部画像のURL
                    alt="Example Image"
                    width={171}
                    height={209}
                />
            </div>

            {/* したの白い部分 */}
            <div className="absolute w-[171px] h-[58px] top-[151px] left-0 rounded-[0px_0px_14px_14px]">
                <div className="absolute w-[171px] h-[58px] top-0 left-0 bg-white rounded-[0px_0px_14px_14px] opacity-90" />
                <div className="flex flex-col w-[154px] h-[52px] items-start gap-0.5 absolute top-[3px] left-[9px]">
                    <div className="[font-family:'Roboto-Bold',Helvetica] font-bold text-sm text-right relative w-fit mt-[-1.00px] text-black tracking-[0] leading-4 whitespace-nowrap">
                        {product_name}
                    </div>
                    <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                        {/* <div className="[font-family:'Roboto-Regular',Helvetica] font-normal text-xs relative w-fit mt-[-1.00px] text-black tracking-[0] leading-4 whitespace-nowrap">
                            カテゴリー
                        </div>
                        <div className="[font-family:'Roboto-Regular',Helvetica] font-normal text-xs relative w-fit mt-[-1.00px] text-black tracking-[0] leading-4 whitespace-nowrap">
                            {prop2}
                        </div> */}
                    </div>
                    <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                        {/* <div className="[font-family:'Roboto-Regular',Helvetica] font-normal text-xs relative w-fit mt-[-1.00px] text-black tracking-[0] leading-4 whitespace-nowrap">
                            販売価格
                        </div> */}
                        <div className="[font-family:'Roboto-Regular',Helvetica] font-normal text-xs relative w-fit mt-[-1.00px] text-black tracking-[0] leading-4 whitespace-nowrap">
                            {prop3}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="absolute w-[23px] h-[23px] top-3.5 left-[133px] rounded-[11.5px] border-2 border-solid border-[#C4C4C4]" /> */}
            <div className="inline-flex items-center justify-center gap-2.5 px-[7px] py-0 absolute top-[120px] left-[9px] bg-white rounded-[15px] overflow-hidden">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto-Regular',Helvetica] font-normal text-black text-xs tracking-[0] leading-[22px] whitespace-nowrap">
                    {judgeSupportLabels[2]}
                </div>
            </div>
        </div>
    );
};