'use client';
/* eslint-disable */
import {useEffect, useRef, useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import {signOut} from "next-auth/react";
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

type HeaderMenuProps = {
    isAuthenticated: boolean;
};

type SubmenuPosition = 'left' | 'right';

export default function HeaderMenu({ isAuthenticated }: HeaderMenuProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [deepSubmenuPositions, setDeepSubmenuPositions] = useState<Record<string, SubmenuPosition>>({});
    const submenuRefs = useRef<(HTMLDivElement | null)[]>([]);
    const deepSubmenuRefs = useRef<Record<string, HTMLUListElement | null>>({});

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

    const { name: userName, role: userRole } = useAuth();

    const AuthButtons = ({ isMobile = false }) => (
        <div className={isMobile ? "flex flex-col gap-2" : "flex items-center gap-4"}>
            {/* Các nút chỉ hiển thị cho admin hoặc teacher */}
            {(userRole === 'admin' || userRole === 'teacher') && (
                <>
                    <Link href="/post/create" className="px-3 py-2 bg-[#FFD668] text-black rounded hover:bg-[#ffc107] font-semibold text-center" onClick={isMobile ? handleToggleMenu : undefined}>
                        Tạo bài viết
                    </Link>
                    <Link href="/admin-dashboard" className="px-3 py-2 bg-[#FFD668] text-black rounded hover:bg-[#ffc107] font-semibold text-center" onClick={isMobile ? handleToggleMenu : undefined}>
                        Dashboard
                    </Link>
                </>
            )}
            <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-semibold"
            >
                Đăng xuất
            </button>
        </div>
    );

    // Component nút cho khách
    const GuestButtons = ({ isMobile = false }) => (
        <Link
            href="/login"
            className="block px-3 py-2 bg-[#FFC107] text-white rounded hover:bg-[#e5a906] font-semibold text-center"
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
                                                                                            className="block px-2 py-1 text-sm font-normal text-gray-700">
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
                                                                    </motion.ul>
                                                                )}
                                                            </AnimatePresence>
                                                        </>
                                                    )}
                                                </div>
                                            );
                                        })}
                                        <div className="mt-4 pt-4 border-t border-gray-300 flex flex-col gap-2">
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
            ) : (
                <nav
                    className="absolute top-10 left-1/2 -translate-x-100 flex justify-between w-[60%] gap-2 px-4 py-2 text-sm font-semibold whitespace-nowrap">
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
                                            {openIndex === index && hasSubmenu && (
                                                <motion.div
                                                    ref={el => { submenuRefs.current[index] = el; }}
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 mt-2 w-64 z-50 bg-white border shadow-lg rounded-xl"
                                                >
                                                    <ul className="py-2">
                                                        {item.submenu?.map((sub, subIdx) => (
                                                            <li
                                                                key={subIdx}
                                                                className="relative group"
                                                                onMouseEnter={() => {
                                                                    if ('submenu' in sub) {
                                                                        setTimeout(() => calculateDeepSubmenuPosition(index, subIdx), 0);
                                                                    }
                                                                }}
                                                            >
                                                                {'submenu' in sub ? (
                                                                    <>
                                                                        <span className="block px-4 py-2 hover:bg-[#FFE5E5] transition cursor-pointer flex items-center justify-between">
                                                                          {sub.title}
                                                                            <ChevronRightIcon className="ml-auto h-4 w-4 text-gray-600" />
                                                                        </span>
                                                                        <ul
                                                                            ref={el => {deepSubmenuRefs.current[`${index}-${subIdx}`] = el;}}
                                                                            className={`absolute top-0 mt-0 w-64 bg-white shadow-lg rounded-xl border z-50 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 transition duration-200 pointer-events-none group-hover:pointer-events-auto
                                                                                ${deepSubmenuPositions[`${index}-${subIdx}`] === 'left' ? 'right-full mr-1' : 'left-full ml-1'} 
                                                                            `}>
                                                                            {sub.submenu?.map((deep, deepIdx) => (
                                                                                <li key={deepIdx}>
                                                                                    <Link
                                                                                        href={deep.href}
                                                                                        className="block px-4 py-2 hover:bg-[#FFE5E5] transition"
                                                                                        onClick={() => setOpenIndex(null)}
                                                                                    >
                                                                                        {deep.title.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </>
                                                                ) : (
                                                                    <Link
                                                                        href={sub.href}
                                                                        className="block px-4 py-2 hover:bg-[#FFE5E5] transition"
                                                                        onClick={() => setOpenIndex(null)}
                                                                    >
                                                                        {sub.title.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
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
