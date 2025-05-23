'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import {signOut} from "next-auth/react";

const menuItems = [
    {
        title: 'Trang chủ',
        href: '/',
    },
    {
        title: 'Giới thiệu',
        submenu: [
            { title: 'Câu chuyện', href: '/story' },
            { title: 'Thông điệp và giá trị cốt lõi', href: '/value' },
            { title: 'Phương pháp giáo dục', href: '/method' },
            { title: 'Cơ sở vật chất', href: '/facilities' },
            { title: 'Nội quy An toàn trường học AMG', href: '#' },
        ],
    },
    {
        title: 'Hệ thống lớp học',
        submenu: [
            { title: 'Blueberry', href: '/schedule/blueberry' },
            { title: 'Cherry', href: '/schedule/cherry' },
            { title: 'Lemon', href: '/schedule/lemon' },
            { title: 'Mango', href: '/schedule/mango' },
            { title: 'International', href: '/schedule/international' },
        ],
    },
    {
        title: 'Tin tức sự kiện',
        submenu: [
            { title: 'Tiết học của con', href: '/artical-lessons' },
            { title: 'Sự kiện AMG', href: '/events' },
            { title: 'Tuyển dụng', href: '/recruitments' },
            {
                title: 'Private policy',
                submenu: [
                    { title: 'Chính sách bảo mật', href: '#' },
                    { title: 'Điều khoản sử dụng', href: '#' },
                ],
            },
        ],
    },
    {
        title: 'Thư viện AMG',
        submenu: [
            { title: 'Bé khéo tay', href: '/handy-baby' },
            { title: 'Cẩm nang chăm trẻ', href: '/handbooks' },
            { title: 'Học online cùng AMG', href: '/learn-online' },
        ],
    },
    {
        title: 'Tuyển sinh',
        submenu: [
            { title: 'Thông tin tuyển sinh', href: '/admissions' },
            { title: 'Quy định tài chính', href: '/financial-regulations' },
        ],
    },
    {
        title: 'Liên hệ',
        href: '/contact',
    }
];

type HeaderMenuProps = {
    isAuthenticated: boolean;
};

