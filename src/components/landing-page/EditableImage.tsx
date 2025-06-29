'use client';
/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import {FaUpload, FaSave, FaTimes, FaSpinner} from 'react-icons/fa';

interface EditableImageProps extends Omit<NextImageProps, 'src' | 'alt' | 'id'> {
    id: string;
    initialSrc: string;
    altText: string;
    onFileSelect: (id: string, file: File) => void;
    isEditMode: boolean;
    isUploading?: boolean;
    uploadingImageId?: string | null;
    className?: string;
    width?: number;
    height?: number;
    fill?: boolean;
    objectFit?: NextImageProps['objectFit'];
}

const EditableImage: React.FC<EditableImageProps> = ({
                                                         id,
                                                         initialSrc,
                                                         altText,
                                                         onFileSelect,
                                                         isEditMode,
                                                         isUploading,
                                                         uploadingImageId,
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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            onFileSelect(id, file);
            setIsEditing(false);
        }
        event.target.value = '';
    };

    const handleCancel = () => {
        setNewImageFile(null);
        setPreviewUrl(currentSrc);
        setIsEditing(false);
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    const baseImageProps = {
        src: currentSrc,
        alt: altText,
        ...rest,
    };

    const layoutProps = fill
        ? { fill: true, objectFit: objectFit || 'cover' }
        : { width, height };

    const isCurrentlyUploading = isUploading && uploadingImageId === id;


    if (!isEditMode) {
        return (
            <div className={`${className} relative`}>
                <NextImage {...baseImageProps} {...layoutProps} />
            </div>
        );
    }

    if (!isEditing) {
        return (
            <div className={`${className} relative border border-dashed border-green-400 p-1 cursor-pointer hover:bg-green-50 transition-all`} onClick={() => setIsEditing(true)}>
                <NextImage {...baseImageProps} {...layoutProps} />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    {isUploading && (rest as any).id === id ? <FaSpinner className="text-white animate-spin" size={24}/> : <FaUpload size={24} className="text-white" />}
                </div>
            </div>
        );
    }

    return (
        <div
            className={`relative p-4 border border-green-600 bg-white shadow-lg z-50 flex flex-col items-center ${className}`}>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden"/>
            <p className="text-sm font-semibold mb-2">Thay đổi ảnh</p>
            <div
                className="w-full max-w-[200px] h-auto aspect-video overflow-hidden border border-gray-300 rounded mb-3">
                <NextImage
                    {...baseImageProps}
                    width={200}
                    height={112}
                    className="object-contain w-full h-full"
                />
            </div>
            <button
                onClick={triggerFileInput}
                disabled={isUploading}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center justify-center gap-2 disabled:bg-gray-400"
            >
                {isUploading ? <FaSpinner className="animate-spin"/> : <FaUpload/>}
                {isUploading ? 'Đang tải lên...' : 'Chọn ảnh mới'}
            </button>
            <button onClick={handleCancel} className="mt-2 text-xs text-gray-500 hover:underline">Hủy</button>
        </div>
    );
};

export default EditableImage;