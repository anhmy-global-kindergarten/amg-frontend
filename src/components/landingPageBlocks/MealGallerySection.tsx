'use client';
import Image from "next/image";

interface MealGalleryData {
    title?: string;
    decorCloudUrl?: string;
    imagesCol1?: string[];
    imagesCol2?: string[];
    imagesCol3?: string[];
}

interface MealGallerySectionProps {
    // isMobile có thể không cần nếu layout không thay đổi nhiều giữa mobile/desktop cho section này
    data: MealGalleryData;
}

export default function MealGallerySection({ data }: MealGallerySectionProps) {
    const title = data.title || "BỮA ĂN CỦA CON";
    const decorCloud = data.decorCloudUrl || "/banner/icon_cloud.png";
    const col1 = data.imagesCol1 || ["meal1", "meal2", "meal3"];
    const col2 = data.imagesCol2 || ["meal4", "meal5"];
    const col3 = data.imagesCol3 || ["meal6", "meal7", "meal8"];

    return (
        <section className="relative w-full mt-10 mb-5 z-20 px-4 text-center"> {/* Đã có z-20 ở Draggable */}
            <Image
                src={decorCloud}
                alt="Decorative cloud"
                width={100}
                height={50}
                className="absolute right-5 -top-[60px] lg:right-50 z-10" // Đảm bảo z-index thấp hơn Edit controls
            />
            <h2 style={{ textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white' }}
                className="text-4xl md:text-4xl text-center text-[#F7B052] mb-6">
                {title}
            </h2>
            <div className="grid grid-cols-3 gap-2 max-w-7xl mx-auto">
                {/* Column 1 */}
                <div className="flex flex-col gap-2">
                    {col1.map((img, i) => (
                        <div key={i} className="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden">
                            <Image src={`/meal/${img}.png`} alt={`Meal image ${img}`} width={340} height={260} className="object-cover w-full h-full"/>
                        </div>
                    ))}
                </div>
                {/* Column 2 */}
                <div className="flex flex-col gap-2 justify-center">
                    {col2.map((img, i) => (
                        <div key={i} className="w-full h-[225px] sm:h-[300px] md:h-[400px] lg:h-[525px] rounded-2xl overflow-hidden">
                            <Image src={`/meal/${img}.png`} alt={`Meal image ${img}`} width={400} height={400} className="object-cover w-full h-full"/>
                        </div>
                    ))}
                </div>
                {/* Column 3 */}
                <div className="flex flex-col gap-2">
                    {col3.map((img, i) => (
                        <div key={i} className="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden">
                            <Image src={`/meal/${img}.png`} alt={`Meal image ${img}`} width={340} height={260} className="object-cover w-full h-full"/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}