'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const event = [
    {
        id: 1,
        date: "27/06/2022",
        title: "AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH?",
        author: "admin",
        content: "AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
        image: "/event/event1.png",
    },
    {
        id: 2,
        date: "14/06/2022",
        title: "AMG TRẢI NGHIỆM VĂN HOÁ XEM PHIM ĐỘC ĐÁO TẠI MỸ",
        author: "admin",
        content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
        image: "/event/event2.png",
    },
    {
        id: 3,
        date: "27/06/2022",
        title: "TRIỂN LÃM DỰ ÁN KHỦNG LONG – THE DINOSAURS",
        author: "admin",
        content: "Mùa hè lại đến rồi và chắc hẳn vèo véo veo vèo veo veéo veo veo vèo vèo véo veo vèo veo veéo veo veo vèo vèo véo veo vèo veo veéo veo veo vèo vèo véo veo vèo veo veéo veo veo vèo",
        image: "/event/event3.png",
    },
    {
        id: 4,
        date: "14/06/2022",
        title: "HÌNH ẢNH ĐÁNG YÊU TRONG TRẢI NGHIỆM LÀM BÁNH TRÔI NGÀY TẾT HÀN THỰC",
        author: "admin",
        content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
        image: "/event/event4.png",
    },
    {
        id: 5,
        date: "27/06/2022",
        title: "HÌNH ẢNH ĐÁNG YÊU TRONG TRẢI NGHIỆM LÀM BÁNH TRÔI NGÀY TẾT HÀN THỰC",
        author: "admin",
        content: "Mùa hè lại đến rồi và chắc hẳn 1 trong những hoạt động các bạn nhỏ yêu thích nhất trong những nghèo nhèo nghéo ngheo nghèo nghe",
        image: "/event/event3.png",
    },
    {
        id: 6,
        date: "14/06/2022",
        title: "TRIỂN LÃM DỰ ÁN KHỦNG LONG – THE DINOSAURS",
        author: "admin",
        content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
        image: "/event/event4.png",
    },
    {
        id: 7,
        date: "27/06/2022",
        title: "AMG TRẢI NGHIỆM VĂN HOÁ XEM PHIM ĐỘC ĐÁO TẠI MỸ",
        author: "admin",
        content: "Mùa hè lại đến rồi và chắc hẳn AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
        image: "/event/event2.png",
    },
    {
        id: 8,
        date: "14/06/2022",
        title: "TRIỂN LÃM DỰ ÁN KHỦNG LONG – THE DINOSAURS",
        author: "admin",
        content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
        image: "/event/event1.png",
    },
    {
        id: 1,
        date: "27/06/2022",
        title: "AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH?",
        author: "admin",
        content: "AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
        image: "/event/event1.png",
    },
    {
        id: 2,
        date: "14/06/2022",
        title: "AMG TRẢI NGHIỆM VĂN HOÁ XEM PHIM ĐỘC ĐÁO TẠI MỸ",
        author: "admin",
        content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
        image: "/event/event2.png",
    },
    {
        id: 3,
        date: "27/06/2022",
        title: "TRIỂN LÃM DỰ ÁN KHỦNG LONG – THE DINOSAURS",
        author: "admin",
        content: "Mùa hè lại đến rồi và chắc hẳn vèo véo veo vèo veo veéo veo veo vèo vèo véo veo vèo veo veéo veo veo vèo vèo véo veo vèo veo veéo veo veo vèo vèo véo veo vèo veo veéo veo veo vèo",
        image: "/event/event3.png",
    },
    {
        id: 4,
        date: "14/06/2022",
        title: "HÌNH ẢNH ĐÁNG YÊU TRONG TRẢI NGHIỆM LÀM BÁNH TRÔI NGÀY TẾT HÀN THỰC",
        author: "admin",
        content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
        image: "/event/event4.png",
    },
    {
        id: 5,
        date: "27/06/2022",
        title: "HÌNH ẢNH ĐÁNG YÊU TRONG TRẢI NGHIỆM LÀM BÁNH TRÔI NGÀY TẾT HÀN THỰC",
        author: "admin",
        content: "Mùa hè lại đến rồi và chắc hẳn 1 trong những hoạt động các bạn nhỏ yêu thích nhất trong những nghèo nhèo nghéo ngheo nghèo nghe",
        image: "/event/event3.png",
    },
    {
        id: 6,
        date: "14/06/2022",
        title: "TRIỂN LÃM DỰ ÁN KHỦNG LONG – THE DINOSAURS",
        author: "admin",
        content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
        image: "/event/event4.png",
    },
    {
        id: 7,
        date: "27/06/2022",
        title: "AMG TRẢI NGHIỆM VĂN HOÁ XEM PHIM ĐỘC ĐÁO TẠI MỸ",
        author: "admin",
        content: "Mùa hè lại đến rồi và chắc hẳn AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
        image: "/event/event2.png",
    },
    {
        id: 8,
        date: "14/06/2022",
        title: "TRIỂN LÃM DỰ ÁN KHỦNG LONG – THE DINOSAURS",
        author: "admin",
        content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi AMG PHÁT ĐỘNG CUỘC THI ẢNH : “BABY, NEW VERSION” – ĐIỀU KÌ DIỆU MÙA DỊCH? (Dành cho phụ huynh có ",
        image: "/event/event1.png",
    },
];

export default function EventPage() {
    const itemsPerPage = 6;
    const totalPages = Math.ceil(event.length / itemsPerPage);
    const [page, setPage] = useState(0);
    const router = useRouter();
    const pagedEvents = event.slice(
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
                            Sự kiện AMG
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-[#FFD668] text-xl md:text-2xl text-center mt-8 uppercase">
                    Sự kiện AMG
                </h3>
                {/* Grid Lessons */}
                <div className="min-h-[830px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {pagedEvents.map((event) => (
                            <div
                                key={event.id}
                                onClick={() => router.push(`/event/${event.id}`)}
                                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col cursor-pointer"
                            >
                                {/* Image container with overlay date */}
                                <div className="relative w-full h-48">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0">
                                        <div
                                            className="text-white text-xs px-3 py-1 bg-no-repeat bg-contain bg-left h-6 flex items-center"
                                            style={{
                                                backgroundImage: "url('/icons/icon_backdrop_date_outside.png')",
                                                backgroundSize: "100% 100%",
                                            }}
                                        >
                                            {event.date}
                                        </div>
                                    </div>
                                </div>

                                {/* Text content */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h4 className="text-[#FFD668] font-semibold text-base mb-1">
                                        {event.title}
                                    </h4>
                                    <p className="text-xs text-black line-clamp-3">Đăng bởi: {event.author}</p>
                                    <p className="text-sm text-black line-clamp-3">
                                        {event.content.length > 101
                                            ? `${event.content.slice(0, 100)}...`
                                            : event.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Pagination Buttons */}
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
                            <div className="w-8 h-8" />
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
