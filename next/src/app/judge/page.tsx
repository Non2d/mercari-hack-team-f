"use client";

import { JudgeComponent } from '@/components/JudgeComponent';
import MobileHeader from '../../components/MobileHeader';
import MobileHeader2 from '../../components/MobileHeader2';
import { useAuth } from '../../context/AuthContext';
import { judgeSupportLabels } from '../../utils/judgeSupportLabels';

export default function Home() {
  const { selectedLabel } = useAuth();
  const categories = judgeSupportLabels;

  const bookTitles = [
    "冒険の始まり",
    "失われた秘宝",
    "未来都市の戦士",
    "魔法使いの弟子",
    "忍者の誓い",
    "サムライの道",
    "ドラゴンの伝説",
    "宇宙の彼方へ",
    "異世界の勇者",
    "不思議な森の物語",
    "失われた島の謎",
    "未知への旅",
    "古代寺院の秘密",
    "魔法の森",
    "隠された世界の年代記",
    "最後の守護者",
    "忘れられた領域の物語",
    "夜のささやき",
    "神秘の海の伝説",
    "銀河英雄伝説"
  ];

  const judgeComponents = Array.from({ length: 20 }).map((_, index) => ({
    img_url: `http://books.google.com/books/content?id=q0C3DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`,
    rank: index + 1,
    title: bookTitles[index % bookTitles.length],
    category: categories[(index % (categories.length - 1)) + 1],
    searchCount: 100 * index,
  }));

  return (
    <>
      <MobileHeader title="ランク" />
      <MobileHeader2 />
      {judgeComponents
        .filter(data => selectedLabel === 0 || data.category === categories[selectedLabel])
        .map((data, index) => (
          <JudgeComponent
            key={index}
            img_url = {data.img_url}
            rank={data.rank}
            title={data.title}
            category={data.category}
            searchCount={data.searchCount}
          />
        ))}
    </>
  );
}