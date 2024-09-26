import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const DanshariHome = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [awaitingGPT, setAwaitingGPT] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setAwaitingGPT(true);
      toast.promise(
        fetch('http://localhost:8080/openai', {
          method: 'GET',
        }),
        {
          loading: 'Uploading photo...',
          success: 'Photo uploaded successfully',
          error: 'Failed to upload photo',
        }
      );
      console.log(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Banner */}
      <div className="bg-orange-100 rounded-lg p-4 mb-4">
          <p className="text-orange-800 font-bold">
            20% ポイントバック!
          </p>
          <p className="text-sm text-orange-700">
            9/30(月)23:59まで
          </p>
        </div>

        {/* Buttons */}
        {!awaitingGPT && (
          <>
            <button className="w-full bg-white border border-gray-300 rounded-lg p-3 mb-3 text-left">
              断捨離BOXをみる
            </button>
            <button
              className="w-full bg-white border border-gray-300 rounded-lg p-3 flex justify-between items-center"
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <span>写真を断捨離BOXへおくる</span>
              <Camera size={24} />
            </button>
            <input
              id="fileInput"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              className="hidden"
            />
          </>
        )}
    </div>
  );
};

export default DanshariHome;