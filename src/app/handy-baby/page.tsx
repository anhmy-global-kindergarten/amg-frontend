'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {usePostsByCategory} from "@/app/hooks/usePostsByCategory";
import {format} from "date-fns";
import LineClampContent from "@/app/utils/lineClamp";

// const articals = [
//     {
//         id: 1,
//         date: "27/06/2022",
//         title: "Chuyến tàu hoả số học",
//         author: "admin",
//         content: "AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
//         image: "/handy/handy1.png",
//     },
//     {
//         id: 2,
//         date: "14/06/2022",
//         title: "Chiếc chong chóng từ cốc giấy",
//         author: "admin",
//         content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
//         image: "/handy/handy2.png",
//     },
//     {
//         id: 3,
//         date: "27/06/2022",
//         title: "Chiếc bình số học",
//         author: "admin",
//         content: "Mùa hè lại đến rồi và chắc hẳn vèo véo veo vèo veo veéo veo veo vèo vèo véo veo vèo veo veéo veo veo vèo vèo véo veo vèo veo veéo veo veo vèo vèo véo veo vèo veo veéo veo veo vèo",
//         image: "/handy/handy3.png",
//     },
//     {
//         id: 4,
//         date: "14/06/2022",
//         title: "Khám phá hệ mặt trời",
//         author: "admin",
//         content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
//         image: "/handy/handy4.png",
//     },
//     {
//         id: 5,
//         date: "27/06/2022",
//         title: "Quá trình phát triển của thực vật",
//         author: "admin",
//         content: "Mùa hè lại đến rồi và chắc hẳn 1 trong những hoạt động các bạn nhỏ yêu thích nhất trong những nghèo nhèo nghéo ngheo nghèo nghe",
//         image: "/handy/handy5.png",
//     },
//     {
//         id: 6,
//         date: "14/06/2022",
//         title: "Học làm phương tiện giao thông",
//         author: "admin",
//         content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
//         image: "/handy/handy6.png",
//     },
// ];

export default function HandyBabyPage() {
    const { posts, loading, error } = usePostsByCategory("handy-baby");
    const [page, setPage] = useState(0);
    const router = useRouter();

    if (loading) return <div>Đang tải dữ liệu...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    const itemsPerPage = 6;
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const pagedArticals = posts.slice(
        page * itemsPerPage,
        (page + 1) * itemsPerPage
    );
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
                        <span className="text-[#FFC107] font-medium">
                            Bé khéo tay
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="font-mali-bold text-[#FFD668] text-xl md:text-2xl text-center mt-8 uppercase">
                    Bé khéo tay
                </h3>
                {/* Grid Lessons */}
                <div className="min-h-[830px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {pagedArticals.map(artical => (
                            <div
                                key={artical.id}
                                onClick={() => router.push(`/handy-baby/${artical.id}`)}
                                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col cursor-pointer"
                            >
                                {/* Image container with overlay date */}
                                <div className="relative w-full h-48">
                                    <img
                                        src={artical.header_image}
                                        alt={artical.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 font-mali-bold">
                                        <div
                                            className="text-white text-xs px-3 py-1 bg-no-repeat bg-contain bg-left h-6 flex items-center"
                                            style={{
                                                backgroundImage: "url('/icons/icon_backdrop_date_outside.png')",
                                                backgroundSize: "100% 100%",
                                            }}
                                        >
                                            {format(new Date(artical.create_at), "dd/MM/yyyy")}
                                        </div>
                                    </div>
                                </div>

                                {/* Text content */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h4 className="font-mali-bold text-[#FFD668] font-semibold text-base mb-1">
                                        {artical.title}
                                    </h4>
                                    <p className="font-mali text-xs text-black line-clamp-3">Đăng bởi: {artical.author}</p>
                                    <LineClampContent content={artical.content} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <div className="mt-8 flex items-center space-x-2">
                        {page > 0 && (
                            <button
                                onClick={() => setPage(page - 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-gray-700 hover:bg-gray-200"
                            >
                                &laquo;
                            </button>
                        )}

                        {Array.from({length: totalPages}, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-200 ${
                                    page === i
                                        ? "bg-[#FFD668] text-black"
                                        : "text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        {page < totalPages - 1 ? (
                            <button
                                onClick={() => setPage(page + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-gray-700 hover:bg-gray-200"
                            >
                                &raquo;
                            </button>
                        ) : (
                            <div className="w-8 h-8"/>
                        )}
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
