'use client';

import {useEffect, useState} from 'react';
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
            { title: "Câu chuyện", href: "/story" },
            { title: "Thông điệp và giá trị cốt lõi", href: "/value" },
            { title: "Phương pháp giáo dục", href: "/method" },
            { title: "Cơ sở vật chất", href: "/facilities" },
            { title: "Nội quy An toàn trường học AMG", href: "#" },
        ]
    },
    {
        title: "Hệ thống lớp học",
        submenu: [
            { title: "Blueberry", href: "#" },
            { title: "Cherry", href: "#" },
            { title: "Lemon", href: "#" },
            { title: "Mango", href: "#" },
            { title: "International", href: "#" },
        ]
    },
    {
        title: "Tin tức sự kiện",
        submenu: [
            { title: "Thời khóa biểu", submenu: [
                { title: "International", href: "/schedule/international" },
                { title: "Mango", href: "/schedule/mango" },
                { title: "Blueberry", href: "/schedule/blueberry" },
                    { title: "Cherry", href: "/schedule/cherry" },
                    { title: "Lemon", href: "/schedule/lemon" },
                ]},
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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleOpen = (index: number) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    return (
        <div className="relative">
            <div className="overflow-x-auto lg:overflow-visible">
                <nav className={`flex gap-4 whitespace-nowrap text-sm font-semibold z-50
  ${isMobile ? 'relative pt-40 pl-5' : 'absolute top-10 left-1/2 -translate-x-1/2 px-4 py-2'}
  lg:justify-center lg:gap-8`}>
                    {menuItems.map((item, index) => {
                        const hasSubmenu = Array.isArray(item.submenu);

                        return (
                            <div
                                key={index}
                                className="relative"
                                onMouseLeave={() => !isMobile && setOpenIndex(null)}
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
                                            className="px-2 py-1 bg-[#FFE5E5] rounded hover:bg-[#ffd3d3] flex transition items-center"
                                            onClick={() => isMobile ? handleOpen(index) : undefined}
                                            onMouseEnter={() => !isMobile && setOpenIndex(index)}
                                        >
                                            {item.title}
                                            {hasSubmenu && (
                                                <ChevronDownIcon
                                                    className="ml-2 h-4 w-4 text-gray-600 transition-all duration-200 hover:text-gray-900"/>
                                            )}
                                        </button>

                                        <AnimatePresence>
                                            {openIndex === index && (
                                                <motion.div
                                                    initial={{opacity: 0, y: -5}}
                                                    animate={{opacity: 1, y: 0}}
                                                    exit={{opacity: 0, y: -5}}
                                                    transition={{duration: 0.2}}
                                                    className={`z-40 border rounded-xl bg-white shadow-lg
    ${isMobile ? 'relative mt-2 w-full' : 'absolute top-full left-0 mt-2 w-64'}`}
                                                    onMouseEnter={() => !isMobile && setOpenIndex(index)}
                                                >
                                                    <ul className="py-2">
                                                        {item.submenu?.map((sub, subIdx) => (
                                                            <li key={subIdx} className="relative group">
                                                                {"submenu" in sub ? (
                                                                    <>
                                                                <span
                                                                    className="block px-4 py-2 hover:bg-[#FFE5E5] transition cursor-pointer flex items-center"
                                                                >
                                                                    {sub.title}
                                                                    <ChevronRightIcon
                                                                        className="ml-2 h-4 w-4 text-gray-600 transition-all duration-200 hover:text-gray-900"/>
                                                                </span>
                                                                        <ul className={`${isMobile ? 'relative mt-2 w-full' : 'absolute top-0 left-full mt-0 ml-1 w-56'} bg-white shadow-lg rounded-xl border z-40 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform transition duration-200 ${isMobile ? '' : 'translate-x-2'} pointer-events-none group-hover:pointer-events-auto`}>
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
            </div>
        </div>
    );
}