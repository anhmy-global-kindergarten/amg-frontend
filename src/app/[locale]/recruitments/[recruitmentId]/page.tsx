'use client';
/* eslint-disable */
import Image from "next/image";
import Link from "next/link";
import {notFound, useParams} from "next/navigation";
import React, { use } from "react";
import {Button, Menu} from "@headlessui/react";
import {MoreVertical} from "lucide-react";
import {useSession} from "next-auth/react";
import {usePostById} from "@/app/hooks/usePostById";
import {useAuth} from "@/app/hooks/useAuth";
import formatDateDisplay from "@/app/utils/formatDate";
import RenderHTMLContent from "@/app/utils/getContent";
import {deletePost} from "@/app/utils/deletePost";

export default function RecruitmentDetail() {
    const params = useParams();
    const articalId = params?.recruitmentId as string;

    const { post, images, loading, error } = usePostById(articalId);
    const { name, role } = useAuth();

    /*const recruitments = [
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
    ];*/
    if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
    if (error && !post) {
        return <p className="text-center text-red-500">Đã xảy ra lỗi khi tải sổ tay.</p>;
    }

    if (!post) {
        return notFound();
    }
    const { day, month } = formatDateDisplay(post.create_at);
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
                            {post.title}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="font-mali-bold text-[#FFD668] text-xl md:text-2xl text-center mt-8 uppercase">
                    Tuyển dụng
                </h3>
                <Image
                    src={post.header_image}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="rounded-lg shadow mb-6"
                />
                <div className="w-full p-6 md:p-12 relative">
                    <div className="max-w-4xl mx-auto">
                        <p className="font-mali absolute top-10 left-30 text-sm text-black mb-2">Đăng bởi: {post.author}</p>
                        <h1 className="font-mali-bold absolute top-15 left-30 text-[#FFC107] text-xl font-bold uppercase mb-2">{post.title}</h1>
                        {(role === "admin" || role === "teacher") && (
                            <div className="absolute top-4 right-4">
                                <Menu>
                                    <Menu.Button className="p-2 rounded-full hover:bg-[#FFF9E5]">
                                        <MoreVertical className="w-5 h-5 text-[#FFC107]" />
                                    </Menu.Button>
                                    <Menu.Items
                                        className="font-mali-semibold absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-30">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href={`/post/edit/${post.id}`}
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
                                                    onClick={() => deletePost(post.id, "/recruitments")}
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
                                className="w-[50px] h-[50px] rounded flex flex-col items-center justify-center">
                                <span className="font-mali-bold text-white text-2xl font-bold leading-none">{day}</span>
                                <span className="font-mali-medium text-white text-xs leading-none">Tháng {month}</span>
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="text-[15px] leading-loose text-gray-800 whitespace-pre-line pt-40">
                            <span className="font-mali bg-[#FDCED0]">
                                <RenderHTMLContent content={post.content} images={images} />
                            </span>
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
