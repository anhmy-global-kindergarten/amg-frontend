'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import EditableText from './landing-page/EditableText';
import EditableImage from './landing-page/EditableImage';
import {FaPlus, FaTrash} from "react-icons/fa";

interface ClassGalleryProps {
    title: string;
    box1Src: string;
    box2Src: string;
    box3Src: string;
    items: { name: string; imageSrc: string; }[];
    isEditMode: boolean;
    onSave: (id: string, value: string) => void;
    onAddItem: () => void;
    onDeleteItem: (index: number) => void;
}

export default function ClassGallery({ title, box1Src, box2Src, box3Src, items, isEditMode, onSave, onAddItem, onDeleteItem }: ClassGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || isEditMode) return;
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !containerRef.current || isEditMode) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    return (
        <div className="w-full max-w-9xl mx-auto text-center">
            <EditableText
                id="classGalleryTitle"
                initialHtml={title}
                onSave={onSave}
                isEditMode={isEditMode}
                tag="h2"
                className="text-4xl md:text-4xl text-center text-[#F7B052] mb-6"
                style={{ textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white' }}
            />

            {isEditMode && (
                <button
                    onClick={onAddItem}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
                >
                    <FaPlus /> Thêm Lớp
                </button>
            )}

            <div className="w-full bg-[#fff7cc] py-2 flex flex-wrap gap-3 items-center justify-center">
                <EditableImage id="classGalleryBox1Src" initialSrc={box1Src} altText="Tab 1" onSave={onSave} isEditMode={isEditMode} width={isMobile ? 120 : 300} height={isMobile ? 45 : 100} className="mb-4" />
                <EditableImage id="classGalleryBox2Src" initialSrc={box2Src} altText="Tab 2" onSave={onSave} isEditMode={isEditMode} width={isMobile ? 120 : 300} height={isMobile ? 45 : 100} className="mb-4" />
                <EditableImage id="classGalleryBox3Src" initialSrc={box3Src} altText="Tab 3" onSave={onSave} isEditMode={isEditMode} width={isMobile ? 120 : 300} height={isMobile ? 45 : 100} className="mb-4" />
            </div>

            <div>
                <Image src="/icons/icon_elephant1.png" alt="" width={isMobile ? 60 : 100} height={isMobile ? 30 : 50}
                       className="absolute right-0 top-[1200px]  lg:right-80 lg:top-[800px] z-99"/>
            </div>

            <div className="mt-8 overflow-hidden">
                <div
                    ref={containerRef}
                    className={`flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 pb-2 ml-2 select-none ${!isEditMode && 'cursor-grab active:cursor-grabbing'}`}
                    style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                >
                    {items.map((item, index) => (
                        <div key={index} className="relative snap-start flex-shrink-0 w-[calc(33.333%-0.5rem)]">
                            <EditableImage
                                id={`classGalleryItem_${index}_imageSrc`}
                                initialSrc={item.imageSrc}
                                altText={item.name}
                                onSave={onSave}
                                isEditMode={isEditMode}
                                width={380}
                                height={280}
                                onDragStart={(e) => e.preventDefault()}
                                className="h-auto object-contain rounded-lg w-full"
                            />
                            {isEditMode && (
                                <button
                                    onClick={() => onDeleteItem(index)}
                                    className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 w-8 h-8 flex items-center justify-center rounded-full shadow-lg z-10"
                                    title="Xóa lớp này"
                                >
                                    <FaTrash size={14}/>
                                </button>
                            )}
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