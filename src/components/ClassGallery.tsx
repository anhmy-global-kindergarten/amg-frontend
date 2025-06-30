'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import EditableText from './landing-page/EditableText';
import EditableImage from './landing-page/EditableImage';
import {FaPlus, FaTrash} from "react-icons/fa";

interface ClassGalleryProps {
    title: string;
    boxes: { imageSrc: string; altText: string; }[];
    items: { name: string; imageSrc: string; }[];
    isEditMode: boolean;
    onSave: (id: string, value: string) => void;
    onFileSelect: (id: string, file: File) => void;
    onAddItemClass: () => void;
    onDeleteItemClass: (index: number) => void;
    onAddBox: () => void;
    onDeleteBox: (index: number) => void;
}

export default function ClassGallery({
                                         title,
                                         boxes = [],
                                         items = [],
                                         isEditMode,
                                         onSave,
                                         onFileSelect,
                                         onAddItemClass,
                                         onDeleteItemClass,
                                         onAddBox,
                                         onDeleteBox
                                     }: ClassGalleryProps) {
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

    const fixedBoxes = boxes.slice(0, 3);
    const flexibleBoxes = boxes.slice(3);

    return (
        <div className="w-full max-w-9xl mx-auto text-center">
            <EditableText
                id="classGalleryTitle"
                initialHtml={title}
                onSave={onSave}
                isEditMode={isEditMode}
                tag="h2"
                className={`font-cadena text-center text-[#F7B052] mb-6 ${isMobile ? 'text-4xl' : 'text-7xl'}
                 [paint-order:stroke] fill-current [-webkit-text-stroke:12px_white]`}
            />

            <div className="w-full bg-[#fff7cc] py-4 px-2">
                <div className="flex flex-nowrap md:flex-wrap gap-3 items-center justify-center">
                    {fixedBoxes.map((box, index) => (
                        <div key={index} className="relative group flex-shrink-0">
                            <EditableImage
                                id={`classGalleryBox_${index}_imageSrc`}
                                initialSrc={box.imageSrc}
                                altText={box.altText}
                                onFileSelect={onFileSelect}
                                isEditMode={isEditMode}
                                width={isMobile ? 120 : 300}
                                height={isMobile ? 45 : 100}
                            />
                            {isEditMode && (
                                <button
                                    onClick={() => onDeleteBox(index)}
                                    className="absolute -top-2 -right-2 text-white bg-red-600 hover:bg-red-700 w-6 h-6 flex items-center justify-center rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Xóa cơ sở này"
                                >
                                    <FaTrash size={12}/>
                                </button>
                            )}
                        </div>
                    ))}
                    {isEditMode && boxes.length < 3 && (
                        <div className="flex-shrink-0">
                            <button
                                onClick={onAddBox}
                                style={{width: isMobile ? '120px' : '300px', height: isMobile ? '45px' : '100px'}}
                                className="border-2 border-dashed border-gray-400 text-gray-400 hover:bg-gray-100 hover:border-gray-500 rounded-lg flex items-center justify-center"
                                title="Thêm cơ sở mới"
                            >
                                <FaPlus size={24}/>
                            </button>
                        </div>
                    )}
                </div>

                {(flexibleBoxes.length > 0 || (isEditMode && boxes.length >= 3)) && (
                    <div className="mt-3 flex flex-wrap gap-3 items-center justify-center">
                        {flexibleBoxes.map((box, index) => (
                            <div key={index + 3} className="relative group">
                                <EditableImage
                                    id={`classGalleryBox_${index + 3}_imageSrc`}
                                    initialSrc={box.imageSrc}
                                    altText={box.altText}
                                    onFileSelect={onFileSelect}
                                    isEditMode={isEditMode}
                                    width={isMobile ? 120 : 300}
                                    height={isMobile ? 45 : 100}
                                />
                                {isEditMode && (
                                    <button
                                        onClick={() => onDeleteBox(index + 3)}
                                        className="absolute -top-2 -right-2 text-white bg-red-600 hover:bg-red-700 w-6 h-6 flex items-center justify-center rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Xóa cơ sở này"
                                    >
                                        <FaTrash size={12}/>
                                    </button>
                                )}
                            </div>
                        ))}
                        {isEditMode && boxes.length >= 3 && (
                            <div>
                                <button
                                    onClick={onAddBox}
                                    style={{width: isMobile ? '120px' : '300px', height: isMobile ? '45px' : '100px'}}
                                    className="border-2 border-dashed border-gray-400 text-gray-400 hover:bg-gray-100 hover:border-gray-500 rounded-lg flex items-center justify-center"
                                    title="Thêm cơ sở mới"
                                >
                                    <FaPlus size={24}/>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/*/!* ICON CON VOI TRANG TRÍ *!/*/}
            {/*<div className="flex justify-end">*/}
            {/*    <Image src="/icons/icon_elephant1.png" alt="" width={isMobile ? 60 : 100} height={isMobile ? 30 : 50}*/}
            {/*           className="right-0 top-[1200px]  lg:right-80 lg:top-[800px] z-99"/>*/}
            {/*</div>*/}

            {/* NÚT THÊM LỚP HỌC MỚI */}
            {isEditMode && (
                <button
                    onClick={onAddItemClass}
                    className="mt-8 mb-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2 mx-auto"
                >
                    <FaPlus/> Thêm Lớp học
                </button>
            )}

            {/* PHẦN DANH SÁCH LỚP HỌC */}
            <div className="mt-4 overflow-hidden">
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
                        <div key={index} className="relative group snap-start flex-shrink-0 w-[calc(33.333%-0.5rem)]">
                            <EditableImage
                                id={`classGalleryItem_${index}_imageSrc`}
                                initialSrc={item.imageSrc}
                                altText={item.name}
                                onFileSelect={onFileSelect}
                                isEditMode={isEditMode}
                                width={380}
                                height={280}
                                onDragStart={(e) => e.preventDefault()}
                                className="h-auto object-contain rounded-lg w-full"
                            />
                            {isEditMode && (
                                <button
                                    onClick={() => onDeleteItemClass(index)}
                                    className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 w-8 h-8 flex items-center justify-center rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity"
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