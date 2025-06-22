'use client';
/* eslint-disable */
import Image from "next/image";
import Link from "next/link";
import {Menu} from "@headlessui/react";
import {MoreVertical} from "lucide-react";
import RenderStaticHTMLContent from "@/app/utils/getStaticPageContent";
import React from "react";
import {useAuth} from "@/app/hooks/useAuth";
import {useSinglePostByCategory} from "@/app/hooks/useSinglePostByCategory";

export default function FinancialRegulations() {
    const { name, role } = useAuth();
    const { post, loading, error } = useSinglePostByCategory("financial-regulations");
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
                            Quy định tài chính AMG Kindergarten
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-[#FFD668] text-xl md:text-2xl text-center mt-8 uppercase">
                    QUY ĐỊNH TÀI CHÍNH AMG KINDERGARTEN
                </h3>

                {/* Content */}
                <div className="mt-6 w-full space-y-4 text-black">
                    {loading && (
                        <p className="text-center text-gray-600 py-10">Đang tải nội dung...</p>
                    )}

                    {error && (
                        <p className="text-center text-red-500 py-10">Lỗi: {error}</p>
                    )}

                    {post && (
                        <>
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
                                                        href={`/static-post/edit/${post.id}`}
                                                        className={`block w-full px-4 py-2 text-sm text-left ${
                                                            active ? 'bg-[#FFF9E5] text-[#FFC107]' : 'text-gray-700'
                                                        }`}
                                                    >
                                                        Chỉnh sửa
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu>
                                </div>
                            )}
                            <div className="prose prose-lg max-w-none text-black">
                                <RenderStaticHTMLContent content={post.content} />
                            </div>
                        </>
                    )}
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
