'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingInput from "@/components/FloatingInput";

interface RegisterClassModalProps {
    onClose: () => void;
}

export default function RegisterClassModal({ onClose }: RegisterClassModalProps) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    const [studentName, setStudentName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [parentName, setParentName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="relative bg-gradient-to-br from-yellow-100 to-white rounded-3xl border-2 border-orange-300 p-8 w-[90%] max-w-md shadow-lg overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute -top-30 lg:-top-20  right-0 w-40 h-40 bg-yellow-100 rounded-bl-[100%] z-0"></div>

                    <h2 className="text-center text-orange-400 font-semibold text-xl mb-6 z-10">THÔNG TIN HỌC SINH</h2>

                    <form className="flex flex-col space-y-4 text-[#1867B1] font-semibold">
                        <FloatingInput label="Họ tên học sinh" type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                        <FloatingInput label="Giới tính" type="select" value={gender} onChangeSelect={(e) => setGender(e.target.value)} options={["Nam", "Nữ"]}/>
                        <FloatingInput label="Ngày tháng năm sinh" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                        <FloatingInput label="Họ tên phụ huynh" type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} />
                        <FloatingInput label="Địa chỉ" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <FloatingInput label="Số điện thoại" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

                        <button
                            type="submit"
                            className="bg-orange-300 hover:bg-orange-400 text-white font-semibold py-2 rounded-full transition"
                        >
                            GỬI THÔNG TIN
                        </button>
                    </form>

                    {/* Nút đóng */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
                    >
                        ×
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
