'use client';
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { use } from "react";
import { useState } from "react";
import {Menu} from "@headlessui/react";
import {MoreVertical} from "lucide-react";
import {useSession} from "next-auth/react";
import {deletePost} from "@/app/utils/deletePost";

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

export default function AdmissionDetail({ params }: { params: Promise<{ admissionId: string }> }) {
    const { data: session } = useSession();

    const role = session?.user?.role;
    const [comments, setComments] = useState([
        {
            name: "Nguyễn Văn A",
            email: "vana@example.com",
            content: "Một sự kiện hay!",
        },
        {
            name: "Trần Thị B",
            email: "thib@example.com",
            content: "Cảm ơn các cô vì những sự kiện tuyệt vời!",
        },
    ]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        content: "",
    });
    const { admissionId } = use(params);
    const admissions = [
        {
            id: "1",
            title: "TUYỂN SINH LỚP HỌC AMG TẠI NHÀ SAU KỲ NGHỈ TẾT",
            date: "27/06/2022",
            author: "admin",
            content: `Sau khi triển khai một thời gian nhà trường rất hạnh phúc khi nhận được sự ủng hộ và động viên từ...
Sau khi triển khai một thời gian nhà trường rất hạnh phúc khi nhận được sự ủng hộ và động viên từ các quý bậc phụ huynh dành cho dự án “#Lớp_học_AMG_tại_nhà” 
Một năm qua thật dài với cả cô và các con, lễ khai giảng online, Giáng sinh online... tất cả đã qua cùng với rất nhiều sự cố gắng của các con, các bố mẹ và cô giáo.
Kỳ nghỉ Tết lần này cũng kéo dài hơn mọi năm, bố mẹ cũng chuẩn bị quay trở lại với bộn bề công việc và mối bận tâm tìm kiếm phương án giáo dục, chăm sóc cho con. Nhưng bố mẹ đừng lo vì đã có AMG và giải pháp toàn diện giúp phụ huynh đồng hành cùng con phát triển mỗi ngày. 
Không dừng lại ở việc chăm sóc, các con sẽ được tham gia các hoạt động học tập, trải nghiệm nhận biết khám phá với những ưu điểm vượt trội, giúp phụ huynh an tâm:
Giáo án chuẩn Quốc tế, áp dụng phương pháp giáo dục Phần Lan dành riêng cho trẻ từ 1 tuổi trở lên, nội dung chi tiết cụ thể theo từng ngày,
Cung cấp bộ sách bản quyền giúp trẻ phát triển toàn diện,
Giải pháp trọn gói từ giáo dục đến dinh dưỡng, cung cấp dịch vụ bữa ăn cho trẻ đảm bảo an toàn thực phẩm với sự tư vấn tận tình từ các chuyên gia,
Đội ngũ giáo viên yêu nghề, chuyên môn cao, bằng cấp quốc tế.
Liên hệ ngay AMG để được tư vấn và lựa chọn những gì tốt đẹp nhất cho con yêu của bạn! "Lớp học AMG tại nhà” đồng hành cùng bé phát triển, giáo dục sớm mùa dịch!`,
            imageHeader: "/admissions/admission1.png",
            image1: "",
            image2: "",
            image3: "",
            image4: "",
            image5: "",
        },
    ];
    const admission = admissions.find((item) => item.id === admissionId);
    if (!admission) return notFound();
    const { day, month } = formatDateDisplay(admission.date);
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
                            href="/admissions"
                            className="font-medium text-[#FFC107] hover:underline"
                        >
                            Tuyển sinh
                        </Link>
                        <span>/</span>
                        <span className="text-[#FFC107] font-medium">
                            {admission.title}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-[#FFD668] text-xl md:text-2xl text-center mt-8 uppercase">
                    Tuyển sinh
                </h3>
                <Image
                    src={admission.imageHeader}
                    alt={admission.title}
                    width={600}
                    height={300}
                    className="rounded-lg shadow mb-6"
                />
                <div className="w-full p-6 md:p-12 relative">
                    <div className="max-w-4xl mx-auto">
                        <p className="absolute top-5 left-30 text-sm text-black mb-2">Đăng bởi: {admission.author}</p>
                        <h1 className="absolute top-12 left-30 text-[#FFC107] text-xl font-bold uppercase">{admission.title}</h1>
                        {(role === "admin" || role === "teacher") && (
                            <div className="absolute top-4 right-4">
                                <Menu>
                                    <Menu.Button className="p-2 rounded-full hover:bg-[#FFF9E5]">
                                        <MoreVertical className="w-5 h-5 text-[#FFC107]" />
                                    </Menu.Button>
                                    <Menu.Items
                                        className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-30">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href={`/post/edit/${admission.id}`}
                                                    className={`block w-full px-4 py-2 text-sm text-left ${
                                                        active ? 'bg-[#FFF9E5] text-[#FFC107]' : 'text-gray-700'
                                                    }`}
                                                >
                                                    Chỉnh sửa
                                                </Link>
                                            )}
                                        </Menu.Item>

                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => deletePost(admission.id, "/admissions")}
                                                    className={`block w-full px-4 py-2 text-sm text-left ${
                                                        active ? 'bg-[#FFE5E5] text-[#FF0000]' : 'text-gray-700'
                                                    }`}
                                                >
                                                    Xóa
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            </div>
                        )}
                        <div
                            className="w-[70px] h-[70px] bg-[#FFD668] absolute top-5 left-7 rounded-xl flex items-center justify-center shadow-md">
                            <div
                                className="bg-[#FDCED0] w-[50px] h-[50px] rounded flex flex-col items-center justify-center">
                                <span className="text-white text-2xl font-bold leading-none">{day}</span>
                                <span className="text-white text-xs leading-none">Tháng {month}</span>
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="text-[15px] leading-loose text-gray-800 whitespace-pre-line pt-40">
                            <span className="bg-[#FDCED0]">{parseContent(admission.content)}</span>
                        </div>

                        {/* Optional images */}
                        {[admission.image1, admission.image2, admission.image3, admission.image4, admission.image5]
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
