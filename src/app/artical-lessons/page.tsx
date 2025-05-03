'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const lessons = [
    {
        id: 1,
        date: "27/06/2022",
        title: "CHIẾC BỂ BƠI CHỨA ĐẦY NƯỚC VÀ NIỀM VUI",
        content: "Mùa hè lại đến rồi và chắc hẳn...",
        image: "/lessons/lesson1.png",
    },
    {
        id: 2,
        date: "14/06/2022",
        title: "FOREST CLASS: LỚP HỌC NGOÀI TRỜI CÙNG AMG",
        content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi...",
        image: "/lessons/lesson2.png",
    },
    {
        id: 3,
        date: "27/06/2022",
        title: "CHIẾC BỂ BƠI CHỨA ĐẦY NƯỚC VÀ NIỀM VUI",
        content: "Mùa hè lại đến rồi và chắc hẳn...",
        image: "/lessons/lesson1.png",
    },
    {
        id: 4,
        date: "14/06/2022",
        title: "FOREST CLASS: LỚP HỌC NGOÀI TRỜI CÙNG AMG",
        content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi...",
        image: "/lessons/lesson2.png",
    },
    {
        id: 5,
        date: "27/06/2022",
        title: "CHIẾC BỂ BƠI CHỨA ĐẦY NƯỚC VÀ NIỀM VUI",
        content: "Mùa hè lại đến rồi và chắc hẳn...",
        image: "/lessons/lesson1.png",
    },
    {
        id: 6,
        date: "14/06/2022",
        title: "FOREST CLASS: LỚP HỌC NGOÀI TRỜI CÙNG AMG",
        content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi...",
        image: "/lessons/lesson2.png",
    },
    {
        id: 7,
        date: "27/06/2022",
        title: "CHIẾC BỂ BƠI CHỨA ĐẦY NƯỚC VÀ NIỀM VUI",
        content: "Mùa hè lại đến rồi và chắc hẳn...",
        image: "/lessons/lesson1.png",
    },
    {
        id: 8,
        date: "14/06/2022",
        title: "FOREST CLASS: LỚP HỌC NGOÀI TRỜI CÙNG AMG",
        content: "Bình minh vừa thức dậy Nắng vàng tỏa muôn nơi...",
        image: "/lessons/lesson2.png",
    },
];

export default function ArticalLessons() {
    const itemsPerPage = 6;
    const totalPages = Math.ceil(lessons.length / itemsPerPage);
    const [page, setPage] = useState(0);
    const router = useRouter();
    const pagedLessons = lessons.slice(
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
                            Tiết học của con
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-[#FFD668] text-xl md:text-2xl text-center mt-8 uppercase">
                    Tiết học của con
                </h3>
                {/* Grid Lessons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {pagedLessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            onClick={() => router.push(`/artical-lessons/${lesson.id}`)}
                            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
                        >
                            <img
                                src={lesson.image}
                                alt={lesson.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex flex-col flex-1">
                                <p className="text-[#FFC107] text-xs mb-1">{lesson.date}</p>
                                <h4 className="font-semibold text-base text-gray-800 mb-1">
                                    {lesson.title}
                                </h4>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {lesson.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Buttons */}
                <div className="mt-8 flex items-center space-x-4">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 0))}
                        disabled={page === 0}
                        className={`px-4 py-2 rounded-full shadow ${
                            page === 0
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-[#FFD668] hover:bg-[#FFC107] text-white"
                        }`}
                    >
                        Trước
                    </button>

                    <span className="text-sm text-gray-700">
            Trang {page + 1} / {totalPages}
          </span>

                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                        disabled={page >= totalPages - 1}
                        className={`px-4 py-2 rounded-full shadow ${
                            page >= totalPages - 1
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-[#FFD668] hover:bg-[#FFC107] text-white"
                        }`}
                    >
                        Tiếp
                    </button>
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
