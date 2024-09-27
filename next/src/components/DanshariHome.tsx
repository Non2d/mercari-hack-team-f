import React, { use, useState, useEffect } from 'react';
import { Camera, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

const DanshariHome = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isGPTReady, setIsGPTReady] = useState(false);
  const [awaitingGPT, setAwaitingGPT] = useState(false);

  useEffect(() => {
    setIsGPTReady(false);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {


    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setAwaitingGPT(true);
      toast.promise(
        fetch('http://localhost:8080/openai', {
          method: 'GET',
        }).then(response => {
          if (response.ok) {
            console.log('AAA');
            setIsGPTReady(true);
          }
          return response;
        }),
        {
          loading: 'Uploading photo...',
          success: 'Photo uploaded successfully',
          error: 'Failed to upload photo',
        }
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Buttons */}
      {!awaitingGPT && (
        <>
          <div className="bg-orange-100 rounded-lg p-4 mb-4">
            <p className="text-orange-800 font-bold">
              20% ポイントバック!
            </p>
            <p className="text-sm text-orange-700">
              9/30(月)23:59まで
            </p>
          </div>
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
            {isGPTReady && (
              <div>
                <a href="/judge">
                  <button className="w-full bg-white border border-gray-300 rounded-lg p-3">
                    断捨離BOXへ
                  </button>
                </a>
              </div>
            )}
          </div>
        )
      }
    </div >
  );
};

export default DanshariHome;