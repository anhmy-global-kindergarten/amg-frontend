import Image from "next/image";
import Link from "next/link";

interface PageProps {
    params: {
        className: string;
    };
}

const Page = async ({ params }: PageProps) => {
    const { className } = params;

    const classImages: Record<string, string> = {
        "international": "/schedule/schedule_international.png",
        "blueberry": "/schedule/schedule_blueberry.png",
        "mango": "/schedule/schedule_mango.png",
        "lemon": "/schedule/schedule_lemon.png",
        "cherry": "/schedule/schedule_cherry.png",
    };

    const classColors: Record<string, string> = {
        "international": "#8ED4DD",
        "blueberry": "#BF97C5",
        "mango": "#F4E97A",
        "lemon": "#BEDC94",
        "cherry": "#ECBFC4",
    };

    const imageUrl = classImages[className];
    const classColor = classColors[className] || "#87CEFA";

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
            <div className="relative w-full max-w-5xl z-10 flex flex-col items-center">
                {/* Breadcrumb */}
                <div className="w-full mb-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="font-semibold text-black hover:underline">
                            Trang chủ
                        </Link>
                        <span>/</span>
                        <span className="text-[#FFC107] font-medium">Tin tức sự kiện</span>
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
                <div className="text-center mb-10">
                    <h1 className="text-2xl font-semibold text-[#558FCB] bg-[#FACBCC]">
                        Hành trình một ngày của bé yêu tại AMG Kindergarten
                    </h1>
                    <h2
                        className="text-4xl font-bold mt-2 uppercase tracking-wider inline-block px-2 py-1 rounded bg-[#FACBCC]"
                        style={{color: classColor}}
                    >
                        {className === "international"
                            ? "international class"
                            : className.replace("-", " ")
                        }
                    </h2>

                </div>

                {imageUrl ? (
                    <div className="w-full">
                        <Image
                            src={imageUrl}
                            alt={`Lịch trình lớp ${className}`}
                            width={1200}
                            height={800}
                            className="rounded-lg w-full h-auto object-contain"
                            priority
                        />
                    </div>
                ) : (
                    <div className="mt-10 text-red-500 font-semibold text-xl">
                        Không tìm thấy nội dung phù hợp!
                    </div>
                )}
            </div>

            {/* Elephant Icon */}
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

export default Page;
