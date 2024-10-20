"use client";

import MobileHeader from '../../components/MobileHeader';
import { DanshariBoxComponent } from '../../components/DanshariBoxComponent';
import { Home, Search, Camera, Archive, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';

export default function Homes() {
    // const items = Array.from({ length: 20 }, (_, index) => (
    //     <DanshariBoxComponent key={index} product_name="かさ" prop2="日用品" prop3="¥200" />
    // ));

    const [boxItems, setBoxItems] = useState([]);

    const { selectedLabel, GPTResponse } = useAuth();

    console.log(selectedLabel, GPTResponse); //どこかで初期化しちゃってる

    const getDanshariBox = async () => {

        const response = await fetch("http://localhost:8080/products", {
            method: "GET",
        });
        const data = await response.json();
        const items = data.map((item: any) => (
            <DanshariBoxComponent key={item.ProductID} product_name={item.Title} img_url={item.ImageURL} prop2={item.category} prop3={item.description} />
        ));
        setBoxItems(items);
    }

    useEffect(() => {
        getDanshariBox();
    }, []);

    return (
        <>
            <MobileHeader title="断捨離BOX" />
            <main className="pb-20">
                <div className="flex justify-center items-start">
                    <div className="grid grid-cols-2 gap-4 p-4">
                        {boxItems}
                    </div>
                </div>
            </main>
            <footer className="bg-white p-4 fixed bottom-0 w-full">
                <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                        <a href="/" className="flex flex-col items-center bg-blue-500 text-white py-2 px-4 rounded">
                            <Home size={28} />
                        </a>
                    </div>
                    <div className="flex flex-col items-center mx-2">
                        <button
                            className="text-lg bg-blue-500 text-white py-2 px-4 rounded w-full"
                            onClick={() => toast.success("出品の下書きを作成しました")}
                        >出品下書きへ</button>
                    </div>
                    <a href="/danshari-box">
                        <button className="text-lg bg-blue-500 text-white py-2 px-4 rounded w-full">
                            手放した
                        </button>
                    </a>
                </div>
            </footer>
        </>
    );
}