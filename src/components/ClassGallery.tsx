'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ClassGallery() {
    const classNames = ['BLUEBERRY', 'CHERRY', 'LEMON', 'MANGO', 'INTERNATIONAL'];
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect screen size
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mouse drag events
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !containerRef.current) return;
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // drag speed
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    return (
        <div className="w-full max-w-9xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#FF6A00] mb-6">HỆ THỐNG LỚP HỌC</h2>

            {/* Static Section */}
            <div className="w-full bg-[#fff7cc] py-2 flex flex-wrap gap-3 items-center justify-center">
                <Image src="/info/amg_box1.png" alt="Tab 1" width={isMobile ? 120 : 300} height={isMobile ? 70: 100} style={{ height: isMobile ? '45px' : '' }} className="mb-4" />
                <Image src="/info/amg_box2.png" alt="Tab 2" width={isMobile ? 120 : 300} height={isMobile ? 70: 100} style={{ height: isMobile ? '45px' : '' }} className="mb-4" />
                <Image src="/info/amg_box3.png" alt="Tab 3" width={isMobile ? 120 : 300} height={isMobile ? 70: 100} style={{ height: isMobile ? '45px' : '' }} className="mb-4" />
            </div>

            {/* Carousel Section */}
            <div className="mt-8 overflow-hidden">
                <div
                    ref={containerRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 pb-2 select-none cursor-grab active:cursor-grabbing"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                >
                    {classNames.map((name, index) => (
                        <div
                            key={index}
                            className={`snap-start flex-shrink-0 w-[calc(33.333%-0.5rem)]`}
                        >
                            <Image
                                src={`/class/${name.toLowerCase()}.png`}
                                alt={name}
                                width={380}
                                height={280}
                                onDragStart={(e) => e.preventDefault()}
                                className="object-contain rounded-lg w-full"
                            />
                        </div>
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
