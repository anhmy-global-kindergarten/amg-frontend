'use client';
/* eslint-disable */
import Image from "next/image";
import TestimonialCarousel from "@/components/TestimonialCarousel"; // Import component có sẵn

interface Testimonial {
    content: string;
    name: string;
    desc: string;
}

interface FooterLink {
    text: string;
    href?: string; // Nếu là link
}

interface FooterColumn {
    title: string;
    items: FooterLink[];
}

interface FooterData {
    decorCloudUrl1?: string;
    decorElephantUrl1?: string;
    decorCloudUrl2?: string; // Icon cloud dưới testimonial
    systemInfo?: {
        title: string;
        brandName: string;
        addresses: string[];
        hotline?: string;
        email?: string;
        youtube?: string;
    };
    fanpageThumbnailUrl?: string;
    fanpageLink?: string;
    youtubeThumbnailUrl?: string;
    youtubeLink?: string;
    linkColumns?: FooterColumn[];
    decorElephantFooterUrl?: string;
    // testimonials sẽ được quản lý bởi TestimonialCarousel, hoặc bạn có thể truyền vào đây
}

interface TestimonialAndFooterSectionProps {
    isMobile: boolean;
    data: FooterData;
    // testimonials có thể được truyền riêng hoặc là một phần của data
    // testimonialsData?: Testimonial[]; // Nếu TestimonialCarousel nhận props
}

