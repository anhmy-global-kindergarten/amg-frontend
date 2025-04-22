import Image from "next/image";
import ClassGallery from '@/components/ClassGallery';

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
                    <div className="flex flex-col gap-2">
                        <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo5.png" alt="" width={300} height={200}
                                   className="object-cover w-full h-full"/>
                        </div>
                        <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo6.png" alt="" width={300} height={400}
                                   className="object-cover w-full h-full"/>
                        </div>
                        <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo7.png" alt="" width={300} height={200}
                                   className="object-cover w-full h-full"/>
                        </div>
                    </div>

                    {/* Cột giữa - 2 ảnh cao hơn */}
                    <div className="flex flex-col gap-4 justify-center">
                        <div className="w-[320px] h-[330px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo1.png" alt="" width={220} height={180}
                                   className="object-cover w-full h-full"/>
                        </div>
                        <div className="w-[320px] h-[330px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo8.png" alt="" width={220} height={180}
                                   className="object-cover w-full h-full"/>
                        </div>
                    </div>

                    {/* Cột phải - 3 ảnh thấp hơn */}
                    <div className="flex flex-col gap-2">
                        <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo2.png" alt="" width={180} height={120}
                                   className="object-cover w-full h-full"/>
                        </div>
                        <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo3.png" alt="" width={180} height={120}
                                   className="object-cover w-full h-full"/>
                        </div>
                        <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                            <Image src="/gallery/photo4.png" alt="" width={180} height={120}
                                   className="object-cover w-full h-full"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Giới thiệu AMG & Hệ thống lớp học */}
            <section className="w-full bg-[#FFF6C7] px-6 py-10 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">

                    {/* Về AMG */}
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <h2 className="text-4xl font-bold text-center text-[#FF6A00] mb-6">VỀ AMG</h2>
                        <h3 className="text-xl font-semibold text-[#00ADEF] mb-4">GIỚI THIỆU CHUNG</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* Cột trái - Giới thiệu chung */}
                            <div className="rounded-xl text-left">
                                <p className="text-base leading-7 text-[#4D4D4D] rounded-xl">
                                    <span className="bg-[#FACBCC]">mầm non <strong>AMG Kindergarten</strong> là ngôi trường được hình thành từ</span>
                                    <span
                                        className="text-[#EF924D] bg-[#FACBCC]"> tình yêu của người mẹ dành cho con</span><span
                                    className="bg-[#FACBCC]">. Chúng
                                    tôi mong muốn lan toả</span>
                                    <span className="text-[#EF924D] bg-[#FACBCC]"> tình yêu thương và năng lượng tích cực </span>
                                    <span className="bg-[#FACBCC]">đến con trẻ trên cơ sở tình yêu thương của người làm mẹ. Bằng việc lựa chọn, chắt
                                        lọc các chương trình, giáo án</span>
                                    <span className="text-[#EF924D] bg-[#FACBCC]"> tiên tiến từ Tây Âu </span><span
                                    className="bg-[#FACBCC]"> và kết hợp cùng nhiều</span>
                                    <span
                                        className="text-[#EF924D] bg-[#FACBCC]"> chuyên gia giáo dục có chuyên môn cao</span>,
                                    <span className="bg-[#FACBCC]">chúng tôi xây dựng nên</span>
                                    <span
                                        className="text-[#EF924D] bg-[#FACBCC]"> giáo án giáo dục mầm non độc quyền </span>
                                    <span className="bg-[#FACBCC]">của AMG Kindergaten. Với mục tiêu:</span>
                                    <span className="text-[#EF924D] bg-[#FACBCC]"> Lấy trẻ làm trung tâm</span><span
                                    className="bg-[#FACBCC]">, quan tâm phát triển
                                    tới từng cá thể, thúc đẩy</span>
                                    <span
                                        className="text-[#EF924D] bg-[#FACBCC]"> năng lượng tích cực và tính sáng tạo</span><span
                                    className="bg-[#FACBCC]">. Chúng
                                    tôi lựa chọn</span>
                                    <span className="text-[#EF924D] bg-[#FACBCC]"> Phương pháp Phần Lan </span><span
                                    className="bg-[#FACBCC]"> là nền tảng để triển
                                    khai giảng dạy tại nhà trường.
                                    Với cấu tạo bài học trải nghiệm đầy cuốn hút, thú vị cùng</span>
                                    <span
                                        className="text-[#EF924D] bg-[#FACBCC]"> lịch trình di chuyển linh hoạt </span><span
                                    className="bg-[#FACBCC]"> giúp thay
                                    đổi không gian học, AMG chắc chắn
                                    rằng mỗi ngày đến trường sẽ là một hành trình đầy thú vị và ấn tượng với con trẻ.
                                    AMG có</span>
                                    <span
                                        className="text-[#EF924D] bg-[#FACBCC]"> đội ngũ chuyên gia tư vấn toàn diện </span><span
                                    className="bg-[#FACBCC]"> không
                                    chỉ về học thuật mà còn cả
                                    phương diện chăm sóc và dinh dưỡng cho trẻ. AMG Kindergarten luôn nỗ lực mang lại
                                    một môi trường giáo dục</span>
                                    <span className="text-[#EF924D] bg-[#FACBCC]"> an toàn, trải nghiệm thú vị, hữu ích và sự chăm sóc chu đáo, toàn diện</span>.
                                </p>
                            </div>

                            {/* Cột phải - 4 ô box */}
                            <div className="grid grid-cols-2 gap-4 top-3">
                                <Image src="/icons/icon_about1.png" alt="Phương pháp giáo dục Phần Lan" width={200}
                                       height={140}/>
                                <Image src="/icons/icon_about2.png" alt="Cơ sở vật chất chuẩn Quốc tế" width={200}
                                       height={140}/>
                                <Image src="/icons/icon_about3.png" alt="Lớp học từ 6 tháng đến 6 tuổi" width={200}
                                       height={140}/>
                                <Image src="/icons/icon_about4.png" alt="Ngôn ngữ giảng dạy Việt, Anh" width={200}
                                       height={140}/>
                            </div>
                        </div>
                    </div>

                    <ClassGallery />
                </div>
            </section>

            {/* Section Bữa ăn của con */}
            <section className="w-full bg-[#FFF6C7] px-6 py-10 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-[#FF6A00] mb-6">BỮA ĂN CỦA CON</h2>
                    <div className="flex justify-center gap-6 max-w-7xl mx-auto">
                        <div className="flex flex-col gap-2">
                            <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                                <Image src="/meal/meal1.png" alt="" width={300} height={200}
                                       className="object-cover w-full h-full"/>
                            </div>
                            <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                                <Image src="/meal/meal2.png" alt="" width={300} height={400}
                                       className="object-cover w-full h-full"/>
                            </div>
                            <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                                <Image src="/meal/meal3.png" alt="" width={300} height={200}
                                       className="object-cover w-full h-full"/>
                            </div>
                        </div>

                        {/* Cột giữa - 2 ảnh cao hơn */}
                        <div className="flex flex-col gap-4 justify-center">
                            <div className="w-[320px] h-[280px] rounded-2xl overflow-hidden">
                                <Image src="/meal/meal4.png" alt="" width={220} height={180}
                                       className="object-cover w-full h-full"/>
                            </div>
                            <div className="w-[320px] h-[380px] rounded-2xl overflow-hidden">
                                <Image src="/meal/meal5.png" alt="" width={220} height={180}
                                       className="object-cover w-full h-full"/>
                            </div>
                        </div>

                        {/* Cột phải - 3 ảnh thấp hơn */}
                        <div className="flex flex-col gap-2">
                            <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                                <Image src="/meal/meal6.png" alt="" width={180} height={120}
                                       className="object-cover w-full h-full"/>
                            </div>
                            <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                                <Image src="/meal/meal7.png" alt="" width={180} height={120}
                                       className="object-cover w-full h-full"/>
                            </div>
                            <div className="w-[280px] h-[220px] rounded-2xl overflow-hidden">
                                <Image src="/meal/meal8.png" alt="" width={180} height={120}
                                       className="object-cover w-full h-full"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Lý do phụ huynh tin tưởng */}
            <section className="w-full bg-[#FFF6C7] px-6 py-10 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-[#FF6A00] mb-6">ĐIỀU GÌ KHIẾN PHỤ HUYNH TIN TƯỞNG AMG?</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            {title: "Chương trình học chuẩn quốc tế", icon: "/icons/icon_environment.png"},
                            {title: "Giáo viên tận tâm & giàu kinh nghiệm", icon: "/icons/icon_sport.png"},
                            {title: "Cơ sở vật chất hiện đại", icon: "/icons/icon_culture.png"},
                            {title: "Hoạt động ngoại khoá phong phú", icon: "/icons/icon_english.png"}
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md">
                                <div className="w-14 h-14 relative">
                                    <Image src={item.icon} alt={item.title} fill className="object-contain"/>
                                </div>
                                <p className="text-left font-semibold text-[#4D4D4D]">{item.title}</p>
                            </div>
                        ))}
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
