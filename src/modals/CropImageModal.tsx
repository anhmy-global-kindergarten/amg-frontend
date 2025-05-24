import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/app/utils/cropImage";
import {useState} from "react";

export const CropImageModal = ({ image, onCancel, onConfirm }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleConfirm = async () => {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        onConfirm(croppedImage);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg w-[90%] max-w-xl">
                <div className="relative w-full h-[400px]">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                    />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
                        Huỷ
                    </button>
                    <button onClick={handleConfirm} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Chèn ảnh
                    </button>
                </div>
            </div>
        </div>
    );
};
