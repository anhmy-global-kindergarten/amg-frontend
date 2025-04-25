'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {ChevronRightIcon} from "@heroicons/react/16/solid";

const menuItems = [
    {
        title: "Trang chủ",
        href: "/",
    },
    {
        title: "Giới thiệu",
        submenu: [
            { title: "Câu chuyện", href: "#" },
            { title: "Thông điệp và giá trị cốt lõi", href: "#" },
            { title: "Phương pháp giáo dục", href: "#" },
            { title: "Cơ sở vật chất", href: "#" },
            { title: "Nội quy An toàn trường học AMG", href: "#" },
        ]
    },
    {
        title: "Hệ thống lớp học",
        submenu: [
            { title: "Blueberry", href: "#" },
            { title: "Cherryi", href: "#" },
            { title: "Lemon", href: "#" },
            { title: "Mango", href: "#" },
            { title: "International", href: "#" },
        ]
    },
    {
        title: "Tin tức sự kiện",
        submenu: [
            { title: "Tiết học của con", href: "#" },
            { title: "Sự kiện AMG", href: "#" },
            { title: "Tuyển dụng", href: "#" },
            {
                title: "Private policy",
                submenu: [
                    { title: "Chính sách bảo mật", href: "#" },
                    { title: "Điều khoản sử dụng", href: "#" },
                ]
            },
        ]
    },
    {
        title: "Thư viện AMG",
        submenu: [
            { title: "Bé khéo tay", href: "#" },
            { title: "Cẩm nang chăm trẻ", href: "#" },
            { title: "Học online cùng AMG", href: "#" },
        ]
    },
    {
        title: "Tuyển sinh",
        submenu: [
            { title: "Thông tin tuyển sinh", href: "#" },
            { title: "Quy định tài chính", href: "#" },
        ]
    },
    {
        title: "Liên hệ",
        href: "/contact",
    },
];

export default function HeaderMenu() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <nav className="hidden lg:flex gap-8 absolute top-10 left-1/2 -translate-x-1/2 text-sm font-semibold z-50">
            {menuItems.map((item, index) => {
                const hasSubmenu = Array.isArray(item.submenu);

                return (
                    <div
                        key={index}
                        className="relative"
                        onMouseLeave={() => setOpenIndex(null)}
                    >
                        {item.href && !hasSubmenu ? (
                            <Link
                                href={item.href}
                                className="px-2 py-1 bg-[#FFE5E5] rounded hover:bg-[#ffd3d3] transition block"
                            >
                                {item.title}
                            </Link>
                        ) : (
                            <>
                                <button
                                    className="px-2 py-1 bg-[#FFE5E5] rounded hover:bg-[#ffd3d3] flex transition"
                                    onMouseEnter={() => setOpenIndex(index)}
                                >
                                    {item.title}
                                    {hasSubmenu && (
                                        <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-600 transition-all duration-200 hover:text-gray-900" />
                                    )}
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-xl border z-40"
                                            onMouseEnter={() => setOpenIndex(index)} // Mở submenu khi hover vào submenu
                                        >
                                            <ul className="py-2">
                                                {item.submenu?.map((sub, subIdx) => (
                                                    <li key={subIdx} className="relative group">
                                                        {"submenu" in sub ? (
                                                            <>
                                                                <span className="block px-4 py-2 hover:bg-[#FFE5E5] transition cursor-pointer flex">
                                                                    {sub.title}
                                                                    <ChevronRightIcon className="ml-2 h-4 w-4 text-gray-600 transition-all duration-200 hover:text-gray-900"/>
                                                                </span>
                                                                <ul className="absolute top-0 left-full mt-0 ml-1 w-56 bg-white shadow-lg rounded-xl border z-40 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform transition duration-200 translate-x-2 pointer-events-none group-hover:pointer-events-auto">
                                                                    {sub.submenu?.map((deep, deepIdx) => (
                                                                        <li key={deepIdx}>
                                                                            <a
                                                                                href={deep.href}
                                                                                className="block px-4 py-2 hover:bg-[#FFE5E5] transition"
                                                                            >
                                                                                {deep.title}
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </>
                                                        ) : (
                                                            <a
                                                                href={sub.href}
                                                                className="block px-4 py-2 hover:bg-[#FFE5E5] transition"
                                                            >
                                                                {sub.title}
                                                            </a>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}