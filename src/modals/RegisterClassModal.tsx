'use client';
/* eslint-disable */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingInput from "@/components/FloatingInput";

interface RegisterClassModalProps {
    onClose: () => void;
}

interface CandidatePayload {
    student_name: string;
    gender: string;
    dob: string;
    parent_name: string;
    address: string;
    phone: string;
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        if (!studentName || !gender || !dob || !parentName || !address || !phone) {
            setSubmitError("Vui lòng điền đầy đủ thông tin.");
            setIsSubmitting(false);
            return;
        }

        const candidateData: CandidatePayload = {
            student_name: studentName,
            gender: gender,
            dob: dob,
            parent_name: parentName,
            address: address,
            phone: phone,
        };

        try {
            const response = await fetch(`/api-v1/candidates/create-candidate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(candidateData),
            });

            if (!response.ok) {
                let errorMessage = 'Đã có lỗi xảy ra khi gửi thông tin.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (e) {
                    alert("Không thể đọc thông báo lỗi từ server. Vui lòng thử lại sau.");
                }
                throw new Error(errorMessage);
            }

            setSubmitSuccess(true);
            alert("Đăng ký thành công! Cảm ơn bạn đã quan tâm đến AMG Kindergarten. Chúng tôi sẽ liên hệ với bạn sớm.");
            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (error: any) {
            setSubmitError(error.message || "Lỗi không xác định.");
            console.error("Submit error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

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

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-[#1867B1] font-semibold">
                        <FloatingInput label="Họ tên học sinh" type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                        <FloatingInput label="Giới tính" type="select" value={gender} onChangeSelect={(e) => setGender(e.target.value)} options={["Nam", "Nữ"]}/>
                        <FloatingInput label="Ngày tháng năm sinh" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                        <FloatingInput label="Họ tên phụ huynh" type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} />
                        <FloatingInput label="Địa chỉ" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <FloatingInput label="Số điện thoại" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

                        {submitError && <p className="text-sm text-red-500 text-center">{submitError}</p>}
                        {submitSuccess && <p className="text-sm text-green-600 text-center">Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.</p>}

                        <button
                            type="submit"
                            className="bg-orange-300 hover:bg-orange-400 text-white font-semibold py-2 rounded-full transition"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Đang gửi...' : 'GỬI THÔNG TIN'}
                        </button>
                    </form>

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
                        aria-label="Đóng modal"
                    >
                        ×
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
