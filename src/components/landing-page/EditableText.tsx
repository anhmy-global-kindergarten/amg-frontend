'use client';
/* eslint-disable */
import React, {useState, useEffect, useRef, JSX} from 'react';
import { FaBold, FaItalic, FaUnderline, FaPalette, FaSave, FaTimes } from 'react-icons/fa';

type EditableTextProps<T extends keyof JSX.IntrinsicElements = 'div'> = {
    id: string;
    initialHtml: string;
    onSave: (id: string, newHtml: string) => void;
    isEditMode: boolean;
    tag?: T;
    textEditorStyle?: React.CSSProperties;
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
                                                                         ...rest // Capture any other props like href, target, etc.
                                                                     }: EditableTextProps<T>) => {
    const Tag = tag || ('div' as T); // Set default tag
    const [html, setHtml] = useState(initialHtml);
    const [isEditing, setIsEditing] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHtml(initialHtml); // Sync with external changes if any
    }, [initialHtml]);

    const handleContentChange = (event: React.FormEvent<HTMLDivElement>) => {
        setHtml(event.currentTarget.innerHTML);
    };

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            setHtml(editorRef.current.innerHTML); // Update state after execCommand
        }
        editorRef.current?.focus();
    };

    const handleSave = () => {
        onSave(id, html);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setHtml(initialHtml); // Revert to original
        setIsEditing(false);
    }
    const commonProps = {
        className,
        style,
        dangerouslySetInnerHTML: { __html: html },
        ...(rest as any)
    };
    if (!isEditMode && !isEditing) {
        // Spread the `...rest` props onto the final element. This passes `href` etc.
        return <Tag {...commonProps} />;
    }

    if (isEditMode && !isEditing) {
        return (
            // The outer div is for the editing border and click handler
            <div
                className="relative border border-dashed border-blue-400 p-1 cursor-pointer hover:bg-blue-50 transition-all"
                onClick={() => setIsEditing(true)}
                title="Click to edit"
            >
                {/* The actual tag is rendered inside, preserving its type and props */}
                <Tag {...commonProps} />;
            </div>
        );
    }

    // isEditing mode
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
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning // Important for React
                className={`editable-content min-h-[50px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} // Propagate className to the editor itself for base styling
                style={textEditorStyle || { color: '#4D4D4D' }} // Propagate style, default to page's text color
                onInput={handleContentChange}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
};

export default EditableText;