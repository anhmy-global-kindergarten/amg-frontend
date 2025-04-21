import Image from "next/image";

export default function LandingPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFF6C7] overflow-x-hidden relative font-sans text-[#4D4D4D]">

            {/* Header */}
            <header className="relative w-full h-[330px]">
                <Image
                    src="/banner/cloud_banner.png"
                    alt="Header Cloud"
                    fill
                    className="object-cover z-0"
                    priority
                />
                <div className="absolute top-6 left-6 z-10">
                    <Image src="/banner/logo.png" alt="Logo AMG" width={120} height={80}/>
                </div>
                <nav
                    className="absolute top-10 left-1/2 -translate-x-1/4 flex flex-nowrap gap-8 z-10 text-sm font-semibold">
                    {["Trang chủ", "Giới thiệu", "Hệ thống lớp học", "Tin tức sự kiện", "Thư viện AMG", "Tuyển sinh", "Liên hệ"].map((item) => (
                        <div key={item} className="relative group">
                            <a href="#" className="px-2 py-1 hover:underline bg-[#FFE5E5] rounded">{item}</a>
                            {/* Dropdown hoặc icon nếu cần */}
                        </div>
                    ))}
                </nav>
            </header>

            {/* Banner Section */}
            <section
                className="relative px-6 pt-10 pb-20 z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
                {/* Text Block */}
                <div className="max-w-xl z-20 lg:pr-10">
                    <h1 className="text-5xl font-extrabold text-[#FF6A00] leading-tight mb-3">
                        Đăng ký<br/>Tuyển sinh
                    </h1>
                    <p className="text-3xl font-semibold text-[#FFC600] mb-4">năm học 2024-2025</p>
                    <p className="mb-4 text-[#D93B00] text-base">
                        Anh Mỹ Global - Môi trường giáo dục hoàn hảo<br/>
                        cho trẻ từ 15 tháng tới 6 tuổi
                    </p>
                    <div className="relative w-fit">
                        <button>
                            <Image
                                src="/banner/button_register.png"
                                alt="Register"
                                width={200}
                                height={60}
                                className="hover:opacity-90 transition"
                            />
                        </button>
                        <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10">
                            <Image src="/banner/icon_play.png" alt="Play" fill/>
                        </div>
                    </div>
                </div>

                {/* Banner kids */}
                <div className="absolute right-8 w-[600px] h-[800px] z-30 mt-10 lg:mt-0">
                    <Image src="/banner/banner_kids_1.png" alt="Kids" fill className="object-contain"/>
                </div>

                {/* Background triangle */}
                <div className="absolute right-20 top-0 w-[400px] h-[500px] z-10">
                    <Image src="/banner/triangle_shade.png" alt="Triangle" fill className="object-contain"/>
                </div>
            </section>
            <Image src="/banner/big_cloud.png" alt="" width={1920} height={80}
                   className="w-full absolute top-[700px] z-50"/>

            <section className="relative w-full px-6 mt-[200px] mb-20 z-70">
                <div className="flex justify-center gap-6 max-w-7xl mx-auto">
                    <div className="flex flex-col gap-4">
                        <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo5.png" alt="" width={300} height={200}
                                   className="object-contain w-full h-full"/>
                        </div>
                        <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo6.png" alt="" width={300} height={400}
                                   className="object-contain w-full h-full"/>
                        </div>
                        <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo2.png" alt="" width={300} height={200}
                                   className="object-contain w-full h-full"/>
                        </div>
                    </div>

                    {/* Cột giữa - 2 ảnh cao hơn */}
                    <div className="flex flex-col gap-4 justify-center">
                        <div className="w-[320px] h-[280px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo1.png" alt="" width={220} height={180}
                                   className="object-contain w-full h-full"/>
                        </div>
                        <div className="w-[320px] h-[280px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo8.png" alt="" width={220} height={180}
                                   className="object-contain w-full h-full"/>
                        </div>
                    </div>

                    {/* Cột phải - 3 ảnh thấp hơn */}
                    <div className="flex flex-col gap-4">
                        <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo7.png" alt="" width={180} height={120}
                                   className="object-contain w-full h-full"/>
                        </div>
                        <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo3.png" alt="" width={180} height={120}
                                   className="object-contain w-full h-full"/>
                        </div>
                        <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo4.png" alt="" width={180} height={120}
                                   className="object-contain w-full h-full"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Decorative icons (clouds, stars...) */}
            <Image src="/banner/icon_cloud.png" alt="" width={100} height={70} className="absolute left-8 top-[550px]"/>
            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute left-40 top-[550px]"/>
            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute left-1/3 translate-x-[80px] top-[450px]"/>
            <Image src="/banner/icon_star_empty.png" alt="" width={60} height={70}
                   className="absolute left-1/3 top-[350px]"/>
            <Image src="/banner/icon_cloud.png" alt="" width={100} height={70}
                   className="absolute right-10 top-[300px]"/>
            {/* Add more as needed */}

        </div>
    );
}
