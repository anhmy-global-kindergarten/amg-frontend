'use client';
import Image from "next/image";

interface PhotoGallerySectionProps {
    data: {
        column1Images?: string[];
        column2Images?: string[];
        column3Images?: string[];
    };
}

export default function PhotoGallerySection({ data }: PhotoGallerySectionProps) {
    const col1 = data.column1Images || ["photo5", "photo6", "photo7"];
    const col2 = data.column2Images || ["photo1", "photo8"];
    const col3 = data.column3Images || ["photo2", "photo3", "photo4"];

    return (
        <section className="relative w-full mt-40 mb-20 z-20 px-4">
            <div className="grid grid-cols-3 gap-2 max-w-7xl mx-auto">
                {/* Column 1 */}
                <div className="flex flex-col gap-2">
                    {col1.map((img, i) => (
                        <div key={i} className="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden">
                            <Image src={`/gallery/${img}.png`} alt={`Gallery image ${img}`} width={340} height={260} className="object-cover w-full h-full"/>
                        </div>
                    ))}
                </div>
                {/* Column 2 */}
                <div className="flex flex-col gap-2 justify-center">
                    {col2.map((img, i) => (
                        <div key={i} className="w-full h-[225px] sm:h-[300px] md:h-[400px] lg:h-[525px] rounded-2xl overflow-hidden">
                            <Image src={`/gallery/${img}.png`} alt={`Gallery image ${img}`} width={400} height={400} className="object-cover w-full h-full"/>
                        </div>
                    ))}
                </div>
                {/* Column 3 */}
                <div className="flex flex-col gap-2">
                    {col3.map((img, i) => (
                        <div key={i} className="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden">
                            <Image src={`/gallery/${img}.png`} alt={`Gallery image ${img}`} width={340} height={260} className="object-cover w-full h-full"/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}