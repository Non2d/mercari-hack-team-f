"use client";

import MobileHeader from '../../components/MobileHeader';
import { DanshariBoxComponent } from '../../components/DanshariBoxComponent';
import { Home, Search, Camera, Archive, User } from 'lucide-react';

export default function Homes() {
    const items = Array.from({ length: 20 }, (_, index) => (
        <DanshariBoxComponent key={index} product_name="かさ" prop2="日用品" prop3="¥200" />
    ));

    return (
        <>
            <MobileHeader title="断捨離BOX" />
            <main>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="grid grid-cols-2 gap-4 p-4">
                        {items}
                    </div>
                </div>
            </main>
            <footer className="bg-white p-4 fixed bottom-0 w-full">
                <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                        <a href="/danshari-box" className="flex flex-col items-center">
                            <Home size={24} />
                            <span className="text-xs">ホーム</span>
                        </a>
                    </div>
                    <div className="flex flex-col items-center w-1/2 mx-2">
                        <button className="text-lg bg-blue-500 text-white py-2 px-4 rounded w-full">出品下書きへ</button>
                    </div>
                    <a href="/danshari-box">
                        <button className="text-lg bg-blue-500 text-white py-2 px-4 rounded w-full">
                            破棄
                        </button>
                    </a>
                </div>
            </footer>
        </>
    );
}