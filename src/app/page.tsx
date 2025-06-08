'use client';
import Image from "next/image";
import ClassGallery from '@/components/ClassGallery';
import TestimonialCarousel from "@/components/TestimonialCarousel";
import HeaderMenu from "@/components/HeaderMenu";
import RegisterClassModal from "@/modals/RegisterClassModal";
import {useEffect, useState} from 'react';
import { FaArrowUp } from "react-icons/fa";

export default function LandingPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // const [user, setUser] = useState(null);
    const [role, setRole] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                // setUser(parsed);
                setRole(parsed?.user?.role || parsed?.role || null);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Lỗi đọc user từ sessionStorage:", error);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <div className="w-full min-h-screen bg-[#FFF6C7] overflow-hidden relative font-sans text-[#4D4D4D]">
            {/* Top Navbar */}
            {!isMobile && (
                <div
                    className="w-full bg-[#FFF6C7] text-[#FFC107] text-sm py-4 px-4 lg:px-8 flex flex-col lg:flex-row justify-between items-center gap-4 ">
                    {/* Left side: Phone and Email */}
                    <div className="flex flex-col sm:flex-row items-center sm:space-x-6 gap-2 sm:gap-0">
                        <div className="flex items-center space-x-2">
                            <Image src="/icons/icon_phone.png" alt="icon phone" height={15} width={15}/>
                            <a href="tel:0972556001" className="hover:underline">0972556001</a>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Image src="/icons/icon_email.png" alt="icon email" height={20} width={20}/>
                            <a href="mailto:anhmykindergarten@gmail.com"
                               className="hover:underline">anhmykindergarten@gmail.com</a>
                        </div>
                    </div>

                    {/* Right side: Language and Social Icons */}
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        {/* Flags */}
                        <div className="flex space-x-2">
                            <Image src="/icons/icon_flag_vn.png" alt="VN" height={20} width={40}
                                   className="object-cover"/>
                            <Image src="/icons/icon_flag_eng.png" alt="ENG" height={20} width={40}
                                   className="object-cover"/>
                        </div>

                        {/* Social icons */}
                        <div className="flex space-x-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <Image src="/icons/icon_fb.png" alt="Facebook" width={20} height={20}/>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <Image src="/icons/icon_ig.png" alt="Instagram" width={20} height={20}/>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <Image src="/icons/icon_ytb.png" alt="YouTube" width={20} height={20}/>
                            </a>
                        </div>

                        {/* Login Button */}
                        {isAuthenticated ? (
                            <div className="flex gap-2">
                                {(role === "admin" || role === "teacher") && (
                                    <div className="flex gap-x-2">
                                        <a
                                            href="/admin-dashboard"
                                            className="bg-[#4CAF50] text-white px-4 py-1 rounded hover:bg-[#449d48] transition"
                                        >
                                            Dashboard
                                        </a>
                                        <a
                                            href="/post/create"
                                            className="bg-[#FFC107] text-white px-4 py-1 rounded hover:bg-[#e5a906] transition"
                                        >
                                            Tạo bài viết
                                        </a>
                                    </div>
                                )}
                                <button
                                    onClick={() => handleLogout()}
                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <a
                                href="/login"
                                className="bg-[#FFC107] text-white px-4 py-1 rounded hover:bg-[#e5a906] transition"
                            >
                                Đăng nhập
                            </a>
                        )}
                    </div>
                </div>
            )}
            {/* Header */}
            <header className={`relative w-full ${isMobile ? 'h-[170px]' : 'h-[330px]'}`}>
                <Image
                    src="/banner/cloud_banner.png"
                    alt="Header Cloud"
                    fill
                    className="object-cover z-0"
                    priority
                />
                {/* Logo */}
                <div className={`absolute top-4 z-10 ${isMobile ? 'left-1/2 -translate-x-1/2' : 'left-4'}`}>
                    <Image src="/banner/logo.png" alt="Logo AMG" width={120} height={80}/>
                </div>

                {/* Nav Desktop */}
                <HeaderMenu isAuthenticated={isAuthenticated}/>

                {/* Nav Mobile (hamburger optional) */}

            </header>


            {/* Banner Section */}
            {isMobile ? (
                // ======= Layout Mobile =======
                <section className="relative pt-2 pb-20 z-10 flex flex-col items-center text-center overflow-visible">
                    {/* Kids Image */}
                    <div
                        className="absolute right-1/2 translate-x-[40%] w-[70%] max-w-[550px] h-[570px] mb-6 z-10 -top-48">
                        <Image
                            src="/banner/banner_kids_1.png"
                            alt="Kids"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Background Triangle */}
                    <div
                        className="absolute right-1/2 translate-x-1/2 top-2 w-[250px] h-[300px] z-9">
                        <Image
                            src="/banner/triangle_shade.png"
                            alt="Triangle"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Cloud*/}
                    <Image
                        src="/banner/big_cloud.png"
                        alt="big cloud"
                        width={3000}
                        height={200}
                        className="w-[200vw] max-w-none absolute left-1/2 -translate-x-125 top-[165px] z-10"
                    />
                    <Image
                        src="/banner/panel_white.png"
                        alt="panel white"
                        width={1000}
                        height={100}
                        className="w-full h-[250px] absolute top-[255px] z-10"
                    />
                    <Image
                        src="/banner/big_cloud.png"
                        alt="big cloud"
                        width={3000}
                        height={200}
                        className="w-[250vw] h-[250px] max-w-none absolute left-1/2 -translate-x-100 top-[380px] z-10 scale-x-[-1]"
                    />

                    {/* Text */}
                    <div className="relative w-full max-w-xl z-20 top-60 pb-2">
                        <h1 style={{textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white' }}
                           className="text-4xl sm:text-5xl text-[#EA570A] leading-tight">
                            Đăng ký<br/>Tuyển sinh
                        </h1>
                        <p className="text-3xl text-[#FFD105] mb-1">
                            năm học 2024-2025
                        </p>
                        <p className="mb-4 text-[#EA570A] text-xs leading-relaxed">
                            Mầm non AMG<br/>
                            Trường mầm non song ngữ<br/>
                            Giảng dạy theo chương trình Phần Lan và tiếng anh Grapeseeds
                        </p>

                        <div className="relative w-fit mx-auto">
                            <button onClick={openModal} className="relative">
                                <Image
                                    src="/banner/button_register.png"
                                    alt="Register"
                                    width={200}
                                    height={60}
                                    className="hover:opacity-90 transition"
                                />
                                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10">
                                    <Image src="/banner/icon_play.png" alt="Play" fill className="object-contain"/>
                                </div>
                            </button>
                        </div>
                    </div>
                </section>
            ) : (
                // ======= Layout Desktop =======
                <section
                    className="relative px-4 sm:px-6 pt-10 pb-20 z-10 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between">
                    {/* Text Block */}
                    <div className="w-full lg:w-auto max-w-xl z-20 lg:pr-10 text-center lg:text-left">
                        <h1
                            style={{textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white' }}
                            className="text-4xl sm:text-5xl text-[#EA570A] leading-tight mb-3">
                            Đăng ký<br/>Tuyển sinh
                        </h1>
                        <p className="text-3xl sm:text-3xl text-[#FFD105] mb-4">năm học 2024-2025</p>
                        <p className="mb-2 text-[#EA570A]">
                            Anh Mỹ Global - Môi trường giáo dục hoàn hảo <br className="hidden sm:block"/>
                            cho trẻ từ 15 tháng tới 6 tuổi
                        </p>
                        <div className="relative w-fit mx-auto lg:mx-0">
                            <button onClick={openModal} className="relative">
                                <Image
                                    src="/banner/button_register.png"
                                    alt="Register"
                                    width={200}
                                    height={60}
                                    className="hover:opacity-90 transition"
                                />
                                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10">
                                    <Image src="/banner/icon_play.png" alt="Play" fill className="object-contain"/>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Banner Kids Image */}
                    <div className={`absolute w-full right-8 max-w-[600px] h-[400px] sm:h-[600px] lg:h-[800px] z-10 mb-10 lg:mb-0 lg:mt-0
                        ${isMobile ? 'top-50' : ''}`}>
                        <Image
                            src="/banner/banner_kids_1.png"
                            alt="Kids"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Background Triangle */}
                    <div
                        className="absolute sm:block absolute right-20 sm:right-10 top-70 lg:top-0 w-[250px] sm:w-[350px] md:w-[400px] h-[300px] sm:h-[450px] md:h-[500px] z-9">
                        <Image
                            src="/banner/triangle_shade.png"
                            alt="Triangle"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Cloud Divider */}
                    <Image
                        src="/banner/big_cloud.png"
                        alt=""
                        width={1920}
                        height={80}
                        className="w-full absolute top-[970px] lg:top-[400px] z-10"
                    />
                </section>
            )}

            <section className="relative w-full mt-40 mb-20 z-20 px-4">
                <div className="grid grid-cols-3 gap-2 max-w-7xl mx-auto">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-2">
                        {["photo5", "photo6", "photo7"].map((img, i) => (
                            <div
                                key={i}
                                className="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={`/gallery/${img}.png`}
                                    alt=""
                                    width={340}
                                    height={260}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-2 justify-center">
                        {["photo1", "photo8"].map((img, i) => (
                            <div
                                key={i}
                                className="w-full h-[225px] sm:h-[300px] md:h-[400px] lg:h-[525px] rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={`/gallery/${img}.png`}
                                    alt=""
                                    width={400}
                                    height={400}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-2">
                        {["photo2", "photo3", "photo4"].map((img, i) => (
                            <div
                                key={i}
                                className="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={`/gallery/${img}.png`}
                                    alt=""
                                    width={340}
                                    height={260}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#FFF6C7] py-10 relative z-10">
                <div className={`${isMobile ? 'w-[100%]' : 'w-[90%]'} mx-auto flex flex-col items-center gap-6`}>
                    <div>
                    <Image src="/icons/icon_elephant0.png" alt="" width={isMobile ? 60 : 100} height={isMobile ? 40 : 70}
                           className="absolute left-[10%] -top-[70px] z-99"/>
                    </div>
                    {/* Về AMG */}
                    <div className="w-full px-4 py-8">
                        <h2 style={{
                            textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white'
                        }}
                            className="text-4xl md:text-4xl text-center text-[#F7B052] mb-6">VỀ AMG</h2>

                        <h3 className="text-lg md:text-xl font-semibold text-[#7ED3F7]">GIỚI THIỆU CHUNG</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* Left - Text block */}
                            <div className="rounded-xl text-left text-base leading-7 text-black space-y-4">
                                <p className="rounded-xl">
                                    <span className="bg-[#FACBCC]">mầm non AMG Kindergarten là ngôi trường được hình thành từ </span>
                                    <span
                                        className="bg-[#FACBCC] text-[#EF924D]">tình yêu của người mẹ dành cho con</span>
                                    <span className="bg-[#FACBCC]">. Chúng tôi mong muốn lan toả tình </span>
                                    <span className="bg-[#FACBCC] text-[#EF924D]">yêu thương</span>
                                    <span className="bg-[#FACBCC]">và </span>
                                    <span className="bg-[#FACBCC] text-[#EF924D]">năng lượng tích cực</span>
                                    <span className="bg-[#FACBCC]">đến con trẻ trên cơ sở tình yêu thương của người làm mẹ. Bằng việc lựa chọn, chắt lọc các chương trình, </span>
                                    <span className="bg-[#FACBCC] text-[#EF924D]">giáo án tiên tiến từ Tây Âu và kết hợp cùng nhiều chuyên gia giáo dục có chuyên môn cao</span>
                                    <span className="bg-[#FACBCC]">, chúng tôi xây dựng nên </span>
                                    <span className="bg-[#FACBCC] text-[#EF924D]">giáo án giáo dục mầm non độc quyền của AMG Kindergaten</span>
                                    <span className="bg-[#FACBCC]">. Với mục tiêu: </span>
                                    <span className="bg-[#FACBCC] text-[#EF924D]">Lấy trẻ làm trung tâm</span>
                                    <span className="bg-[#FACBCC]">, quan tâm phát triển tới từng cá thể, thúc đẩy </span>
                                    <span className="bg-[#FACBCC] text-[#EF924D]">năng lượng tích cực và tính sáng tạo</span>
                                    <span className="bg-[#FACBCC]">. Chúng tôi lựa chọn </span>
                                    <span className="bg-[#FACBCC] text-[#EF924D]">Phương pháp Phần Lan </span>
                                    <span className="bg-[#FACBCC]">.là nền tảng để triển khai giảng dạy tại nhà trường. Với cấu tạo bài học trải nghiệm đầy cuốn hút, thú vị cùng lịch trình di chuyển linh hoạt giúp thay đổi không gian học, AMG chắc chắn rằng mỗi ngày đến trường sẽ là </span>
                                    <span className="bg-[#FACBCC] text-[#EF924D]">một hành trình đầy thú vị và ấn tượng với con trẻ</span>
                                    <span className="bg-[#FACBCC]">. AMG có </span>
                                    <span className="bg-[#FACBCC] text-[#EF924D]">đội ngũ chuyên gia tư vấn toàn diện </span>
                                    <span className="bg-[#FACBCC]">không chỉ về học thuật mà còn cả phương diện chăm sóc và dinh dưỡng dành cho trẻ. AMG Kindergarten luôn nỗ lực mang lại một môi trường </span>
                                    <span className="bg-[#FACBCC] text-[#EF924D]">giáo dục an toàn, trải nghiệm thú vị, hữu ích và sự chăm sóc chu đáo, toàn diện.</span>

                                </p>
                            </div>
                            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                                   className="absolute right-5 top-[140px] lg:right-130 lg:top-[140px]  z-99"/>
                            {/* Right - Icons grid */}
                            <div className="grid grid-cols-2 gap-4 place-items-center">
                                <Image src="/icons/icon_about1.png" alt="Phương pháp giáo dục Phần Lan" width={300}
                                       height={170}/>
                                <Image src="/icons/icon_about2.png" alt="Cơ sở vật chất chuẩn Quốc tế" width={300}
                                       height={170}/>
                                <Image src="/icons/icon_about3.png" alt="Lớp học từ 6 tháng đến 6 tuổi" width={300}
                                       height={170}/>
                                <Image src="/icons/icon_about4.png" alt="Ngôn ngữ giảng dạy Việt, Anh" width={300}
                                       height={170}/>
                            </div>
                        </div>
                    </div>

                    {/* Class Gallery Section */}
                    <ClassGallery/>
                </div>
            </section>

            {/* Section Bữa ăn của con */}
            <section className="relative w-full mt-10 mb-5 z-50 px-4  text-center">
                <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                       className="absolute right-5 -top-[60px] lg:right-50 lg:top-[4700px]  z-99"/>
                <h2 style={{
                    textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white' }}
                    className="text-4xl md:text-4xl text-center text-[#F7B052] mb-6">BỮA ĂN CỦA CON</h2>
                <div className="grid grid-cols-3 gap-2 max-w-7xl mx-auto">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-2">
                        {["meal1", "meal2", "meal3"].map((img, i) => (
                            <div
                                key={i}
                                className="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={`/meal/${img}.png`}
                                    alt=""
                                    width={340}
                                    height={260}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-2 justify-center">
                        {["meal4", "meal5"].map((img, i) => (
                            <div
                                key={i}
                                className="w-full h-[225px] sm:h-[300px] md:h-[400px] lg:h-[525px] rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={`/meal/${img}.png`}
                                    alt=""
                                    width={400}
                                    height={400}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-2">
                        {["meal6", "meal7", "meal8"].map((img, i) => (
                            <div
                                key={i}
                                className="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={`/meal/${img}.png`}
                                    alt=""
                                    width={340}
                                    height={260}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Lý do phụ huynh tin tưởng */}
            <section className="w-full bg-[#FFF6C7] px-4 md:px-6 py-2 relative z-10">
                <Image src="/icons/icon_elephant2.png" alt="" width={isMobile ? 75 : 150} height={isMobile ? 50 : 100}
                       className="left-5 lg:left-30 top-[8800px] lg:top-[4550px] z-99"/>
                <div className="w-full max-w-7xl mx-auto">
                    {/* Heading */}
                    <h2 style={{
                        textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white'
                    }}
                        className="text-4xl md:text-4xl text-center text-[#F7B052] mb-2">
                        ĐIỀU GÌ KHIẾN PHỤ HUYNH TIN TƯỞNG
                    </h2>
                    <h2 style={{
                        textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white'
                    }}
                        className="text-4xl md:text-4xl text-center text-[#F7B052] mb-6">
                        AMG?
                    </h2>

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Left Column - Text + Fork */}
                        <div className="space-y-6">
                            <div>
                            <div className="flex items-center gap-2">
                                    <div className="flex flex-col">
                                        <h3 className="text-[#7ED3F7] font-semibold text-lg">CHƯƠNG TRÌNH HỌC</h3>
                                        <h3 className="text-[#7ED3F7] font-semibold text-lg mb-3">CHUẨN QUỐC TẾ</h3>
                                    </div>

                                    <Image
                                        src="/banner/icon_cloud.png"
                                        alt="cloud"
                                        width={100}
                                        height={50}
                                        className="right-2 z-10 ml-10"
                                    />
                                </div>
                                <p className="text-black leading-relaxed text-sm">
                                    AMG Kindergarten với hệ thống lớp học cho <span className="text-[#EF924D]">trẻ từ 6 tháng đến 6 tuổi</span>,
                                    hệ thống phòng học đầy đủ <span className="text-[#EF924D]">ánh sáng tự nhiên</span>,
                                    trang bị đầy đủ
                                    <span className="text-[#EF924D]"> cơ sở vật chất hạ tầng hiện đại</span>, an toàn
                                    cho trẻ cùng
                                    <span className="text-[#EF924D]"> sân chơi nội bộ riêng biệt</span>. Nguồn
                                    <span className="text-[#EF924D]"> thực phẩm an toàn</span> được phục vụ trong tất cả
                                    các bữa ăn,
                                    <span className="text-[#EF924D]"> mang lại một môi trường hạnh phúc, thân thiện, an toàn</span>.
                                </p>
                            </div>

                            <div className="flex gap-4 items-start">
                                <Image
                                    src="/icons/icon_fork.png"
                                    alt="fork"
                                    width={50}
                                    height={100}
                                    className="object-contain"
                                />
                                <div className="space-y-12 text-sm text-black">
                                    <p>
                                        Lấy trẻ làm trung tâm,<br/>
                                        tôn trọng tính riêng biệt của trẻ.
                                    </p>
                                    <p>
                                        Tạo môi trường cho trẻ phát huy tính tự lập<br/>
                                        và khả năng tự học.
                                    </p>
                                    <p>
                                        Trẻ được phát triển toàn diện<br/>
                                        tất cả các giác quan: thị giác, thính giác, vận động...
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Feature Boxes */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-2 transform scale-[0.95] md:scale-100">
                            {[
                                {
                                    title: "Môi trường học tập lý tưởng",
                                    ttColor: "#7ED3F7",
                                    desc: "Hệ thống phòng học đầy đủ ánh sáng tự nhiên, trang bị đầy đủ cơ sở vật chất hạ tầng hiện đại, an toàn. Nguồn thực phẩm an toàn được phục vụ trong tất cả các bữa ăn của cả cô và trò, mang lại một môi trường hạnh phúc, thân thiện, an toàn.",
                                    bg: "bg-[#A4D9F3]",
                                    icon: "/icons/icon_environment.png",
                                },
                                {
                                    title: "Chương trình giáo dục thể chất quốc tế",
                                    ttColor: "#BFD730",
                                    desc: "AMG Kindergarten có hệ thống phòng Gym chuyên dụng, an toàn dành cho trẻ cùng giáo viên chuyên môn cao trong lĩnh vực giáo dục thể chất cho trẻ em. Bể bơi, bể float, bể cát động lực, sân chơi riêng biệt mang đến cho các con một môi trường hoạt động thể chất trọn vẹn nhất.",
                                    bg: "bg-[#FBE27D]",
                                    icon: "/icons/icon_sport.png",
                                },
                                {
                                    title: "Chương trình ngoại khóa phong phú",
                                    ttColor: "#FFD668",
                                    desc: "Tại AMG Kindergarten trẻ được tham gia nhiều hoạt động ngoại khóa đa dạng hàng tuần, hàng tháng, giúp trẻ có những trải nghiệm thực tế thú vị, phong phú, hỗ trợ hiệu quả phát triển các kỹ năng sống cũng như bồi đắp những giá trị cốt lõi.",
                                    bg: "bg-[#B0E59E]",
                                    icon: "/icons/icon_culture.png",
                                },
                                {
                                    title: "Chương trình tiếng Anh chuẩn quốc tế",
                                    ttColor: "#F6ADCD",
                                    desc: "Ở AMG Kindergarten, trẻ được học và tiếp cận tiếng Anh một cách tự nhiên qua các hoạt động vui chơi, học tập hàng ngày. Giáo viên người bản ngữ luôn tạo một không khí vui vẻ, thoải mái giúp trẻ yêu Tiếng Anh ngay từ nhỏ.",
                                    bg: "bg-[#F2B5F9]",
                                    icon: "/icons/icon_english.png",
                                },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`rounded-2xl p-2 flex flex-col gap-2`}
                                >
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={400}
                                        height={150}
                                        className="mx-auto"
                                    />
                                    <p style={{color: item.ttColor}} className="font-bold text-xl">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-black">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Section Cảm nhận phụ huynh & Footer */}
            <section className="w-full bg-[#FFF6C7] px-4 md:px-6 py-2 relative z-10 text-[#4D4D4D]">
                <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                       className="right-10 top-[6350px] lg:right-75 lg:top-[6100px]  z-99"/>
                <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12">
                    <Image src="/icons/icon_elephant3.png" alt="" width={100} height={70}
                           className="absolute right-10 -top-[20px] lg:right-150 lg:-top-[35px] z-99"/>
                    {/* Cảm nhận phụ huynh */}
                    <TestimonialCarousel/>
                    <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                           className="absolute left-5 top-[450px]  z-99"/>
                    {/* Footer thông tin hệ thống AMG */}
                    {isMobile ? (
                        // ======= Layout Mobile =======
                        <div className="flex flex-col gap-10">
                            {/* HỆ THỐNG AMG */}
                            <div className="space-y-1">
                                <h3 className="font-bold text-base">HỆ THỐNG AMG</h3>
                                <p className="font-semibold">ANHMY GLOBAL KINDERGARTEN</p>
                                <p>Cơ sở 1: No B18-06, Vinhomes Gardenia, P. Hàm Nghi, Mỹ Đình, Hà Nội.</p>
                                <p>Cơ sở 2: No B18-05A, Vinhomes Gardenia, P. Hàm Nghi, Mỹ Đình, Hà Nội.</p>
                                <p>Cơ sở 3: Tầng 2, Tòa nhà Dreamland Bonanza, 23 Duy Tân, Cầu Giấy, Hà Nội</p>
                                <p>Cơ sở 4: S301, Sky 3, Aquabay, Khu đô thị Ecopark, Hưng Yên</p>
                                <p>Hotline: 0972999201</p>
                                <p>Email: anhmykindergarten@gmail.com</p>
                                <p>Youtube: AMG - AnhMy Global Kindergarten</p>
                            </div>

                            {/* LIÊN KẾT & HỖ TRỢ */}
                            <div className="flex flex-row flex-wrap gap-x-10 gap-y-4">
                                {/* Liên kết */}
                                <div>
                                    <h3 className="font-bold text-sm mb-2">LIÊN KẾT</h3>
                                    <ul className="space-y-1 text-sm">
                                        <li>Trang chủ</li>
                                        <li>Giới thiệu</li>
                                        <li>Hệ thống lớp học</li>
                                        <li>Tin tức sự kiện</li>
                                        <li>Thư viện AMG</li>
                                        <li>Tuyển sinh</li>
                                        <li>Liên hệ</li>
                                    </ul>
                                </div>

                                {/* Hỗ trợ */}
                                <div>
                                    <h3 className="font-bold text-sm mb-2">HỖ TRỢ</h3>
                                    <ul className="space-y-1 text-sm">
                                        <li>Trang chủ</li>
                                        <li>Giới thiệu</li>
                                        <li>Hệ thống lớp học</li>
                                        <li>Tin tức sự kiện</li>
                                        <li>Thư viện AMG</li>
                                        <li>Tuyển sinh</li>
                                        <li>Liên hệ</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Fanpage & YouTube thumbnails + Elephant */}
                            <div className="flex flex-wrap gap-6 mt-4 items-start">
                                {/* FANPAGE */}
                                <div className="flex flex-col items-start">
                                    <h3 className="font-bold">FANPAGE</h3>
                                    <a
                                        href="https://www.youtube.com/watch?v=wR0SAVlV8xM"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src="https://img.youtube.com/vi/wR0SAVlV8xM/hqdefault.jpg"
                                            alt="YouTube Thumbnail"
                                            width={200}
                                            height={100}
                                            className="rounded-lg mt-2"
                                        />
                                    </a>
                                </div>

                                {/* YOUTUBE */}
                                <div className="flex flex-col items-start">
                                    <h3 className="font-bold">YOUTUBE</h3>
                                    <a
                                        href="https://www.youtube.com/watch?v=LKDxvXi21GI"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src="https://img.youtube.com/vi/LKDxvXi21GI/hqdefault.jpg"
                                            alt="YouTube Thumbnail"
                                            width={200}
                                            height={100}
                                            className="rounded-lg mt-2"
                                        />
                                    </a>
                                </div>

                                {/* Elephant Icon */}
                                <div className="flex items-start absolute right-0 top-300">
                                    <Image
                                        src="/icons/icon_elephant_footer.png"
                                        alt=""
                                        width={isMobile ? 190 : 300}
                                        height={isMobile ? 75 : 150}
                                        className="mt-4"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        // ======= Layout Desktop =======
                    <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-10 text-sm">
                        {/* Cột Hệ thống AMG */}
                        <div className="space-y-1">
                            <h3 className="font-bold text-base">HỆ THỐNG AMG</h3>
                            <p className="font-semibold">ANHMY GLOBAL KINDERGARTEN</p>
                            <p>Cơ sở 1: No B18-06, Vinhomes Gardenia, P. Hàm Nghi, Mỹ Đình, Hà Nội.</p>
                            <p>Cơ sở 2: No B18-05A, Vinhomes Gardenia, P. Hàm Nghi, Mỹ Đình, Hà Nội.</p>
                            <p>Cơ sở 3: Tầng 2, Tòa nhà Dreamland Bonanza, 23 Duy Tân, Cầu Giấy, Hà Nội</p>
                            <p>Cơ sở 4: S301, Sky 3, Aquabay, Khu đô thị Ecopark, Hưng Yên</p>
                            <p>Hotline: 0972999201</p>
                            <p>Email: anhmykindergarten@gmail.com</p>
                            <p>Youtube: AMG - AnhMy Global Kindergarten</p>

                            {/* Fanpage & YouTube thumbnails */}
                            <div className="flex flex-wrap sm:flex-nowrap gap-6 mt-4">
                                {/* Fanpage */}
                                <div className="flex flex-col items-start">
                                    <h3 className="font-bold">FANPAGE</h3>
                                    <a
                                        href="https://www.youtube.com/watch?v=wR0SAVlV8xM"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src="https://img.youtube.com/vi/wR0SAVlV8xM/hqdefault.jpg"
                                            alt="YouTube Thumbnail"
                                            width={180}
                                            height={100}
                                            className="rounded-lg mt-2"
                                        />
                                    </a>
                                </div>

                                {/* YouTube */}
                                <div className="flex flex-col items-start">
                                    <h3 className="font-bold">YOUTUBE</h3>
                                    <a
                                        href="https://www.youtube.com/watch?v=LKDxvXi21GI"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src="https://img.youtube.com/vi/LKDxvXi21GI/hqdefault.jpg"
                                            alt="YouTube Thumbnail"
                                            width={180}
                                            height={100}
                                            className="rounded-lg mt-2"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Cột Liên kết */}
                        <div>
                            <h3 className="font-bold text-base mb-2">LIÊN KẾT</h3>
                            <ul className="space-y-1">
                                <li>Trang chủ</li>
                                <li>Giới thiệu</li>
                                <li>Hệ thống lớp học</li>
                                <li>Tin tức sự kiện</li>
                                <li>Thư viện AMG</li>
                                <li>Tuyển sinh</li>
                                <li>Liên hệ</li>
                            </ul>
                        </div>

                        {/* Cột Hỗ trợ */}
                        <div>
                            <h3 className="font-bold text-base mb-2">HỖ TRỢ</h3>
                            <ul className="space-y-1">
                                <li>Trang chủ</li>
                                <li>Giới thiệu</li>
                                <li>Hệ thống lớp học</li>
                                <li>Tin tức sự kiện</li>
                                <li>Thư viện AMG</li>
                                <li>Tuyển sinh</li>
                                <li>Liên hệ</li>
                                <Image src="/icons/icon_elephant_footer.png" alt="" width={isMobile ? 150 : 300}
                                       height={isMobile ? 75 : 150}
                                       className="right-10 top-[1300px]  lg:right-100 lg:top-[300px] z-99"/>
                            </ul>
                        </div>
                    </div>
                    )}
                </div>
            </section>

            {/* Decorative icons (clouds, stars...) */}
            <Image src="/banner/icon_cloud.png" alt="" width={100} height={70}
                   className="absolute left-[5%] top-[50vh]"/>
            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute left-1/3 translate-x-[80px] top-[45vh]"/>
            <Image src="/banner/icon_star_empty.png" alt="" width={60} height={70}
                   className="absolute left-1/3 top-[40vh]"/>
            <Image src="/banner/icon_cloud.png" alt="" width={100} height={70}
                   className="absolute right-[5%] top-[35vh]"/>

            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute right-[3%] top-[62vh]"/>
            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute right-[2%] top-[70vh]"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={80} height={80}
                   className="absolute left-1/3 top-[80vh] z-99 hidden lg:block"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={60} height={60}
                   className="absolute right-[15%] top-[150vh] z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute left-80 top-[2000px] z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute right-55 top-[2150px]  z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={80} height={80}
                   className="absolute right-60 top-[2710px] z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute left-80 top-[2710px] lg:top-[2750px] z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute right-100 top-[3600px] z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute left-100 top-[4700px] z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute right-210 top-[4800px] z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={80} height={80}
                   className="absolute right-50 top-[5300px] z-99 hidden lg:block"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute left-20 top-[5400px] z-99"/>

            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute right-10 top-[6000px]  z-99 hidden lg:block"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={50} height={50}
                   className="absolute left-200 top-[6050px] z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={50} height={50}
                   className="absolute right-25 top-[6350px] lg:top-[6200px] z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={50} height={50}
                   className="absolute left-50 top-[6300px] z-99 hidden lg:block"/>

            {/* Add more as needed */}
            {showModal && <RegisterClassModal onClose={closeModal}/>}
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-9999 bg-[#FFC107] hover:bg-[#ffb300] text-white p-3 rounded-full shadow-lg transition-opacity duration-300"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp size={20}/>
                </button>
            )}
        </div>
    );
}