export default function HeaderMenu({ isAuthenticated }: HeaderMenuProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
        setOpenIndex(null);
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpen]);

    const handleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="relative z-50">
            {isMobile ? (
                <>
                    <button
                        className="p-2 text-black lg:hidden"
                        onClick={handleToggleMenu}
                    >
                        <Bars3Icon className="absolute h-6 w-6 top-15 left-4 text-[#FFA500]" />
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm"
                                    onClick={handleToggleMenu}
                                />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="fixed top-0 left-0 bottom-0 w-72 bg-[#FFF8F5] z-50 shadow-lg overflow-y-auto"
                                >
                                    <div className="flex justify-between items-center px-4 py-4 border-b">
                                        <span className="text-lg font-semibold">Menu</span>
                                        <button onClick={handleToggleMenu}>
                                            <XMarkIcon className="w-6 h-6 text-gray-700" />
                                        </button>
                                    </div>
                                    <nav className="flex flex-col gap-2 p-4">
                                        {menuItems.map((item, index) => {
                                            const hasSubmenu = Array.isArray(item.submenu);
                                            return (
                                                <div key={index}>
                                                    {item.href && !hasSubmenu ? (
                                                        <Link
                                                            href={item.href}
                                                            className="block px-3 py-2 bg-[#FFE5E5] rounded hover:bg-[#ffd3d3] font-semibold"
                                                            onClick={handleToggleMenu}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleOpen(index)}
                                                                className="flex items-center justify-between w-full px-3 py-2 bg-[#FFE5E5] rounded hover:bg-[#ffd3d3] font-semibold"
                                                            >
                                                                {item.title}
                                                                <ChevronDownIcon
                                                                    className={`ml-2 h-4 w-4 transition-transform ${
                                                                        openIndex === index ? 'rotate-180' : ''
                                                                    }`}
                                                                />
                                                            </button>
                                                            <AnimatePresence>
                                                                {openIndex === index && (
                                                                    <motion.ul
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: 'auto', opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        className="pl-4 mt-2 space-y-1"
                                                                    >
                                                                        {item.submenu?.map((sub, subIdx) => (
                                                                            <li key={subIdx}>
                                                                                {'submenu' in sub ? (
                                                                                    <>
                                                                                        <span className="block px-2 py-1 text-sm font-normal text-gray-700">
                                                                                          {sub.title}
                                                                                        </span>
                                                                                        <ul className="pl-4 space-y-1">
                                                                                            {sub.submenu?.map((deep, deepIdx) => (
                                                                                                <li key={deepIdx}>
                                                                                                    <Link
                                                                                                        href={deep.href}
                                                                                                        className="block px-2 py-1 text-sm text-gray-700 hover:bg-[#FFE5E5] rounded"
                                                                                                        onClick={handleToggleMenu}
                                                                                                    >
                                                                                                        {deep.title}
                                                                                                    </Link>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </>
                                                                                ) : (
                                                                                    <Link
                                                                                        href={sub.href}
                                                                                        className="block px-2 py-1 text-sm text-gray-700 hover:bg-[#FFE5E5] rounded"
                                                                                        onClick={handleToggleMenu}
                                                                                    >
                                                                                        {sub.title}
                                                                                    </Link>
                                                                                )}
                                                                            </li>
                                                                        ))}
                                                                        {!isAuthenticated ? (
                                                                            <li>
                                                                                <Link
                                                                                    href="/login"
                                                                                    className="block px-2 py-1 text-sm text-gray-700 hover:bg-[#FFE5E5] rounded"
                                                                                    onClick={handleToggleMenu}
                                                                                >
                                                                                    Đăng nhập
                                                                                </Link>
                                                                            </li>
                                                                        ) : (
                                                                            <li>
                                                                                <button
                                                                                    onClick={() => {
                                                                                        signOut({ callbackUrl: "/" });
                                                                                        handleToggleMenu();
                                                                                    }}
                                                                                    className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-[#FFE5E5] rounded"
                                                                                >
                                                                                    Đăng xuất
                                                                                </button>
                                                                            </li>
                                                                        )}
                                                                    </motion.ul>
                                                                )}
                                                            </AnimatePresence>
                                                        </>
                                                    )}
                                                </div>
                                            );
                                        })}
                                        {!isAuthenticated ? (
                                            <Link
                                                href="/login"
                                                className="block px-3 py-2 bg-[#FFE5E5] rounded hover:bg-[#ffd3d3] font-semibold mt-4 text-center"
                                                onClick={handleToggleMenu}
                                            >
                                                Đăng nhập
                                            </Link>
                                        ) : (
                                            <div>
                                                <Link
                                                    href="/admin-dashboard"
                                                    className="block px-3 py-2 bg-[#FFE5E5] rounded hover:bg-[#ffd3d3] font-semibold mt-4 text-center"
                                                    onClick={handleToggleMenu}
                                                >
                                                    Admin Dashboard
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        signOut({callbackUrl: "/"});
                                                        handleToggleMenu();
                                                    }}
                                                    className="block w-full px-3 py-2 bg-[#FFE5E5] rounded hover:bg-[#ffd3d3] font-semibold mt-4"
                                                >
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        )}
                                    </nav>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <nav
                    className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-4 px-4 py-2 text-sm font-semibold whitespace-nowrap">
                    {menuItems.map((item, index) => {
                        const hasSubmenu = Array.isArray(item.submenu);
                        return (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => setOpenIndex(index)}
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
                                            className="px-2 py-1 bg-[#FFE5E5] rounded hover:bg-[#ffd3d3] flex transition items-center"
                                        >
                                            {item.title}
                                            {hasSubmenu && (
                                                <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-600" />
                                            )}
                                        </button>
                                        <AnimatePresence>
                                            {openIndex === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 mt-2 w-64 z-50 bg-white border shadow-lg rounded-xl"
                                                >
                                                    <ul className="py-2">
                                                        {item.submenu?.map((sub, subIdx) => (
                                                            <li key={subIdx} className="relative group">
                                                                {'submenu' in sub ? (
                                                                    <>
                                    <span className="block px-4 py-2 hover:bg-[#FFE5E5] transition cursor-pointer flex items-center">
                                      {sub.title}
                                        <ChevronRightIcon className="ml-2 h-4 w-4 text-gray-600" />
                                    </span>
                                                                        <ul className="absolute top-0 left-full mt-0 ml-1 w-56 bg-white shadow-lg rounded-xl border z-50 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 transition duration-200 translate-x-2 pointer-events-none group-hover:pointer-events-auto">
                                                                            {sub.submenu?.map((deep, deepIdx) => (
                                                                                <li key={deepIdx}>
                                                                                    <Link
                                                                                        href={deep.href}
                                                                                        className="block px-4 py-2 hover:bg-[#FFE5E5] transition"
                                                                                    >
                                                                                        {deep.title}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </>
                                                                ) : (
                                                                    <Link
                                                                        href={sub.href}
                                                                        className="block px-4 py-2 hover:bg-[#FFE5E5] transition"
                                                                    >
                                                                        {sub.title}
                                                                    </Link>
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
            )}
        </div>
    );
}
