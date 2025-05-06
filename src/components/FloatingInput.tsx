import React from 'react';

interface FloatingInputProps {
    label: string;
    type: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options?: string[];
}

export default function FloatingInput({
                                          label,
                                          type,
                                          value = '',
                                          onChange,
                                          onChangeSelect,
                                          options = [],
                                      }: FloatingInputProps) {
    return (
        <div className="w-full">
            <label className="block mb-1 text-blue-700 font-medium">{label}</label>

            {type === 'select' ? (
                <select
                    value={value}
                    onChange={onChangeSelect}
                    className="w-full px-3 py-2 border border-blue-300 rounded-lg bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Chọn giới tính</option>
                    {options.map((option, idx) => (
                        <option key={idx} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="w-full px-2 py-2 border border-blue-300 rounded-lg bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            )}
        </div>
    );
}