export default function TestimonialAndFooterSection({ isMobile, data }: TestimonialAndFooterSectionProps) {
    const systemInfo = data.systemInfo || {
        title: data.systemInfo?.title || "HỆ THỐNG AMG",
        brandName: data.systemInfo?.brandName || "ANHMY GLOBAL KINDERGARTEN",
        addresses: data.systemInfo?.addresses || [ // Đảm bảo addresses luôn là mảng
            "Cơ sở 1: No B18-06, Vinhomes Gardenia, P. Hàm Nghi, Mỹ Đình, Hà Nội.",
            "Cơ sở 2: No B18-05A, Vinhomes Gardenia, P. Hàm Nghi, Mỹ Đình, Hà Nội.",
            "Cơ sở 3: Tầng 2, Tòa nhà Dreamland Bonanza, 23 Duy Tân, Cầu Giấy, Hà Nội",
            "Cơ sở 4: S301, Sky 3, Aquabay, Khu đô thị Ecopark, Hưng Yên"
        ],
        hotline: data.systemInfo?.hotline || "0972999201",
        email: data.systemInfo?.email || "anhmykindergarten@gmail.com",
        youtube: data.systemInfo?.youtube || "AMG - AnhMy Global Kindergarten"
    };

    const fanpage = {
        thumb: data.fanpageThumbnailUrl || "https://img.youtube.com/vi/wR0SAVlV8xM/hqdefault.jpg",
        link: data.fanpageLink || "https://www.youtube.com/watch?v=wR0SAVlV8xM" // Placeholder
    };
    const youtubeChannel = {
        thumb: data.youtubeThumbnailUrl || "https://img.youtube.com/vi/LKDxvXi21GI/hqdefault.jpg",
        link: data.youtubeLink || "https://www.youtube.com/watch?v=LKDxvXi21GI" // Placeholder
    };

    const linkColumns = (data.linkColumns || [
        { title: "LIÊN KẾT", items: [{text:"Trang chủ", href:"/"}, {text:"Giới thiệu"}, {text:"Hệ thống lớp học"}, {text:"Tin tức sự kiện"}, {text:"Thư viện AMG"}, {text:"Tuyển sinh"}, {text:"Liên hệ"}] },
        { title: "HỖ TRỢ", items: [{text:"Trang chủ", href:"/"}, {text:"Giới thiệu"}, {text:"Hệ thống lớp học"}, {text:"Tin tức sự kiện"}, {text:"Thư viện AMG"}, {text:"Tuyển sinh"}, {text:"Liên hệ"}] }
    ]).map(col => ({
        ...col,
        items: col.items || []
    }));

    const decorCloud1 = data.decorCloudUrl1 || "/banner/icon_cloud.png";
    const decorElephant1 = data.decorElephantUrl1 || "/icons/icon_elephant3.png";
    const decorCloud2 = data.decorCloudUrl2 || "/banner/icon_cloud.png";
    const decorElephantFooter = data.decorElephantFooterUrl || "/icons/icon_elephant_footer.png";


    return (
        <section className="w-full bg-[#FFF6C7] px-4 md:px-6 py-12 relative z-10 text-[#4D4D4D]"> {/* Tăng py */}
            {/* Icon cloud này có vẻ là của section trên, xem lại vị trí */}
            {/* <Image src={decorCloud1} alt="decor cloud" width={100} height={50} className="absolute right-10 -top-16 lg:right-75 z-20"/> */}

            <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12">
                <Image src={decorElephant1} alt="decor elephant" width={100} height={70} className="absolute right-10 -top-[20px] lg:right-150 lg:-top-[35px] z-20"/>

                <TestimonialCarousel /> {/* Sử dụng component đã có */}

                <Image src={decorCloud2} alt="decor cloud" width={100} height={50} className="absolute left-5 top-[calc(50%-100px)] md:top-[auto] md:bottom-[300px] z-20"/> {/* Điều chỉnh vị trí cloud */}

                {/* Footer thông tin hệ thống AMG */}
                {isMobile ? (
                    <div className="flex flex-col gap-10 w-full mt-10"> {/* Thêm w-full và mt-10 */}
                        {/* HỆ THỐNG AMG */}
                        <div className="space-y-1">
                            <h3 className="font-bold text-base">{systemInfo.title}</h3>
                            <p className="font-semibold">{systemInfo.brandName}</p>
                            {Array.isArray(systemInfo.addresses) && systemInfo.addresses.map((addr, i) => <p key={i}>{addr}</p>)}
                            {systemInfo.hotline && <p>Hotline: {systemInfo.hotline}</p>}
                            {systemInfo.email && <p>Email: {systemInfo.email}</p>}
                            {systemInfo.youtube && <p>Youtube: {systemInfo.youtube}</p>}
                        </div>

                        {/* LIÊN KẾT & HỖ TRỢ */}
                        <div className="flex flex-row flex-wrap gap-x-10 gap-y-4">
                            {Array.isArray(linkColumns) && linkColumns.map(col => (
                                <div key={col.title}>
                                    <h3 className="font-bold text-sm mb-2">{col.title}</h3>
                                    <ul className="space-y-1 text-sm">
                                        {Array.isArray(col.items) && col.items.map(item => <li key={item.text}>{item.href ? <a href={item.href} className="hover:underline">{item.text}</a> : item.text}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Fanpage & YouTube thumbnails + Elephant */}
                        <div className="flex flex-wrap gap-6 mt-4 items-start relative"> {/* Thêm relative */}
                            <div className="flex flex-col items-start">
                                <h3 className="font-bold">FANPAGE</h3>
                                <a href={fanpage.link} target="_blank" rel="noopener noreferrer">
                                    <Image src={fanpage.thumb} alt="Fanpage Thumbnail" width={200} height={112} className="rounded-lg mt-2 object-cover"/>
                                </a>
                            </div>
                            <div className="flex flex-col items-start">
                                <h3 className="font-bold">YOUTUBE</h3>
                                <a href={youtubeChannel.link} target="_blank" rel="noopener noreferrer">
                                    <Image src={youtubeChannel.thumb} alt="YouTube Thumbnail" width={200} height={112} className="rounded-lg mt-2 object-cover"/>
                                </a>
                            </div>
                            {/* Elephant Icon cho mobile, điều chỉnh vị trí */}
                            <div className="mt-4 sm:absolute sm:right-0 sm:bottom-0 md:hidden">
                                <Image src={decorElephantFooter} alt="footer elephant" width={150} height={75} className="object-contain"/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-10 text-sm mt-10"> {/* Thêm mt-10 */}
                        <div className="space-y-1 lg:w-1/3"> {/* Phân chia cột */}
                            <h3 className="font-bold text-base">{systemInfo.title}</h3>
                            <p className="font-semibold">{systemInfo.brandName}</p>
                            {Array.isArray(systemInfo.addresses) && systemInfo.addresses.map((addr, i) => <p key={i}>{addr}</p>)}
                            {systemInfo.hotline && <p>Hotline: {systemInfo.hotline}</p>}
                            {systemInfo.email && <p>Email: {systemInfo.email}</p>}
                            {systemInfo.youtube && <p>Youtube: {systemInfo.youtube}</p>}

                            <div className="flex gap-4 mt-4">
                                <div className="flex flex-col items-start">
                                    <h3 className="font-bold">FANPAGE</h3>
                                    <a href={fanpage.link} target="_blank" rel="noopener noreferrer">
                                        <Image src={fanpage.thumb} alt="Fanpage Thumbnail" width={180} height={101} className="rounded-lg mt-2 object-cover"/>
                                    </a>
                                </div>
                                <div className="flex flex-col items-start">
                                    <h3 className="font-bold">YOUTUBE</h3>
                                    <a href={youtubeChannel.link} target="_blank" rel="noopener noreferrer">
                                        <Image src={youtubeChannel.thumb} alt="YouTube Thumbnail" width={180} height={101} className="rounded-lg mt-2 object-cover"/>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {Array.isArray(linkColumns) && linkColumns.map(col => (
                            <div key={col.title} className="lg:w-1/4"> {/* Phân chia cột */}
                                <h3 className="font-bold text-base mb-2">{col.title}</h3>
                                <ul className="space-y-1">
                                    {col.items.map(item => <li key={item.text}>{item.href ? <a href={item.href}>{item.text}</a> : item.text}</li>)}
                                </ul>
                            </div>
                        ))}
                        {/* Elephant Icon cho desktop */}
                        <div className="hidden lg:block lg:w-1/4 flex justify-end items-end">
                            <Image src={decorElephantFooter} alt="footer elephant" width={250} height={125} className="object-contain mt-auto"/>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}