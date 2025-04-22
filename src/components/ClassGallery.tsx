'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export default function ClassGallery() {
    const classNames = ['BLUEBERRY', 'CHERRY', 'LEMON', 'MANGO', 'INTERNATIONAL'];
    const containerRef = useRef<HTMLDivElement>(null); // ✅
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button === 2) {
            setIsMouseDown(true);
            setStartX(e.clientX);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isMouseDown) return;
        const x = e.clientX;
        const walk = (x - startX) * 2;
        if (containerRef.current) {
            containerRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        if (containerRef.current) {
            setScrollLeft(containerRef.current.scrollLeft);
        }
    };

    return (
        <div className="w-full text-center">
            <h2 className="text-2xl font-bold text-[#FF6A00] mb-6">HỆ THỐNG LỚP HỌC</h2>

            <div className="relative">
                <div
                    ref={containerRef}
                    className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory px-2"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp} // Also stop dragging if mouse leaves the container
                >
                    {classNames.map((name, index) => (
                        <div
                            key={index}
                            className="min-w-[260px] h-[180px] flex-shrink-0 rounded-xl overflow-hidden border-4 border-dashed border-[#FFD966] bg-white snap-start"
                        >
                            <Image
                                src={`/class/${name.toLowerCase()}.png`}
                                alt={name}
                                width={260}
                                height={180}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>

                {/* Ẩn thanh scroll cho Chrome/Safari */}
                <style jsx>{`
                    div::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
            </div>
        </div>
    );
}
