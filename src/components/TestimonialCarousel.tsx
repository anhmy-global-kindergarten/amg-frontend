'use client';

import { useState } from "react";

const testimonials = [
    {
        content: "Qua những trải nghiệm tuyệt vời của con tại AMG, tôi thấy nhà trường đã thực sự làm tốt sứ mệnh của mình khi mang tới cho các con một môi trường học tập hiện đại, thân thiện và cởi mở...",
        name: "Nguyễn Hà Phương",
        desc: "Phụ huynh cháu Măng",
    },
    {
        content: "Con tôi đã thay đổi rất tích cực nhờ chương trình học và sự quan tâm của thầy cô ở đây. Tôi rất an tâm khi gửi gắm con tại AMG.",
        name: "Trần Minh Tâm",
        desc: "Phụ huynh bé Su",
    },
    {
        content: "Chương trình học phong phú, giáo viên tận tâm. Tôi đặc biệt ấn tượng với các hoạt động ngoại khóa hàng tháng.",
        name: "Lê Thảo Vy",
        desc: "Phụ huynh bé Na",
    },
    {
        content: "Không khí học tập tại trường rất vui vẻ và sáng tạo. Bé nhà tôi rất háo hức mỗi khi đến lớp.",
        name: "Đặng Quốc Hưng",
        desc: "Phụ huynh bé Bon",
    },
    {
        content: "Cơ sở vật chất hiện đại và sự chuyên nghiệp của đội ngũ giáo viên khiến tôi rất hài lòng.",
        name: "Ngô Bích Ngọc",
        desc: "Phụ huynh bé Miu",
    },
];

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1 < testimonials.length ? prev + 1 : prev));
    };

    const goBack = () => {
        setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
    };

    return (
        <div className="flex flex-col items-center space-y-6 mt-10 px-4">
            <div className="relative flex items-center justify-center w-full max-w-4xl">
                <button
                    onClick={goBack}
                    disabled={currentIndex === 0}
                    className="absolute left-0 text-3xl px-3 disabled:opacity-30"
                >
                    ‹
                </button>

                <div className="bg-[#E9F7FE] border-dashed border-2 border-[#FFA552] px-6 md:px-10 lg:px-16 py-8 lg:py-10 w-[360px] h-[320px] md:max-w-[1000px] lg:w-[900px] lg:h-[400px] text-center rounded-[120px] flex flex-col justify-center items-center">
                    <p className="text-[#4D4D4D] text-base md:text-lg lg:text-xl leading-7 md:leading-8 font-medium mb-4 md:mb-6 px-2 md:px-6">
                        {testimonials[currentIndex].content}
                    </p>
                    <p className="text-[#F86161] text-lg md:text-xl lg:text-2xl font-bold mb-1">
                        {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm md:text-base italic text-[#777]">
                        {testimonials[currentIndex].desc}
                    </p>
                </div>

                <button
                    onClick={goNext}
                    disabled={currentIndex === testimonials.length - 1}
                    className="absolute right-0 text-3xl px-3 disabled:opacity-30"
                >
                    ›
                </button>
            </div>

            <div className="flex space-x-2">
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-4 h-4 rounded-full transition-all duration-200 border ${
                            currentIndex === idx ? "bg-[#FFA552]" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
