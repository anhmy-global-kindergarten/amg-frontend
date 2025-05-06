/* eslint-disable */
import Image from "next/image";

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-[#FFF6C7] text-[#333] flex flex-col items-center px-4">
            {/* Header */}
            <header className="w-full py-4 px-4 lg:px-10 bg-[#FFF6C7] flex justify-start items-center">
                <a href="/" className="flex items-center space-x-3">
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
            </header>

            {/* Signup Card */}
            <div className="mt-10 bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-center text-2xl font-semibold text-[#FFC107] mb-6">
                    Tạo tài khoản AMG
                </h2>

                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[#555] mb-1">Họ và tên</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] bg-[#FFFAE6]"
                            placeholder="Nhập họ tên"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[#555] mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] bg-[#FFFAE6]"
                            placeholder="Nhập email"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#555] mb-1">Mật khẩu</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] bg-[#FFFAE6]"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#555] mb-1">Nhập lại mật  khẩu</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] bg-[#FFFAE6]"
                            placeholder="Nhập lại mật khẩu"
                        />
                    </div>

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
        </div>
    );
}
