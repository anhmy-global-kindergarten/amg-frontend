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
                        <span className="text-[#FFC107] font-medium">Thông điệp và giá trị cốt lõi</span>
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
                        TRIẾT LÝ GIÁO DỤC HỆ THỐNG MẦM NON AMG KINDERGARTEN
                    </p>
                    <br/>

                    <h2 className="text-[#7ED3F7] text-lg mb-6">
                        TÍNH HOẠT NGÔN
                    </h2>
                    <br/>
                    <p className="text-base mb-8 text-black z-20">
                        Chúng tôi quan tâm đến sự phát triển thể chất, tính cách của từng trẻ. Đặc biệt lấy ngôn ngữ làm
                        công cụ kết nối để con trẻ thể hiện cảm xúc, cá tính; cũng là cầu nối để người lớn có thể cảm
                        nhận, đồng hành cùng con một cách tốt nhất trên hành trình giáo dục mầm non.
                    </p>


                    <br/>
                    <h2 className="text-[#BFD730] text-lg mb-6">
                        SỰ TÔN TRỌNG
                    </h2>
                    <br/>
                    <p className="text-base mb-8 text-black z-20">
                        Trẻ em có quyền được phát triển cá tính cá nhân phù hợp. Vì vậy, việc lắng nghe và đồng cảm với
                        cảm xúc của trẻ là một trong những chìa khoá quan trọng. AMG luôn tạo ra cơ hội để trẻ có thể
                        thể hiện cá tính, quan điểm, cảm xúc cá nhân một cách tự nhiên nhất.
                    </p>
                    <br/>

                    <h2 className="text-[#FFD668] text-lg mb-6">
                        SỰ TIN CẬY
                    </h2>
                    <br/>
                    <p className="text-base mb-8 text-black z-20">
                        Sự tin cậy được xây dựng dựa trên sự tôn trọng và chia sẻ trách nhiệm với nhau. Khi tôn trọng và tin cậy, trẻ sẽ tự do khám phá, thử nghiệm và dễ thích nghi với môi trường xung quanh.
                    </p>
                    <br/>

                    <h2 className="text-[#F6ADCD] text-lg mb-6">
                        DUY TRÌ NĂNG LƯỢNG TÍCH CỰC
                    </h2>
                    <br/>
                    <p className="text-base mb-8 text-black z-20">
                        AMG nỗ lực tạo ra các hoạt động truyền cảm hứng, thúc đẩy tinh thần, tạo thói quen tốt cho trẻ để mỗi ngày tới trường đều là những ngày mang đầy năng lượng tích cực. Từ đó, điều này sẽ là tiền đề cho sự phát triển và hình thành những cá thể năng động và có ích cho xã hội
                    </p>
                    <br/>
                </div>
            </div>

            {/* Decorative Icons */}
            <Image
                src="/icons/icon_elephant_star.png"
                alt="Elephant Star"
                width={120}
                height={120}
                className="absolute right-10 top-10 z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={60}
                height={60}
                className="absolute right-5 top-40 z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={40}
                height={40}
                className="absolute right-[150px] top-[70px] z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={60}
                height={60}
                className="absolute left-5 top-40 z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={60}
                height={60}
                className="absolute left-10 top-[350px] z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={40}
                height={40}
                className="absolute right-[125px] top-[150px] z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={60}
                height={60}
                className="absolute left-[260px] top-[280px] z-9 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={50}
                height={50}
                className="absolute right-1/2 bottom-[58px] z-9 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={45}
                height={45}
                className="absolute left-[144px] bottom-[20px] z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={55}
                height={55}
                className="absolute right-24 bottom-[10px] z-10 hidden md:block"
            />
        </div>
    );
};
