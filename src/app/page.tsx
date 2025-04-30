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
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className="w-full min-h-screen bg-[#FFF6C7] overflow-hidden relative font-sans text-[#4D4D4D]">
            {/* Top Navbar */}
            <div
                className="w-full bg-[#FFF6C7] text-[#FFC107] text-sm py-4 px-4 lg:px-8 flex flex-col lg:flex-row justify-between items-center gap-4">
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
                        <Image src="/icons/icon_flag_vn.png" alt="VN" height={20} width={40} className="object-cover"/>
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
                </div>
            </div>
            {/* Header */}
            <header className="relative w-full h-[330px]">
                <Image
                    src="/banner/cloud_banner.png"
                    alt="Header Cloud"
                    fill
                    className="object-cover z-0"
                    priority
                />

                {/* Logo */}
                <div className="absolute top-4 left-4 z-10">
                    <Image src="/banner/logo.png" alt="Logo AMG" width={120} height={80}/>
                </div>

                {/* Nav Desktop */}
                <HeaderMenu/>

                {/* Nav Mobile (hamburger optional) */}

            </header>


            {/* Banner Section */}
            <section
                className="relative px-4 sm:px-6 pt-10 pb-20 z-10 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between">
                {/* Text Block */}
                <div className="w-full lg:w-auto max-w-xl z-20 lg:pr-10 text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FF6A00] leading-tight mb-3">
                        Đăng ký<br/>Tuyển sinh
                    </h1>
                    <p className="text-2xl sm:text-3xl font-semibold text-[#FFC600] mb-4">năm học 2024-2025</p>
                    <p className="mb-4 text-[#D93B00] text-base leading-relaxed">
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
            </section>

            {/* Cloud Divider */}
            <Image
                src="/banner/big_cloud.png"
                alt=""
                width={1920}
                height={80}
                className="w-full absolute top-[970px] lg:top-[700px] z-10"
            />


            <section className="relative w-full mt-40 mb-20 z-70 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-4">
                        {["photo5", "photo6", "photo7"].map((img, i) => (
                            <div key={i} className="w-full h-[300px] md:h-[350px] rounded-2xl overflow-hidden">
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
                    <div className="flex flex-col gap-6 justify-center">
                        {["photo1", "photo8"].map((img, i) => (
                            <div key={i} className="w-full h-[400px] md:h-[525px] rounded-2xl overflow-hidden">
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
                    <div className="flex flex-col gap-4">
                        {["photo2", "photo3", "photo4"].map((img, i) => (
                            <div key={i} className="w-full h-[300px] md:h-[350px] rounded-2xl overflow-hidden">
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
                <div className="w-[90%] mx-auto flex flex-col items-center gap-12">

                    {/* Về AMG */}
                    <div className="w-full px-4 py-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#FF6A00] mb-6">VỀ AMG</h2>
                        <h3 className="text-lg md:text-xl font-semibold text-[#00ADEF] mb-4">GIỚI THIỆU CHUNG</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* Left - Text block */}
                            <div className="rounded-xl text-left text-base leading-7 text-[#4D4D4D] space-y-4">
                                <p className="p-4 rounded-xl">
                                    <span className="bg-[#FACBCC]">mầm non <strong>AMG Kindergarten</strong> là ngôi trường được hình thành từ </span>
                                    <span
                                        className="bg-[#FACBCC] text-[#EF924D] font-semibold">tình yêu của người mẹ dành cho con</span>
                                    <span className="bg-[#FACBCC]">Chúng tôi mong muốn lan toả</span>
                                    <span className=" bg-[#FACBCC] text-[#EF924D] font-semibold"> tình yêu thương và năng lượng tích cực </span>
                                    <span className="bg-[#FACBCC]">đến con trẻ dựa trên tình yêu thương của người làm mẹ.</span>
                                    <span className="bg-[#FACBCC]">Chúng tôi lựa chọn các chương trình</span>
                                    <span
                                        className=" bg-[#FACBCC] text-[#EF924D] font-semibold"> tiên tiến từ Tây Âu </span>
                                    <span className="bg-[#FACBCC]">kết hợp
                                    cùng</span>
                                    <span className="bg-[#FACBCC] text-[#EF924D] font-semibold"> chuyên gia giáo dục có chuyên môn cao</span>,
                                    <span className="bg-[#FACBCC]">xây dựng nên</span>
                                    <span
                                        className="bg-[#FACBCC] text-[#EF924D] font-semibold"> giáo án giáo dục mầm non độc quyền</span>.
                                    <span className="bg-[#FACBCC]">Mục tiêu:</span>
                                    <span
                                        className="bg-[#FACBCC] text-[#EF924D] font-semibold"> Lấy trẻ làm trung tâm</span>,
                                    <span className="bg-[#FACBCC]">thúc đẩy</span>
                                    <span
                                        className="bg-[#FACBCC] text-[#EF924D] font-semibold"> năng lượng tích cực và tính sáng tạo</span>.
                                    <span className="bg-[#FACBCC]">Chúng tôi chọn</span>
                                    <span
                                        className="bg-[#FACBCC] text-[#EF924D] font-semibold"> Phương pháp Phần Lan </span>
                                    <span className="bg-[#FACBCC]">làm nền tảng triển khai giảng dạy với cấu trúc bài học trải nghiệm hấp dẫn và</span>
                                    <span
                                        className="bg-[#FACBCC] text-[#EF924D] font-semibold"> lịch trình linh hoạt</span>
                                    <span className="bg-[#FACBCC]">AMG có</span>
                                    <span
                                        className="bg-[#FACBCC] text-[#EF924D] font-semibold"> đội ngũ chuyên gia tư vấn toàn diện</span>
                                    <span className="bg-[#FACBCC]">về
                                    học thuật, chăm sóc và dinh dưỡng,
                                    nhằm tạo ra môi trường</span>
                                    <span className="bg-[#FACBCC] text-[#EF924D] font-semibold"> an toàn, trải nghiệm hữu ích và chu đáo</span>.
                                </p>
                            </div>

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
            <section className="relative w-full mt-40 mb-20 z-50 px-4  text-center">
                <h2 className="text-2xl font-bold text-[#FF6A00] mb-6">BỮA ĂN CỦA CON</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-4">
                        {["meal1", "meal2", "meal3"].map((img, i) => (
                            <div key={i} className="w-full h-[300px] md:h-[350px] rounded-2xl overflow-hidden">
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
                    <div className="flex flex-col gap-6 justify-center">
                        {["meal4", "meal5"].map((img, i) => (
                            <div key={i} className="w-full h-[400px] md:h-[525px] rounded-2xl overflow-hidden">
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
                    <div className="flex flex-col gap-4">
                        {["meal6", "meal7", "meal8"].map((img, i) => (
                            <div key={i} className="w-full h-[300px] md:h-[350px] rounded-2xl overflow-hidden">
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
            <section className="w-full bg-[#FFF6C7] px-4 md:px-6 py-10 relative z-10">
                <div className="w-full max-w-7xl mx-auto">
                    {/* Heading */}
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-[#FF6A00] mb-2">
                        ĐIỀU GÌ KHIẾN PHỤ HUYNH TIN TƯỞNG
                    </h2>
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-[#FF6A00] mb-10">
                        AMG?
                    </h2>

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Left Column - Text + Fork */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-[#2F80ED] font-semibold text-lg">CHƯƠNG TRÌNH HỌC</h3>
                                <h3 className="text-[#2F80ED] font-semibold text-lg mb-3">CHUẨN QUỐC TẾ</h3>
                                <p className="text-[#4D4D4D] leading-relaxed text-sm">
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
                                <div className="space-y-6 text-sm text-[#4D4D4D]">
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
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Môi trường học tập lý tưởng",
                                    ttColor: "#7ED3F7",
                                    desc: "Hệ thống phòng học đầy đủ ánh sáng tự nhiên, trang bị đầy đủ cơ sở vật chất hiện đại. Thực phẩm an toàn trong mọi bữa ăn, tạo nên môi trường học tập thân thiện, hạnh phúc.",
                                    bg: "bg-[#A4D9F3]",
                                    icon: "/icons/icon_environment.png",
                                },
                                {
                                    title: "Chương trình giáo dục thể chất quốc tế",
                                    ttColor: "#BFD730",
                                    desc: "Phòng Gym chuyên dụng, bể bơi, bể float, bể cát động lực, sân chơi riêng biệt — hỗ trợ toàn diện thể chất cho trẻ.",
                                    bg: "bg-[#FBE27D]",
                                    icon: "/icons/icon_sport.png",
                                },
                                {
                                    title: "Chương trình ngoại khóa phong phú",
                                    ttColor: "#FFD668",
                                    desc: "Hoạt động ngoại khóa hàng tuần/tháng giúp trẻ trải nghiệm thực tế, phát triển kỹ năng sống và giá trị cốt lõi.",
                                    bg: "bg-[#B0E59E]",
                                    icon: "/icons/icon_culture.png",
                                },
                                {
                                    title: "Chương trình tiếng Anh chuẩn quốc tế",
                                    ttColor: "#F6ADCD",
                                    desc: "Trẻ tiếp cận tiếng Anh tự nhiên qua vui chơi & học tập. Giáo viên bản ngữ giúp trẻ yêu thích ngôn ngữ này từ sớm.",
                                    bg: "bg-[#F2B5F9]",
                                    icon: "/icons/icon_english.png",
                                },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`rounded-2xl p-5 flex flex-col gap-4`}
                                >
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={400}
                                        height={150}
                                        className="mx-auto"
                                    />
                                    <p style={{color: item.ttColor}} className="font-bold text-sm">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-[#4D4D4D] text-justify">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Section Cảm nhận phụ huynh & Footer */}
            <section className="w-full bg-[#FFF6C7] px-4 md:px-6 py-10 relative z-10 text-[#4D4D4D]">
                <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12">
                    {/* Cảm nhận phụ huynh */}
                    <TestimonialCarousel/>

                    {/* Footer thông tin hệ thống AMG */}
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
                                        href="https://www.youtube.com/watch?v=4eTCzGxEZ1M&list=RDw8jNJd0SXXE&index=2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src="https://img.youtube.com/vi/4eTCzGxEZ1M/hqdefault.jpg"
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
                                        href="https://www.youtube.com/watch?v=4eTCzGxEZ1M&list=RDw8jNJd0SXXE&index=2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src="https://img.youtube.com/vi/4eTCzGxEZ1M/hqdefault.jpg"
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
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Decorative icons (clouds, stars...) */}
            <Image src="/banner/icon_cloud.png" alt="" width={100} height={70} className="absolute left-8 top-[550px]"/>
            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute left-40 top-[550px] hidden lg:black"/>
            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute left-1/3 translate-x-[80px] top-[450px]"/>
            <Image src="/banner/icon_star_empty.png" alt="" width={60} height={70}
                   className="absolute left-1/3 top-[350px]"/>
            <Image src="/banner/icon_cloud.png" alt="" width={100} height={70}
                   className="absolute right-10 top-[300px]"/>

            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute right-10 top-[650px]"/>
            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute right-5 top-[750px]"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={80} height={80}
                   className="absolute left-1/3 top-[800px] z-99 hidden lg:block"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={60} height={60}
                   className="absolute right-40 top-[1600px] z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute left-80 top-[2000px] z-99"/>

            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute right-5 top-[2250px] lg:right-10 lg:top-[2100px]  z-99"/>
            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute right-55 top-[2150px]  z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={80} height={80}
                   className="absolute right-60 top-[2710px] z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute left-80 top-[2710px] lg:top-[2750px] z-99"/>

            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute lg:left-30 right-10 top-[3750px] lg:top-[3600px]  z-99"/>
            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute right-100 top-[3600px] z-99"/>

            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute left-250 top-[4620px]  z-99"/>
            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute left-100 top-[4700px] z-99"/>

            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute right-5 top-[4530px] lg:right-50 lg:top-[4700px]  z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute right-210 top-[4800px] z-99"/>
            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute left-200 top-[4800px]  z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={80} height={80}
                   className="absolute right-50 top-[5300px] z-99 hidden lg:block"/>

            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute top-[5300px]  z-99"/>
            <Image src="/banner/icon_star_empty.png" alt="" width={40} height={40}
                   className="absolute left-20 top-[5400px] z-99"/>

            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute left-130 top-[5500px]  z-99"/>

            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute left-10 top-[5900px]  z-99"/>

            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute right-10 top-[6000px]  z-99 hidden lg:block"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={50} height={50}
                   className="absolute left-200 top-[6050px] z-99"/>

            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute right-10 top-[6350px] lg:right-75 lg:top-[6100px]  z-99"/>
            <Image src="/banner/icon_star_empty.png" alt="" width={50} height={50}
                   className="absolute right-25 top-[6350px] lg:top-[6200px] z-99"/>

            <Image src="/banner/icon_star_empty.png" alt="" width={50} height={50}
                   className="absolute left-50 top-[6300px] z-99 hidden lg:block"/>

            <Image src="/icons/icon_elephant0.png" alt="" width={isMobile ? 70 : 100} height={isMobile ? 45 : 70}
                   className="absolute left-20 lg:left-45 top-[3650px] lg:top-[2000px] z-99"/>
            <Image src="/icons/icon_elephant1.png" alt="" width={isMobile ? 60 : 100} height={isMobile ? 30 : 50}
                   className="absolute right-10 top-[5300px] lg:right-100 lg:translate-x-[80px] lg:top-[2900px] z-99"/>
            <Image src="/icons/icon_elephant2.png" alt="" width={isMobile ? 75 : 150} height={isMobile ? 50 : 100}
                   className="absolute left-5 lg:left-30 top-[8800px] lg:top-[4550px] z-99"/>
            <Image src="/icons/icon_elephant3.png" alt="" width={100} height={70}
                   className="absolute right-100 top-[5600px] z-99"/>

            <Image src="/icons/icon_elephant_footer.png" alt="" width={isMobile ? 150 : 300}
                   height={isMobile ? 75 : 150}
                   className="absolute right-10 top-[12200px]  lg:right-100 lg:top-[6400px] z-99"/>
            {/* Add more as needed */}
            {showModal && <RegisterClassModal onClose={closeModal}/>}
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-9999 bg-[#FFC107] hover:bg-[#ffb300] text-white p-3 rounded-full shadow-lg transition-opacity duration-300"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp size={20} />
                </button>
            )}
        </div>
    );
}
