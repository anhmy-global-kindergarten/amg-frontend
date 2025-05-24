// utils/cropImage.ts
{/* eslint-disable @typescript-eslint/no-explicit-any */}
export const getCroppedImg = async (imageSrc: string, crop: any) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx?.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
    );

    return new Promise<string>((resolve) => {
        canvas.toBlob((blob) => {
            if (!blob) return;
            const fileUrl = URL.createObjectURL(blob);
            resolve(fileUrl);
        }, "image/jpeg");
    });
};

function createImage(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
    });
}
