import Image from "next/image";
import Link from "next/link";

export default function Facilities() {
    return (
        <div className="relative min-h-screen bg-[#FFFFFF] p-8 flex flex-col items-center overflow-hidden">
            {/* Background decor */}
            <Image
                src="/decorations/decor_bg.png"
                alt="Decor Background"
                fill
                className="object-cover opacity-100 pointer-events-none z-0"
                priority
            />

            {/* Content */}
            <div className="relative w-full max-w-5xl z-10 flex flex-col items-center z-20">
                {/* Breadcrumb */}
                <div className="w-full mb-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="font-semibold text-black hover:underline">
                            Trang chủ
                        </Link>
                        <span>/</span>
                        <span className="text-[#FFC107] font-medium">Cơ sở vật chất</span>
                    </div>
                </div>
                {/* Logo */}
                <div className="mb-6">
                    <Image
                        src="/banner/logo.png"
                        alt="AMG Kindergarten Logo"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </div>
                {/* Title */}
                <div className="max-w-4xl w-full ">
                    <p className="text-xl mb-8 text-black z-20">
                        AMG được xây dựng với hệ thống cơ sở vật chất hiện đại chuẩn Châu Âu mang đến không gian học tập
                        vui chơi thoải mái, tiện nghi và an toàn nhất đến cho các con.
                    </p>

                    <h2 className="text-[#F7C948] text-lg mb-6">
                        1. Hệ thống phòng học thoáng rộng với ánh sáng tự nhiên ngập tràn
                    </h2>
                    <div className="w-full flex justify-center mb-12">
                        <Image
                            src="/facilities/facilities1.png"
                            alt="Phòng học rộng rãi ánh sáng tự nhiên"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-md object-cover"
                        />
                    </div>

                    <div className="w-full flex justify-center mb-12">
                        <Image
                            src="/facilities/facilities2.png"
                            alt="Phòng học vui nhộn cho trẻ"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-md object-cover"
                        />
                    </div>

                    <div className="w-full flex justify-center mb-12">
                        <Image
                            src="/facilities/facilities3.png"
                            alt="Facilities 3"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-md object-cover"
                        />
                    </div>

                    <div className="w-full flex justify-center mb-12">
                        <Image
                            src="/facilities/facilities4.png"
                            alt="Facilities 4"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-md object-cover"
                        />
                    </div>

                    <br/>
                    <h2 className="text-[#F7C948] text-lg mb-6">
                        2. Hệ thống phòng chức năng, phòng gym, bể float và sân chơi riêng cho các con
                    </h2>
                    <div className="w-full flex justify-center mb-12">
                        <Image
                            src="/facilities/facilities5.png"
                            alt="Facilities 5"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-md object-cover"
                        />
                    </div>
                    <div className="w-full flex justify-center mb-12">
                        <Image
                            src="/facilities/facilities6.png"
                            alt="Facilities 6"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-md object-cover"
                        />
                    </div>
                    <div className="w-full flex justify-center mb-12">
                        <Image
                            src="/facilities/facilities7.png"
                            alt="Facilities 7"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-md object-cover"
                        />
                    </div>
                    <div className="w-full flex justify-center mb-12">
                        <Image
                            src="/facilities/facilities8.png"
                            alt="Facilities 8"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-md object-cover"
                        />
                    </div>
                    <div className="w-full flex justify-center mb-12">
                        <Image
                            src="/facilities/facilities9.png"
                            alt="Facilities 9"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-md object-cover"
                        />
                    </div>

                    <br/>
                    <h2 className="text-[#F7C948] text-lg mb-6">
                        3. Khuôn viên sinh hoạt các tiết học dã ngoại ngoài trời
                    </h2>
                    <div className="w-full flex justify-center mb-12">
                        <Image
                            src="/facilities/facilities10.png"
                            alt="Facilities 10"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-md object-cover"
                        />
                    </div>
                    <div className="w-full flex justify-center mb-12">
                        <Image
                            src="/facilities/facilities11.png"
                            alt="Facilities 11"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-md object-cover"
                        />
                    </div>
                    <div className="w-full flex justify-center mb-12">
                        <Image
                            src="/facilities/facilities12.png"
                            alt="Facilities 12"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-md object-cover"
                        />
                    </div>

                    <br/>
                </div>
            </div>

            {/* Elephant Icon */
            }
            <Image
                src="/icons/icon_elephant_star.png"
                alt="Elephant Star"
                width={120}
                height={120}
                className="absolute right-70 top-20 z-10"
            />

            <Image src="/banner/icon_star_empty.png" alt="Star Empty" width={60} height={60}
                   className="absolute right-20 top-50 z-10"/>
            <Image src="/banner/icon_star_empty.png" alt="Star Empty" width={40} height={40}
                   className="absolute right-150 top-17 z-10"/>
            <Image src="/banner/icon_star_empty.png" alt="Star Empty" width={60} height={60}
                   className="absolute left-20 top-30 z-10"/>

            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={60}
                height={60}
                className="absolute left-10 top-350 z-10"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={40}
                height={40}
                className="absolute right-125 top-150 z-10"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={60}
                height={60}
                className="absolute left-260 top-280 z-9"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={50}
                height={50}
                className="absolute right-1/2 bottom-58 z-9"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={45}
                height={45}
                className="absolute left-36 bottom-20 z-10"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={55}
                height={55}
                className="absolute right-24 bottom-10 z-10"
            />

        </div>
    );
};
