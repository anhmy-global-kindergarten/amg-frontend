'use client';
import React, { useState, useEffect, useRef } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { FaUpload, FaSave, FaTimes } from 'react-icons/fa';

interface EditableImageProps extends Omit<NextImageProps, 'src' | 'alt' | 'id'> {
    id: string;
    initialSrc: string;
    altText: string;
    onSave: (id: string, newSrc: string, newAlt?: string) => void;
    isEditMode: boolean;
    className?: string;
    width: number;
    height: number;
    fill?: boolean;
    objectFit?: NextImageProps['objectFit'];
}

const EditableImage: React.FC<EditableImageProps> = ({
                                                         id,
                                                         initialSrc,
                                                         altText,
                                                         onSave,
                                                         isEditMode,
                                                         className,
                                                         width,
                                                         height,
                                                         fill,
                                                         objectFit,
                                                         ...rest
                                                     }) => {
    const [currentSrc, setCurrentSrc] = useState(initialSrc);
    const [isEditing, setIsEditing] = useState(false);
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialSrc);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setCurrentSrc(initialSrc);
        setPreviewUrl(initialSrc);
    }, [initialSrc]);

    useEffect(() => {
        if (newImageFile) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(newImageFile);
        } else {
            setPreviewUrl(currentSrc);
        }
    }, [newImageFile, currentSrc]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setNewImageFile(e.target.files[0]);
    };

    const handleSave = () => {
        if (previewUrl && previewUrl !== currentSrc) {
            onSave(id, previewUrl, altText);
            setCurrentSrc(previewUrl);
        }
        setIsEditing(false);
        setNewImageFile(null);
    };

    const handleCancel = () => {
        setNewImageFile(null);
        setPreviewUrl(currentSrc);
        setIsEditing(false);
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    const imageProps = {
        src: currentSrc,
        alt: altText,
        ...(fill ? { fill: true, objectFit: objectFit || 'cover' } : { width, height }),
        ...rest,
    };


    if (!isEditMode) {
        return (
            <div className={`${className} relative`}>
                <NextImage {...imageProps} />
            </div>
        );
    }

    if (!isEditing) {
        return (
            <div
                className={`${className} relative border border-dashed border-green-400 p-1 cursor-pointer hover:bg-green-50 transition-all`}
                onClick={() => setIsEditing(true)}
                title="Click to change image"
            >
                {/* Ảnh bên trong sẽ fill thẻ div này */}
                <NextImage {...imageProps} />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <FaUpload size={24} className="text-white" />
                </div>
            </div>
        );
    }

    // Ở chế độ đang chỉnh sửa (popup), không thay đổi.
    return (
        <div className={`relative p-2 border border-green-600 bg-white shadow-lg z-50 flex flex-col items-center ${className}`}>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <div className="mb-2 w-full max-w-[200px] h-auto aspect-video overflow-hidden border border-gray-300 rounded">
                {previewUrl && <NextImage src={previewUrl} alt="Preview" width={200} height={112} className="object-contain w-full h-full" />}
            </div>
            <div className="flex items-center space-x-2 mb-2">
                <button onClick={triggerFileInput} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center gap-1">
                    <FaUpload /> Chọn Ảnh
                </button>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={handleSave} className="p-1 text-green-500 hover:bg-green-100 rounded"><FaSave size={18}/></button>
                <button onClick={handleCancel} className="p-1 text-red-500 hover:bg-red-100 rounded"><FaTimes size={18}/></button>
            </div>
        </div>
    );
};

export default EditableImage;