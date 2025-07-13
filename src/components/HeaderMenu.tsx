'use client';
/* eslint-disable */
import {useEffect, useRef, useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import {useAuth} from "@/app/hooks/useAuth";
import React from 'react';

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
            { title: 'Nội quy An toàn trường học AMG', href: '/rules' },
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
                title: 'Privacy policy',
                submenu: [
                    { title: 'Privacy policy 1', href: '/privacy/1' },
                    { title: 'Privacy policy 2', href: '/privacy/2' },
                    { title: 'AMG Management - Privacy policy', href: '/privacy/all' },
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
            {
                title: 'Quy định tài chính',
                submenu: [
                    { title: 'Quy định tài chính \nAMG Kindergarten', href: '/financial-regulations' },
                    { title: 'Biểu phí AMG cơ sở \nHàm Nghi', href: '/financial-regulations/ham-nghi' },
                    { title: 'Biểu phí AMG cơ sở \nDuy Tân', href: '/financial-regulations/duy-tan' },
                    { title: 'Biểu phí AMG cơ sở \nEcopark', href: '/financial-regulations/ecopark' },
                ],
            },
        ],
    },
    {
        title: 'Liên hệ',
        href: '/contact',
    }
];

type SubmenuPosition = 'left' | 'right';

export default function HeaderMenu() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [deepSubmenuPositions, setDeepSubmenuPositions] = useState<Record<string, SubmenuPosition>>({});
    const submenuRefs = useRef<(HTMLDivElement | null)[]>([]);
    const deepSubmenuRefs = useRef<Record<string, HTMLUListElement | null>>({});
    const { isAuthenticated, name: userName, role: userRole } = useAuth();

    const handleLogout = async () => {
        await fetch('/api-v1/auth-self/logout', { method: 'POST' });
        window.location.href = "/";
    };
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

    const AuthButtons = ({ isMobile = false }) => (
        <div className={isMobile ? "flex flex-col gap-2" : "flex items-center gap-4"}>
            {(userRole === 'admin') && (
                <>
                    <Link href="/post/create" className="font-mali-bold px-3 py-2 bg-[#FFD668] text-black rounded hover:bg-[#ffc107] font-semibold text-center" onClick={isMobile ? handleToggleMenu : undefined}>
                        Tạo bài viết
                    </Link>
                    <Link href="/admin-dashboard" className="font-mali-bold px-3 py-2 bg-[#FFD668] text-black rounded hover:bg-[#ffc107] font-semibold text-center" onClick={isMobile ? handleToggleMenu : undefined}>
                        Dashboard
                    </Link>
                </>
            )}
            {(userRole === 'teacher') && (
                <>
                    <Link href="/post/create" className="font-mali-bold px-3 py-2 bg-[#FFD668] text-black rounded hover:bg-[#ffc107] font-semibold text-center" onClick={isMobile ? handleToggleMenu : undefined}>
                        Tạo bài viết
                    </Link>
                </>
            )}
            <button
                onClick={() => handleLogout()}
                className="font-mali-bold w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-semibold"
            >
                Đăng xuất
            </button>
        </div>
    );

    const GuestButtons = ({ isMobile = false }) => (
        <Link
            href="/login"
            className="font-mali-bold block px-3 py-2 bg-[#FFC107] text-white rounded hover:bg-[#e5a906] font-semibold text-center"
            onClick={isMobile ? handleToggleMenu : undefined}
        >
            Đăng nhập
        </Link>
    );

    const calculateDeepSubmenuPosition = (parentIndex: number, subIndex: number) => {
        const key = `${parentIndex}-${subIndex}`;
        const deepSubmenuElement = deepSubmenuRefs.current[key];
        const parentLiElement = deepSubmenuElement?.closest('li.group');

        if (deepSubmenuElement && parentLiElement) {
            const rect = deepSubmenuElement.getBoundingClientRect();
            const parentRect = parentLiElement.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            const estimatedRightEdge = parentRect.right + rect.width;

            if (estimatedRightEdge > viewportWidth && parentRect.left - rect.width > 0) {
                setDeepSubmenuPositions(prev => ({ ...prev, [key]: 'left' }));
            } else {
                setDeepSubmenuPositions(prev => ({ ...prev, [key]: 'right' }));
            }
        }
    };

    return (
        <div className="relative z-[99999]">
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
                                    className="fixed top-0 left-0 bottom-0 w-72 bg-[#FFF6C7] z-50 shadow-lg overflow-y-auto"
                                >
                                    <div className="flex justify-between items-center px-4 py-4 border-b">
                                        <span
                                            className="font-mali-bold text-lg font-bold text-[#EA570A]">AMG Menu</span>
                                        <button onClick={handleToggleMenu}>
                                            <XMarkIcon className="w-6 h-6 text-[#EA570A]"/>
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
                                                            className="font-mali-semibold block px-3 py-2 bg-white/70 text-gray-800 rounded-lg hover:bg-[#FFC107] hover:text-white font-semibold transition-colors"
                                                            onClick={handleToggleMenu}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleOpen(index)}
                                                                className="font-mali-semibold flex items-center justify-between w-full px-3 py-2 bg-white/70 text-gray-800 rounded-lg hover:bg-[#FFC107] hover:text-white font-semibold transition-colors"
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
                                                                        initial={{height: 0, opacity: 0}}
                                                                        animate={{height: 'auto', opacity: 1}}
                                                                        exit={{height: 0, opacity: 0}}
                                                                        className="pl-4 mt-2 space-y-1"
                                                                    >
                                                                        {item.submenu?.map((sub, subIdx) => (
                                                                            <li key={subIdx}>
                                                                                {'submenu' in sub ? (
                                                                                    <>
                                                                                        <span
                                                                                            className="font-mali-semibold block px-2 py-1 text-sm font-semibold text-[#EA570A]">
                                                                                          {sub.title}
                                                                                        </span>
                                                                                        <ul className="pl-4 space-y-1">
                                                                                            {sub.submenu?.map((deep, deepIdx) => (
                                                                                                <li key={deepIdx}>
                                                                                                    <Link
                                                                                                        href={deep.href}
                                                                                                        className="font-mali-semibold block px-2 py-1 text-sm text-gray-700 hover:bg-white/70 rounded-md transition-colors"
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
                                                                                        className="font-mali-semibold block px-2 py-1 text-sm text-gray-700 hover:bg-white/70 rounded-md transition-colors"
                                                                                        onClick={handleToggleMenu}
                                                                                    >
                                                                                        {sub.title}
                                                                                    </Link>
                                                                                )}
                                                                            </li>
                                                                        ))}
                                                                    </motion.ul>
                                                                )}
                                                            </AnimatePresence>
                                                        </>
                                                    )}
                                                </div>
                                            );
                                        })}
                                        <div className="mt-4 pt-4 border-t border-yellow-300/50 flex flex-col gap-2">
                                            {status === 'loading' ? (
                                                <div className="text-center text-sm text-gray-500">Đang tải...</div>
                                            ) : isAuthenticated ? (
                                                <AuthButtons isMobile={true}/>
                                            ) : (
                                                <GuestButtons isMobile={true}/>
                                            )}
                                        </div>
                                    </nav>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </>
        </div>
    );
}
