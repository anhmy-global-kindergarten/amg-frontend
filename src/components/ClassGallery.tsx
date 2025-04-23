'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

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

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsMouseDown(false);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, []);

    return (
        <div className="w-full text-center px-4">
            <h2 className="text-2xl font-bold text-[#FF6A00] mb-6">HỆ THỐNG LỚP HỌC</h2>

            <div className="w-full bg-[#fff7cc] py-10 flex flex-wrap gap-4 items-center justify-center">
                <Image
                    src="/info/amg_box1.png"
                    alt="Tab các cơ sở"
                    width={300}
                    height={100}
                    className="mb-4"
                />
                <Image
                    src="/info/amg_box2.png"
                    alt="Tab các cơ sở"
                    width={300}
                    height={100}
                    className="mb-4"
                />
                <Image
                    src="/info/amg_box3.png"
                    alt="Tab các cơ sở"
                    width={300}
                    height={100}
                    className="mb-4"
                />
            </div>

            <div className="w-full lg:w-[70%] mx-auto">
                <div
                    ref={containerRef}
                    className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory px-2 select-none cursor-grab active:cursor-grabbing"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                >
                    {classNames.map((name, index) => (
                        <Image
                            key={index}
                            src={`/class/${name.toLowerCase()}.png`}
                            alt={name}
                            width={380}
                            height={280}
                            onDragStart={(e) => e.preventDefault()}
                            className="object-contain flex-shrink-0 snap-start"
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
