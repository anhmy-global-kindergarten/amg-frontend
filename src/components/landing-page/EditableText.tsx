'use client';
/* eslint-disable */
import React, {useState, useEffect, useRef, JSX} from 'react';
import { FaBold, FaItalic, FaUnderline, FaPalette, FaSave, FaTimes } from 'react-icons/fa';
import ContentEditable from "react-contenteditable";

type EditableTextProps<T extends keyof JSX.IntrinsicElements = 'div'> = {
    id: string;
    initialHtml: string;
    onSave: (id: string, newHtml: string) => void;
    isEditMode: boolean;
    tag?: T;
    textEditorStyle?: React.CSSProperties;
    isCurrentlyEditing: boolean;
    onStartEditing: (id: string) => void;
    onCancelEditing: () => void;
} & Omit<React.ComponentProps<T>, 'id' | 'onInput' | 'dangerouslySetInnerHTML' | 'children'>;

const EditableText = <T extends keyof JSX.IntrinsicElements = 'div'>({
                                                                         id,
                                                                         initialHtml,
                                                                         onSave,
                                                                         isEditMode,
                                                                         tag,
                                                                         className,
                                                                         style,
                                                                         textEditorStyle,
                                                                         isCurrentlyEditing,
                                                                         onStartEditing,
                                                                         onCancelEditing,
                                                                         ...rest // Capture any other props like href, target, etc.
                                                                     }: EditableTextProps<T>) => {
    const Tag = tag || ('div' as T);
    const [html, setHtml] = useState(initialHtml);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const contentEditableRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!isEditMode) {
            setHtml(initialHtml);
        }
    }, [isEditMode, initialHtml]);

    const handleContentChange = (event: React.FormEvent<HTMLDivElement>) => {
        setHtml(event.currentTarget.innerHTML);
    };

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        contentEditableRef.current?.focus();
    };

    const handleSave = () => {
        onSave(id, html);
    };

    const handleCancel = () => {
        setHtml(initialHtml);
        onCancelEditing();
    }

    const editorClassName = `
        editable-content 
        min-h-[50px] 
        p-2 
        border 
        border-gray-300 
        rounded 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        ${className || ''} 
    `;

    const editorFinalStyle = {
        ...style,
        ...textEditorStyle,
    };

    const commonProps = {
        className,
        style,
        dangerouslySetInnerHTML: { __html: html },
        ...(rest as any)
    };
    if (!isEditMode) {
        return <Tag {...commonProps} />;
    }

    if (!isCurrentlyEditing) {
        return (
            <div
                className="relative border border-dashed border-blue-400 p-1 cursor-pointer hover:bg-blue-50 transition-all"
                onClick={() => onStartEditing(id)}
                title="Click để sửa"
            >
                <Tag {...commonProps} />
            </div>
        );
    }

    return (
        <div className="relative p-2 border border-blue-600 bg-white shadow-lg z-50" style={style}>
            <div className="flex items-center space-x-2 mb-2 p-1 bg-gray-100 rounded">
                <button title="Bold" onClick={() => execCommand('bold')} className="p-1 hover:bg-gray-300 rounded"><FaBold /></button>
                <button title="Italic" onClick={() => execCommand('italic')} className="p-1 hover:bg-gray-300 rounded"><FaItalic /></button>
                <button title="Underline" onClick={() => execCommand('underline')} className="p-1 hover:bg-gray-300 rounded"><FaUnderline /></button>
                <div className="relative">
                    <button title="Text Color" onClick={() => setShowColorPicker(!showColorPicker)} className="p-1 hover:bg-gray-300 rounded"><FaPalette /></button>
                    {showColorPicker && (
                        <input
                            type="color"
                            onChange={(e) => { execCommand('foreColor', e.target.value); setShowColorPicker(false); }}
                            className="absolute top-full left-0 mt-1 z-10"
                        />
                    )}
                </div>
                <div className="flex-grow"></div>
                <button title="Save" onClick={handleSave} className="p-1 text-green-500 hover:bg-green-100 rounded"><FaSave /></button>
                <button title="Cancel" onClick={handleCancel} className="p-1 text-red-500 hover:bg-red-100 rounded"><FaTimes /></button>
            </div>

            <ContentEditable
                innerRef={contentEditableRef as React.RefObject<HTMLElement>}
                html={html}
                disabled={false}
                onChange={handleContentChange}
                tagName="div"
                className={editorClassName}
                style={editorFinalStyle}
            />
        </div>
    );
};

export default EditableText;