"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const vietnameseCharRegex = /[^a-z0-9]/gi;
        const normalizedUsername = username.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        if (vietnameseCharRegex.test(normalizedUsername)) {
            setError("Username phải viết liền không dấu và không chứa ký tự đặc biệt.");
            return;
        }

        if (password.length < 6) {
            setError("Mật khẩu phải dài hơn 6 ký tự.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp");
            return;
        }

        try {
            const res = await fetch(
                `/api-v1/auth-self/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        confirm_password: confirmPassword,
                        name,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Đăng ký thất bại");
            } else {
                setShowModal(true);
            }
        } catch (err) {
            console.error(err);
            setError("Có lỗi xảy ra, vui lòng thử lại");
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF6C7] text-[#333] flex flex-col items-center px-4">
            {/* Header */}
            <header className="w-full py-4 px-4 lg:px-10 bg-[#FFF6C7] flex justify-start items-center">
                <Link href="/" className="flex items-center space-x-3">
                    <Image
                        src="/banner/logo.png"
                        alt="Logo"
                        width={120}
                        height={120}
                        className="object-contain"
                    />
                    <span className="text-lg font-semibold text-[#FFC107] hover:underline transition">
            Trang chủ
          </span>
                </Link>
            </header>

            {/* Signup Card */}
            <div className="mt-10 bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-center text-2xl font-semibold text-[#FFC107] mb-6">
                    Tạo tài khoản AMG
                </h2>

                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[#555] mb-1">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] bg-[#FFFAE6]"
                            placeholder="Nhập họ tên"
                            required={true}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[#555] mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] bg-[#FFFAE6]"
                            placeholder="Nhập username"
                            required={true}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#555] mb-1">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] bg-[#FFFAE6]"
                            placeholder="Nhập mật khẩu"
                            required={true}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#555] mb-1">
                            Nhập lại mật khẩu
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] bg-[#FFFAE6]"
                            placeholder="Nhập lại mật khẩu"
                            required={true}
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-4" role="alert">
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className="text-green-600 text-sm mb-4" role="alert">
                            {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#FFC107] text-white font-semibold py-2 rounded-xl hover:bg-[#e5a906] transition"
                    >
                        Đăng ký
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Đã có tài khoản?{" "}
                    <a href="/login" className="text-[#FFC107] hover:underline">
                        Đăng nhập
                    </a>
                </p>
            </div>

            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    aria-modal="true"
                    role="dialog"
                    tabIndex={-1}
                >
                    {/* Overlay nền mờ, chặn tương tác */}
                    <div
                        className="fixed inset-0 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    ></div>

                    {/* Nội dung modal */}
                    <div className="relative bg-yellow-50 rounded-xl shadow-2xl max-w-xs sm:max-w-sm w-full p-6 z-10">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-yellow-700 hover:text-yellow-900 font-bold text-2xl leading-none"
                            aria-label="Close modal"
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl sm:text-3xl font-extrabold text-yellow-700 mb-4 text-center">
                            Đăng ký thành công!
                        </h2>
                        <p className="text-yellow-800 mb-6 text-center text-sm sm:text-base">
                            Bạn có thể đăng nhập hoặc quay về trang chủ.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => router.push("/login")}
                                className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold py-2 px-6 rounded-lg shadow-md transition-colors"
                            >
                                Đến trang đăng nhập
                            </button>
                            <button
                                onClick={() => router.push("/")}
                                className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-semibold py-2 px-6 rounded-lg shadow-md transition-colors"
                            >
                                Về trang chủ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
