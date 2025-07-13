import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-[#FFF6C7] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">

                <div className="mx-auto mb-6">
                    {/*<Image
                        src="/icons/icon_elephant_stop.png"
                        alt="Biểu tượng dừng lại"
                        width={120}
                        height={120}
                        className="object-contain"
                    />*/}
                </div>

                <h2 className="font-mali-bold text-2xl font-bold text-[#EA570A] mb-3">
                    Khu Vực Hạn Chế
                </h2>

                <p className="font-mali text-gray-600 mb-8">
                    Ối! Có vẻ như bạn cần quyền Quản trị viên để ghé thăm khu vực đặc biệt này. Vui lòng đăng nhập bằng tài khoản phù hợp nhé.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/login"
                        className="font-mali-semibold w-full sm:w-auto bg-[#FFC107] text-white font-semibold py-2 px-6 rounded-xl hover:bg-[#e5a906] transition"
                    >
                        Đăng xuất và đăng nhập lại
                    </Link>
                    <Link
                        href="/"
                        className="font-mali-semibold w-full sm:w-auto bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-xl hover:bg-gray-300 transition"
                    >
                        Về Trang chủ
                    </Link>
                </div>

            </div>
        </div>
    );
}