'use client';
import Image from "next/image";

interface BannerSectionProps {
    isMobile: boolean;
    openModal: () => void;
    data: { // Dữ liệu tùy chỉnh cho banner
        titleLine1?: string;
        titleLine2?: string;
        yearText?: string;
        descriptionMobileLine1?: string;
        descriptionMobileLine2?: string;
        descriptionMobileLine3?: string;
        descriptionDesktopLine1?: string;
        descriptionDesktopLine2?: string;
        buttonImageUrl?: string;
        kidsImageUrl?: string;
        triangleImageUrl?: string;
        cloudBannerUrl?: string; // Nếu Header dùng chung cloud_banner
        logoUrl?: string;        // Nếu logo là 1 phần của banner
    };
}

export default function BannerSection({ isMobile, openModal, data }: BannerSectionProps) {
    // Sử dụng giá trị từ data hoặc giá trị mặc định
    const title1 = data.titleLine1 || "Đăng ký";
    const title2 = data.titleLine2 || "Tuyển sinh";
    const year = data.yearText || "năm học 2024-2025";

    const descMobile1 = data.descriptionMobileLine1 || "Mầm non AMG";
    const descMobile2 = data.descriptionMobileLine2 || "Trường mầm non song ngữ";
    const descMobile3 = data.descriptionMobileLine3 || "Giảng dạy theo chương trình Phần Lan và tiếng anh Grapeseeds";

    const descDesktop1 = data.descriptionDesktopLine1 || "Anh Mỹ Global - Môi trường giáo dục hoàn hảo ";
    const descDesktop2 = data.descriptionDesktopLine2 || "cho trẻ từ 15 tháng tới 6 tuổi";

    const buttonImg = data.buttonImageUrl || "/banner/button_register.png";
    const kidsImg = data.kidsImageUrl || "/banner/banner_kids_1.png";
    const triangleImg = data.triangleImageUrl || "/banner/triangle_shade.png";

    return (
        <>
            {isMobile ? (
                <section className="relative pt-2 pb-20 z-10 flex flex-col items-center text-center overflow-visible">
                    {/* Kids Image */}
                    <div className="absolute right-1/2 translate-x-[40%] w-[70%] max-w-[550px] h-[570px] mb-6 z-10 -top-48">
                        <Image src={kidsImg} alt="Kids" fill className="object-contain"/>
                    </div>
                    {/* Background Triangle */}
                    <div className="absolute right-1/2 translate-x-1/2 top-2 w-[250px] h-[300px] z-9">
                        <Image src={triangleImg} alt="Triangle" fill className="object-contain"/>
                    </div>

                    {/* Clouds and Panel - có thể tách thành component riêng nếu lặp lại */}
                    <Image src="/banner/big_cloud.png" alt="big cloud" width={3000} height={200} className="w-[200vw] max-w-none absolute left-1/2 -translate-x-125 top-[165px] z-10"/>
                    <Image src="/banner/panel_white.png" alt="panel white" width={1000} height={100} className="w-full h-[250px] absolute top-[255px] z-10"/>
                    <Image src="/banner/big_cloud.png" alt="big cloud" width={3000} height={200} className="w-[250vw] h-[250px] max-w-none absolute left-1/2 -translate-x-100 top-[380px] z-10 scale-x-[-1]"/>

                    {/* Text */}
                    <div className="relative w-full max-w-xl z-20 top-60 pb-2">
                        <h1 style={{textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white' }}
                            className="text-4xl sm:text-5xl text-[#EA570A] leading-tight">
                            {title1}<br/>{title2}
                        </h1>
                        <p className="text-3xl text-[#FFD105] mb-1">{year}</p>
                        <p className="mb-4 text-[#EA570A] text-xs leading-relaxed">
                            {descMobile1}<br/>{descMobile2}<br/>{descMobile3}
                        </p>
                        <div className="relative w-fit mx-auto">
                            <button onClick={openModal} className="relative">
                                <Image src={buttonImg} alt="Register" width={200} height={60} className="hover:opacity-90 transition"/>
                                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10">
                                    <Image src="/banner/icon_play.png" alt="Play" fill className="object-contain"/>
                                </div>
                            </button>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="relative px-4 sm:px-6 pt-10 pb-20 z-10 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between">
                    {/* Text Block */}
                    <div className="w-full lg:w-auto max-w-xl z-20 lg:pr-10 text-center lg:text-left">
                        <h1 style={{textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white' }}
                            className="text-4xl sm:text-5xl text-[#EA570A] leading-tight mb-3">
                            {title1}<br/>{title2}
                        </h1>
                        <p className="text-3xl sm:text-3xl text-[#FFD105] mb-4">{year}</p>
                        <p className="mb-2 text-[#EA570A]">
                            {descDesktop1}<br className="hidden sm:block"/>{descDesktop2}
                        </p>
                        <div className="relative w-fit mx-auto lg:mx-0">
                            <button onClick={openModal} className="relative">
                                <Image src={buttonImg} alt="Register" width={200} height={60} className="hover:opacity-90 transition"/>
                                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10">
                                    <Image src="/banner/icon_play.png" alt="Play" fill className="object-contain"/>
                                </div>
                            </button>
                        </div>
                    </div>
                    {/* Banner Kids Image */}
                    <div className={`absolute w-full right-8 max-w-[600px] h-[400px] sm:h-[600px] lg:h-[800px] z-10 mb-10 lg:mb-0 lg:mt-0 ${isMobile ? 'top-50' : ''}`}>
                        <Image src={kidsImg} alt="Kids" fill className="object-contain"/>
                    </div>
                    {/* Background Triangle */}
                    <div className="absolute sm:block right-20 sm:right-10 top-70 lg:top-0 w-[250px] sm:w-[350px] md:w-[400px] h-[300px] sm:h-[450px] md:h-[500px] z-9">
                        <Image src={triangleImg} alt="Triangle" fill className="object-contain"/>
                    </div>
                    {/* Cloud Divider */}
                    <Image src="/banner/big_cloud.png" alt="Cloud Divider" width={1920} height={80} className="w-full absolute top-[970px] lg:top-[400px] z-10"/>
                </section>
            )}
        </>
    );
}