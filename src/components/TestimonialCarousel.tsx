'use client';

import {useEffect, useState} from "react";
import EditableText from "./landing-page/EditableText";
import {FaPlus, FaTrash} from "react-icons/fa";

// Define the shape of a single testimonial
interface Testimonial {
    content: string;
    name: string;
    desc: string;
}

// Define props for the component
interface TestimonialCarouselProps {
    testimonials: Testimonial[];
    isEditMode: boolean;
    onSave: (id: string, value: string) => void;
    onAddItem: () => void;
    onDeleteItem: (index: number) => void;
}

export default function TestimonialCarousel({ testimonials, isEditMode, onSave, onAddItem, onDeleteItem }: TestimonialCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex >= testimonials.length) {
            setCurrentIndex(Math.max(0, testimonials.length - 1));
        }
    }, [testimonials.length, currentIndex]);

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1 < testimonials.length ? prev + 1 : prev));
    };

    const goBack = () => {
        setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
    };

    const handleDelete = () => {
        onDeleteItem(currentIndex);
    };

    if (!testimonials || testimonials.length === 0) {
        return (
            <div className="text-center p-8">
                <p>Không có cảm nhận nào để hiển thị.</p>
                {isEditMode && (
                    <button
                        onClick={onAddItem}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2 mx-auto"
                    >
                        <FaPlus /> Thêm Cảm nhận mới
                    </button>
                )}
            </div>
        );
    }

    // Get the current testimonial to display, handle empty array case
    const currentTestimonial = testimonials[currentIndex];
    if (!currentTestimonial) {
        return <div className="text-center p-8">Không có cảm nhận nào để hiển thị.</div>;
    }

    return (
        <div className="flex flex-col items-center space-y-6 mt-10 px-4 w-full">
            <div className="relative flex items-center justify-center w-full max-w-6xl">
                <button
                    onClick={goBack}
                    disabled={currentIndex === 0}
                    className="absolute left-0 text-3xl px-3 disabled:opacity-30 z-20"
                >
                    ‹
                </button>

                <div className="bg-[#E9F7FE] border-dashed border-2 border-[#FFA552] px-6 md:px-10 lg:px-16 py-8 lg:py-10 w-[360px] h-[320px] md:max-w-[1000px] lg:w-[2000px] lg:h-[400px] text-center rounded-[120px] flex flex-col justify-center items-center">
                    {isEditMode && (
                        <button
                            onClick={handleDelete}
                            className="absolute top-4 right-8 text-red-500 hover:text-red-700 p-2 bg-white rounded-full shadow-md"
                            title="Xóa cảm nhận này"
                        >
                            <FaTrash />
                        </button>
                    )}
                    <EditableText
                        id={`testimonial_${currentIndex}_content`}
                        initialHtml={currentTestimonial.content}
                        onSave={onSave}
                        isEditMode={isEditMode}
                        tag="p"
                        className="text-[#4D4D4D] text-base md:text-lg lg:text-xl leading-7 md:leading-8 font-medium mb-4 md:mb-6 px-2 md:px-6"
                    />
                    <EditableText
                        id={`testimonial_${currentIndex}_name`}
                        initialHtml={currentTestimonial.name}
                        onSave={onSave}
                        isEditMode={isEditMode}
                        tag="p"
                        className="text-[#F86161] text-lg md:text-xl lg:text-2xl font-bold mb-1"
                    />
                    <EditableText
                        id={`testimonial_${currentIndex}_desc`}
                        initialHtml={currentTestimonial.desc}
                        onSave={onSave}
                        isEditMode={isEditMode}
                        tag="p"
                        className="text-sm md:text-base italic text-[#777]"
                    />
                </div>

                <button
                    onClick={goNext}
                    disabled={currentIndex === testimonials.length - 1}
                    className="absolute right-0 text-3xl px-3 disabled:opacity-30 z-20"
                >
                    ›
                </button>
            </div>

            <div className="flex space-x-2">
                {isEditMode && (
                    <button
                        onClick={onAddItem}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1.5 text-sm"
                    >
                        <FaPlus size={12} /> Thêm
                    </button>
                )}
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-4 h-4 rounded-full transition-all duration-200 border ${
                            currentIndex === idx ? "bg-[#FFA552]" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}