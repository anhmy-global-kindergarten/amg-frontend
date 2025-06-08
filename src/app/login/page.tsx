'use client';
/* eslint-disable */
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {signIn} from "next-auth/react";

export default function LoginPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/amg/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userName,
                    password: password,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.error || 'Đăng nhập thất bại');
                return;
            }

            const user = await res.json();

            localStorage.setItem('user', JSON.stringify(user));

            router.push('/');
        } catch (err) {
            console.error(err);
            setError('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF6C7] text-[#333] flex flex-col px-4">
            {/* Header */}
            <header className="w-full py-4 px-4 lg:px-10 flex justify-between items-center bg-[#FFF6C7]">
                <div className="flex items-center space-x-3">
                    <a href="/" className="flex items-center space-x-2">
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
                    </a>
                </div>
            </header>

            {/* Login Card */}
            <div className="w-full items-center justify-center flex">
                <div className="mt-10 bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
                    <h2 className="text-center text-2xl font-semibold text-[#FFC107] mb-6">
                        Đăng nhập vào hệ thống
                    </h2>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#555] mb-1">Username</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] bg-[#FFFAE6]"
                                placeholder="Nhập username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-[#555] mb-1">Mật khẩu</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] bg-[#FFFAE6]"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <p className="mb-4 text-red-600 font-semibold">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#FFC107] text-white font-semibold py-2 rounded-xl hover:bg-[#e5a906] transition"
                        >
                            Đăng nhập
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Chưa có tài khoản?{" "}
                        <a href="/signup" className="text-[#FFC107] hover:underline">
                            Đăng ký ngay
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
