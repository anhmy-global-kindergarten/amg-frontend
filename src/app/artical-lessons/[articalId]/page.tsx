'use client';
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { useState } from "react";

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

export default function LessonDetail({ params }: { params: Promise<{ articalId: string }> }) {
    const [comments, setComments] = useState([
        {
            name: "Nguyễn Văn A",
            email: "vana@example.com",
            content: "Bài học rất thú vị và bổ ích!",
        },
        {
            name: "Trần Thị B",
            email: "thib@example.com",
            content: "Cảm ơn các cô vì những tiết học tuyệt vời!",
        },
    ]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        content: "",
    });
    const { articalId } = use(params);
    const lessons = [
        {
            id: "1",
            title: "Chiếc bể bơi chứa đầy nước và niềm vui",
            date: "27/06/2022",
            author: "admin",
            content: `Mùa hè lại đến rồi và chắc hẳn 1 trong những hoạt động các bạn nhỏ yêu thích nhất trong những ngày hè oi ả chính là bơi lội. Vì vậy,[highlight] những bể bơi di động đã được các cô chuẩn bị ngay ở sân sau của cơ sở 1[/highlight] để các con thỏa sức chơi đùa với nước 
AMG hiểu rằng vận động thể chất trong đó có các hoạt động với nước là những hoạt động cực kỳ quan trọng và tạo hứng thú lớn với con trẻ, vậy nên thầy giáo thể chất chuyên biệt của AMG luôn sẵn sàng tạo ra[highlight] những tiết học thú vị, an toàn, đúng quy cách và thật tự nhiên cho con trẻ[/highlight], với mong muốn con trẻ sẽ có những trải nghiệm vui và bổ ích nhất tại AMG 
Có những bạn nhỏ rất thích nước nhưng cũng có những bạn lại hơi rụt rè. Các hoạt động dưới nước như tập nín thở, sải cánh tay hay đạp nước… dần dần giúp các con làm quen với nước, khắc phục sự nhút nhát ban đầu để trở nên dạn dĩ và tận hưởng thêm nhiều niềm vui 
Tại AMG mỗi tiết học với nước của các con được diễn ra đều[highlight] đầy ắp tiếng cười và màu sắc[/highlight]. AMG lựa chọn một chiếc bể bơi không góc cạnh để làm cho tiết bơi của các con được an toàn và êm ái hơn... Những màu sắc sặc sỡ từ những bộ đồ bơi đáng yêu hay những chiếc phao bơi cùng bóng hơi đầy xinh động kèm theo đó là tiếng cười rộn ràng của con trẻ đã tạo nên những tiết bơi rất đặc trưng AMG. `,
            imageHeader: "/lessons/lesson1.png",
            image1: "/lessons/lesson1.png",
            image2: "/lessons/lesson1.png",
            image3: "/lessons/lesson1.png",
            image4: "/lessons/lesson1.png",
            image5: "",
        },
    ];
    const lesson = lessons.find((item) => item.id === articalId);
    if (!lesson) return notFound();
    const { day, month } = formatDateDisplay(lesson.date);
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
                            href="/artical-lessons"
                            className="font-medium text-[#FFC107] hover:underline"
                        >
                            Tiết học của con
                        </Link>
                        <span>/</span>
                        <span className="text-[#FFC107] font-medium">
                            {lesson.title}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-[#FFD668] text-xl md:text-2xl text-center mt-8 uppercase">
                    Tiết học của con
                </h3>
                <Image
                    src={lesson.imageHeader}
                    alt={lesson.title}
                    width={600}
                    height={300}
                    className="rounded-lg shadow mb-6"
                />
                <div className="w-full p-6 md:p-12 relative">
                    <div className="max-w-4xl mx-auto">
                        <p className="absolute top-5 left-30 text-sm text-black mb-2">Đăng bởi: {lesson.author}</p>
                        <h1 className="absolute top-12 left-30 text-[#FFC107] text-xl font-bold uppercase">{lesson.title}</h1>
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
                            <span className="bg-[#FDCED0]">{parseContent(lesson.content)}</span>
                        </div>

                        {/* Optional images */}
                        {[lesson.image1, lesson.image2, lesson.image3, lesson.image4, lesson.image5]
                            .filter(Boolean)
                            .map((img, i) => (
                                <Image
                                    key={i}
                                    src={img}
                                    alt={`Lesson image ${i + 1}`}
                                    width={800}
                                    height={400}
                                    className="w-full h-auto rounded-lg shadow mt-6"
                                />
                            ))}

                        <div className="w-full max-w-4xl mt-12 px-4 md:px-0">
                            <h4 className="text-xl font-bold text-[#FFB300] mb-6">Bình luận</h4>

                            {comments.length === 0 && (
                                <p className="text-gray-500 italic">Chưa có bình luận nào.</p>
                            )}

                            {comments.map((cmt, index) => (
                                <div
                                    key={index}
                                    className="mb-6 bg-[#FFF9E5] p-5 rounded-xl shadow-md border border-[#FFE082] hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-base font-semibold text-[#795548]">{cmt.name}</p>
                                        <p className="text-sm text-[#A1887F] italic">{cmt.email}</p>
                                    </div>
                                    <p className="text-gray-800 text-sm leading-relaxed">{cmt.content}</p>
                                </div>
                            ))}
                        </div>

                        <div className="w-full max-w-4xl mt-8 px-4 md:px-0">
                            <h4 className="text-[#FFC107] mb-4">Viết bình luận của bạn:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Họ và tên"
                                    className="rounded-full border px-4 py-2 text-black"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="rounded-full border px-4 py-2 text-black"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <textarea
                                placeholder="Viết bình luận"
                                className="w-full mt-4 border rounded-2xl px-4 py-2 text-black"
                                rows={4}
                                value={formData.content}
                                onChange={(e) => setFormData({...formData, content: e.target.value})}
                            ></textarea>
                            <img
                                src="/buttons/btn_comment.png"
                                alt="Gửi bình luận"
                                className="mt-4 w-40 cursor-pointer"
                                onClick={() => {
                                    if (!formData.name || !formData.email || !formData.content) return;
                                    setComments([...comments, formData]);
                                    setFormData({name: "", email: "", content: ""});
                                }}
                            />
                        </div>
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
