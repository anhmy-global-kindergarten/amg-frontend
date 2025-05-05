'use client';
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

function formatDateDisplay(dateStr: string) {
    const [day, month] = dateStr.split('/').map(Number);
    return { day, month };
}

function parseContent(content: string): React.ReactNode[] {
    const regex = /\[highlight\]([\s\S]*?)\[\/highlight\]/g;
    const parts: React.ReactNode[] = [];

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const [fullMatch, highlightedText] = match;
        const index = match.index;

        if (index > lastIndex) {
            parts.push(content.slice(lastIndex, index));
        }

        parts.push(
            <span key={index} className="text-[#FFD668]">
        {highlightedText}
      </span>
        );

        lastIndex = index + fullMatch.length;
    }

    if (lastIndex < content.length) {
        parts.push(content.slice(lastIndex));
    }

    return parts;
}

export default function RecruitmentDetail({ params }: { params: Promise<{ recruitmentId: string }> }) {
    const { recruitmentId } = use(params);
    const recruitments = [
        {
            id: "1",
            title: "AMG TUYỂN DỤNG GIÁO VIÊN MẦM NON",
            date: "22/06/2021",
            author: "admin",
            content: `AMG trân trọng thông báo: Chúng tôi đang tuyển dụng giáo viên mầm non cho năm học mới! Nếu bạn là người yêu trẻ, giàu năng lượng và mong muốn làm việc trong một môi trường giáo dục hiện đại, thân thiện thì đây chính là cơ hội dành cho bạn. [highlight]Mức lương cạnh tranh, chế độ đãi ngộ hấp dẫn[/highlight] cùng nhiều cơ hội phát triển chuyên môn đang chờ đón bạn tại AMG. [highlight]Ứng viên có kinh nghiệm hoặc mới tốt nghiệp ngành Sư phạm mầm non đều được khuyến khích ứng tuyển[/highlight]. Hãy gia nhập đội ngũ của chúng tôi để cùng nhau nuôi dưỡng và phát triển thế hệ tương lai!`,
            imageHeader: "/recruitments/recruitment1.png",
            image1: "",
            image2: "",
            image3: "",
            image4: "",
            image5: "",
        },
    ];
    const recruitment = recruitments.find((item) => item.id === recruitmentId);
    if (!recruitment) return notFound();
    const { day, month } = formatDateDisplay(recruitment.date);
    return (
        <div className="relative min-h-screen bg-white p-4 md:p-8 flex flex-col items-center overflow-hidden">
            {/* Background */}
            <Image
                src="/decorations/decor_bg.png"
                alt="Decor Background"
                fill
                className="object-cover opacity-100 pointer-events-none z-0"
                priority
            />

            <div className="relative w-full max-w-5xl z-10 flex flex-col items-center">
                {/* Breadcrumb */}
                <div className="w-full mb-6 text-sm text-gray-600">
                    <div className="flex flex-wrap items-center space-x-2">
                        <Link
                            href="/"
                            className="font-semibold text-black hover:underline"
                        >
                            Trang chủ
                        </Link>
                        <span>/</span>
                        <Link
                            href="/recruitments"
                            className="font-medium text-[#FFC107] hover:underline"
                        >
                            Tuyển dụng
                        </Link>
                        <span>/</span>
                        <span className="text-[#FFC107] font-medium">
                            {recruitment.title}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-[#FFD668] text-xl md:text-2xl text-center mt-8 uppercase">
                    Tuyển dụng
                </h3>
                <Image
                    src={recruitment.imageHeader}
                    alt={recruitment.title}
                    width={600}
                    height={300}
                    className="rounded-lg shadow mb-6"
                />
                <div className="w-full p-6 md:p-12 relative">
                    <div className="max-w-4xl mx-auto">
                        <p className="absolute top-5 left-30 text-sm text-black mb-2">Đăng bởi: {recruitment.author}</p>
                        <h1 className="absolute top-12 left-30 text-[#FFC107] text-xl font-bold uppercase">{recruitment.title}</h1>
                        <div
                            className="w-[70px] h-[70px] bg-[#FFD668] absolute top-5 left-7 rounded-xl flex items-center justify-center shadow-md">
                            <div
                                className="bg-[#FDCED0] w-[50px] h-[50px] rounded flex flex-col items-center justify-center">
                                <span className="text-white text-2xl font-bold leading-none">{day}</span>
                                <span className="text-white text-xs leading-none">Tháng {month}</span>
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="text-[15px] leading-loose text-gray-800 whitespace-pre-line mt-20">
                            <span className="bg-[#FDCED0]">{parseContent(recruitment.content)}</span>
                        </div>

                        {/* Optional images */}
                        {[recruitment.image1, recruitment.image2, recruitment.image3, recruitment.image4, recruitment.image5]
                            .filter(Boolean)
                            .map((img, i) => (
                                <Image
                                    key={i}
                                    src={img}
                                    alt={`Event image ${i + 1}`}
                                    width={800}
                                    height={400}
                                    className="w-full h-auto rounded-lg shadow mt-6"
                                />
                            ))}
                    </div>
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
}
