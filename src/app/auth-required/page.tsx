import Link from 'next/link';

export default function AuthRequiredPage() {
    return (
        <div className="min-h-screen bg-[#FFF6C7] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">

                {/* Icon thân thiện */}
                <div className="mx-auto mb-6">
                    {/*<Image
                        src="/icons/icon_key_lock.png" // Bạn có thể thay bằng icon chìa khóa hoặc một icon chú voi đang vẫy tay
                        alt="Biểu tượng yêu cầu đăng nhập"
                        width={100}
                        height={100}
                        className="object-contain"
                    />*/}
                </div>

                <h2 className="font-mali-bold text-2xl font-bold text-[#EA570A] mb-3">
                    Bạn cần đăng nhập!
                </h2>

                <p className="font-mali text-gray-600 mb-8">
                    Tính năng này chỉ dành cho các thành viên của gia đình AMG. Vui lòng đăng nhập để tiếp tục khám phá nhé!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/login"
                        className="font-mali-semibold w-full sm:w-auto bg-[#FFC107] text-white font-semibold py-2 px-6 rounded-xl hover:bg-[#e5a906] transition"
                    >
                        Đi đến trang Đăng nhập
                    </Link>
                    <Link
                        href="/"
                        className="font-mali-semibold w-full sm:w-auto bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-xl hover:bg-gray-300 transition"
                    >
                        Quay về Trang chủ
                    </Link>
                </div>

            </div>
        </div>
    );
}