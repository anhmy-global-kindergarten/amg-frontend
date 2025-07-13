import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#FFF6C7] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">

                <div className="mx-auto mb-6">
                    {/*<Image
                        src="/icons/icon_elephant_lost.png"
                        alt="Biểu tượng không tìm thấy trang"
                        width={150}
                        height={150}
                        className="object-contain"
                    />*/}
                </div>

                <h1 className="font-mali-bold text-5xl font-extrabold text-[#EA570A] mb-3">
                    404
                </h1>
                <h2 className="font-mali-bold text-2xl font-bold text-gray-800 mb-4">
                    Ối, trang này đi đâu mất rồi!
                </h2>


                <p className="font-mali text-gray-600 mb-8 max-w-sm mx-auto">
                    Có vẻ như đường dẫn bạn tìm không tồn tại hoặc đã được di chuyển. Đừng lo, hãy quay về trang chủ để tìm lại nhé!
                </p>

                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="font-mali-semibold bg-[#FFC107] text-white font-semibold py-3 px-8 rounded-xl hover:bg-[#e5a906] transition-transform transform hover:scale-105"
                    >
                        Quay về Trang chủ
                    </Link>
                </div>

            </div>
        </div>
    );
}