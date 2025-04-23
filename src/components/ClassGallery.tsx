'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export default function ClassGallery() {
    const classNames = ['BLUEBERRY', 'CHERRY', 'LEMON', 'MANGO', 'INTERNATIONAL'];
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;
        setIsMouseDown(true);
        setStartX(e.clientX);
        if (containerRef.current) {
            setScrollLeft(containerRef.current.scrollLeft);
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
                    className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory px-2 select-none cursor-grab active:cursor-grabbing"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {classNames.map((name, index) => (
                        <Image
                            key={index}
                            src={`/class/${name.toLowerCase()}.png`}
                            alt={name}
                            width={320}
                            height={220}
                            className="min-w-[320px] h-[220px] object-contain flex-shrink-0 snap-start"
                        />
                    ))}
                </div>

                <style jsx>{`
                    div::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
            </div>
        </div>
    );
}
