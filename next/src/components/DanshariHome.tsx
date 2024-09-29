import React, { use, useState, useEffect } from 'react';
import { Camera, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

import { JudgeComponent } from '@/components/JudgeComponent';
import MobileHeader from '../components/MobileHeader';
import MobileHeader2 from '../components/MobileHeader2';
import { judgeSupportLabels } from '../utils/judgeSupportLabels';

import MobileFooter from '../components/MobileFooter';

const DanshariHome = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isGPTReady, setIsGPTReady] = useState(false);
  const [awaitingGPT, setAwaitingGPT] = useState(false);
  const { user, GPTResponse, setGPTResponse } = useAuth();

  const [isJudge, setIsJudge] = useState(false);

  useEffect(() => {
    setIsGPTReady(false);
    setIsJudge(false);
  }, []);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setAwaitingGPT(true);
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      toast.promise(
        (async () => {
          const response = await fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            console.log('AAA');
            const data = await response.json();
            setGPTResponse(data);
            console.log(data);
            setIsGPTReady(true);
            for (const item of data) {
              const response2 = await fetch('http://localhost:8080/upload', {
                method: 'POST',
                body: JSON.stringify({
                  "title": item.title,
                  "userId": user?.uid,
                  "description": item.message,
                  "price": 0,
                  "status": "box",
                  "image_url": item.image_url,
                  "demand": 0
                }),
              });
            }
            
          } else {
            throw new Error('Failed to upload photo');
          }

          setIsJudge(true);

          return response;
        })(),
        {
          loading: 'Uploading photo...',
          success: 'Photo uploaded successfully',
          error: 'Failed to upload photo',
        }
      );
    }
  };

  const { selectedLabel } = useAuth();
  const categories = judgeSupportLabels;

  console.log(GPTResponse);

  // const bookTitles = [
  //   "冒険の始まり",
  //   "失われた秘宝",
  //   "未来都市の戦士",
  //   "魔法使いの弟子",
  //   "忍者の誓い",
  //   "サムライの道",
  //   "ドラゴンの伝説",
  //   "宇宙の彼方へ",
  //   "異世界の勇者",
  //   "不思議な森の物語",
  //   "失われた島の謎",
  //   "未知への旅",
  //   "古代寺院の秘密",
  //   "魔法の森",
  //   "隠された世界の年代記",
  //   "最後の守護者",
  //   "忘れられた領域の物語",
  //   "夜のささやき",
  //   "神秘の海の伝説",
  //   "銀河英雄伝説"
  // ];

  // const judgeComponents = Array.from({ length: 20 }).map((_, index) => ({
  //   img_url: `http://books.google.com/books/content?id=q0C3DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`,
  //   rank: index + 1,
  //   title: bookTitles[index % bookTitles.length],
  //   category: categories[(index % (categories.length - 1)) + 1],
  //   searchCount: 100 * index,
  // }));s

  interface JudgeComponentData {
    img_url: string;
    rank: number;
    title: string;
    category: string;
    searchCount: number;
    description: string;
    message: string;
  }

  const judgeComponents = GPTResponse.map((item: any, index: number) => ({
    img_url: item.image_url,
    rank: index + 1,
    title: item.title,
    category: categories[(index % (categories.length - 1)) + 1],
    searchCount: 100 * index,
    description: item.description,
    message: item.message,
  }));


  return (
    <>
      {!isJudge && (
        <div>
          <div className="flex flex-col min-h-screen bg-white">

            {/* Buttons */}
            {!awaitingGPT && (
              <>
                {/* <div className="bg-orange-100 rounded-lg p-4 mb-4">
                  <p className="text-orange-800 font-bold">
                    20% ポイントバック!
                  </p>
                  <p className="text-sm text-orange-700">
                    9/30(月)23:59まで
                  </p>
                </div> */}
                <img
                  src={'/danshari/danshari-style.png'} // nullの場合の代替URLを指定
                  alt={`Danshari`}
                  style={{ width: '100%', height: '100%' }}
                />
                <button
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 mb-3 text-left"
                  onClick={() => window.location.href = '/danshari-box'}
                >
                  断捨離BOXをみる
                </button>

                {/* <button
            className="w-full bg-white border border-gray-300 rounded-lg p-3 flex justify-between items-center"
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <span>写真を断捨離BOXへおくる</span>
            <Camera size={24} />
          </button> */}
                <div
                  className="relative h-[182px] bg-white rounded-[5px] overflow-hidden border border-solid border-[#ff333f]"
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  <Camera size={40} className="absolute top-2 left-2" />
                  <div className="absolute top-0 left-0 w-full h-11 bg-[#ff333f] rounded-t-[5px] flex items-center justify-center">
                    <span className="font-roboto font-normal text-white text-base text-center">
                      写真を断捨離boxへおくる
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-11 flex items-center justify-center">
                    <span className="font-roboto font-normal text-black text-sm text-center">
                      ここに画像をアップロードする
                    </span>
                  </div>
                  <Upload size={40} className="absolute inset-0 m-auto" />
                </div>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </>
            )
            }
            {
              selectedImage && (
                <div>
                  <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                  {/* {isGPTReady && (
                    <div>
                      <button
                        className="w-full bg-white border border-gray-300 rounded-lg p-3"
                        onClick={() => setIsJudge(true)}
                      >
                        断捨離BOXへ
                      </button>
                    </div>
                  )} */}
                </div>
              )
            }
          </div >
          <MobileFooter />
        </div>

      )}
      {isJudge && (
        <div>
          <MobileHeader2 />
          {judgeComponents
            .filter((data: JudgeComponentData) => selectedLabel === 0 || data.category === categories[selectedLabel])
            .map((data: JudgeComponentData, index: number) => (
              <JudgeComponent
                key={index}
                img_url={data.img_url}
                rank={data.rank}
                title={data.title}
                category={data.message}
                searchCount={data.searchCount}
              />
            ))}
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
        </div>
      )}
    </>
  );
};

export default DanshariHome;