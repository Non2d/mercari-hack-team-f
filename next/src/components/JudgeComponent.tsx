import React from "react";
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
    return (
        <>
            <main>
                <div className="relative w-full h-[131px] overflow-hidden flex">
                    <div className="flex-grow w-full relative">
                        <div className="absolute w-[85px] h-[85px] top-[23px] left-[50px] bg-[#c4c4c4] rounded-lg rotate-180" />
                        <Image
                            className="absolute w-[85px] h-[85px] top-[23px] left-[50px] bg-[#c4c4c4] rounded-lg"
                            src="http://books.google.com/books/content?id=q0C3DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" // 外部画像のURL
                            alt="Example Image"
                            width={500}
                            height={300}
                        />
                        <div className="absolute w-3.5 h-11 top-[42px] left-[19px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-black text-lg tracking-[0] leading-4">
                            {rank}
                        </div>
                        <div className="top-[22px] absolute h-4 left-[161px] [font-family:'Roboto-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-4 whitespace-nowrap">
                            {title}
                        </div>
                        <div className="top-14 absolute h-4 left-[161px] [font-family:'Roboto-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-4 whitespace-nowrap">
                            {category}
                        </div>
                        <div className="top-[90px] absolute h-4 left-[161px] [font-family:'Roboto-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-4 whitespace-nowrap">
                            {category === judgeSupportLabels[0] && ( // すべて
                                <div className="break-words">
                                    販売中の関連商品の検索数:{searchCount}回
                                </div>
                            )}
                            {category === judgeSupportLabels[1] && ( // 人気
                                <div>
                                    既に売れた関連商品の検索数:{searchCount}回
                                </div>
                            )}
                            {category === judgeSupportLabels[2] && ( // トレンド
                                <div>
                                    この1ヶ月の商品検索数:{searchCount}回
                                </div>
                            )}
                            {category === judgeSupportLabels[3] && ( // 急上昇
                                <div>
                                    この1週間の関連商品検索数:{searchCount}回
                                </div>
                            )}
                        </div>
                        {/* <img src={img_url} className="absolute w-full h-px top-[131px] left-[9px] object-cover" alt="Line" /> */}
                    </div>
                    <div className="flex items-center justify-center">
                        <input type="radio" className="mr-7 w-4 h-4 bg-gray-300 rounded-full focus:outline-none" />
                    </div>
                </div>
            </main>
            <footer className="bg-white p-4 fixed bottom-0 w-full">
                <div className="flex justify-center">
                    <div className="flex flex-col items-center w-1/2 mx-2">
                        <button className="text-lg bg-blue-500 text-white py-2 px-4 rounded w-full">出品下書きへ</button>
                    </div>
                    <a href="/danshari-box">
                        <button className="text-lg bg-blue-500 text-white py-2 px-4 rounded w-full">
                            断捨離BOXへ
                        </button>
                    </a>
                </div>
            </footer>
        </>
    );
};