import React, { useState } from "react";
import { judgeSupportLabels } from '../utils/judgeSupportLabels';
// import { Link } from "react-router-dom";
import Image from 'next/image';

interface JudgeComponentProps {
    img_url: string;
    rank: number;
    title: string;
    category: string;
    searchCount: number;
}

export const JudgeComponent = ({ img_url, rank, title, category, searchCount }: JudgeComponentProps) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <main>
                <div className="relative w-full h-[150px] overflow-hidden flex">
                    <div className="flex-grow w-full relative">
                        <div className="absolute w-[85px] h-[85px] top-[23px] left-[50px] bg-[#c4c4c4] rounded-lg rotate-180" />
                        <Image
                            className="absolute w-[85px] h-[85px] top-[23px] left-[50px] bg-[#c4c4c4] rounded-lg"
                            src={img_url} // 外部画像のURL
                            alt="Example Image"
                            width={500}
                            height={300}
                        />
                        <div className="absolute top-[42px] left-[19px] flex flex-col items-center [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-black text-lg tracking-[0] leading-4">
                            <div>{rank}</div>
                            <div className="flex items-center justify-center mt-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 bg-gray-300 rounded-full focus:outline-none"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                        </div>
                        <div className="w-3/5 top-[22px] absolute h-4 left-[150px] [font-family:'Roboto-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-4 whitespace-normal">
                            <span className="text-blue-500 font-bold">{title}</span>
                            <br />
                            {category}
                        </div>
                        {/* <div className="top-[90px] absolute h-4 left-[161px] [font-family:'Roboto-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-4 whitespace-nowrap">
                            {category === judgeSupportLabels[0] && ( // すべて
                                <div className="break-words">
                                    販売中の関連商品の検索数:{searchCount}回
                                </div>
                            )}
                            {category === judgeSupportLabels[1] && ( // 人気
                                <div>
                                    大学入試の参考書の検索数:{searchCount}回
                                </div>
                            )}
                            {category === judgeSupportLabels[2] && ( // トレンド
                                <div>
                                    この1ヶ月の商品検索数:{searchCount}回
                                </div>
                            )}
                            {category === judgeSupportLabels[3] && ( // 急上昇
                                <div>
                                    あらすじが似ている本の検索数:{searchCount}回
                                </div>
                            )}
                        </div> */}
                        {/* <img src={img_url} className="absolute w-full h-px top-[131px] left-[9px] object-cover" alt="Line" /> */}
                    </div>
                </div>
            </main>
        </>
    );
};