"use client";

import MobileHeader from '../../components/MobileHeader';
import { DanshariBoxComponent } from '../../components/DanshariBoxComponent';

export default function Home() {
    const items = Array.from({ length: 20 }, (_, index) => (
        <DanshariBoxComponent key={index} product_name="かさ" prop2="日用品" prop3="¥200" />
    ));

    return (
        <>
            <MobileHeader title="断捨離BOX" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">{items}</div>;
        </>
    );

}