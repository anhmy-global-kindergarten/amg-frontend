'use client';
/* eslint-disable */
import Image from "next/image";
import RenderStaticHTMLContent from "@/app/utils/getStaticPageContent";

interface FeatureBoxData {
    title: string;
    ttColor: string; // Màu cho tiêu đề của box
    desc: string;
    bg?: string; // Class background, có thể không cần nếu dùng icon
    icon: string; // URL của icon
}

interface WhyParentsTrustData {
    mainTitleLine1?: string;
    mainTitleLine2?: string;
    decorElephantUrl?: string;
    leftColumn?: {
        sectionTitle1?: string;
        sectionTitle2?: string;
        decorCloudIconUrl?: string;
        descriptionHtml?: string; // HTML cho đoạn văn có highlight
        forkIconUrl?: string;
        listItems?: string[];
    };
    featureBoxes?: FeatureBoxData[];
}

interface WhyParentsTrustSectionProps {
    isMobile: boolean;
    data: WhyParentsTrustData;
}

export default function WhyParentsTrustSection({ isMobile, data }: WhyParentsTrustSectionProps) {
    const title1 = data.mainTitleLine1 || "ĐIỀU GÌ KHIẾN PHỤ HUYNH TIN TƯỞNG";
    const title2 = data.mainTitleLine2 || "AMG?";
    const decorElephant = data.decorElephantUrl || "/icons/icon_elephant2.png";

    const leftCol = data.leftColumn || {
        sectionTitle1: "CHƯƠNG TRÌNH HỌC",
        sectionTitle2: "CHUẨN QUỐC TẾ",
        decorCloudIconUrl: "/banner/icon_cloud.png",
        descriptionHtml: `AMG Kindergarten với hệ thống lớp học cho <span style="color: #EF924D; font-weight: 600;">trẻ từ 6 tháng đến 6 tuổi</span>, hệ thống phòng học đầy đủ <span style="color: #EF924D; font-weight: 600;">ánh sáng tự nhiên</span>, trang bị đầy đủ <span style="color: #EF924D; font-weight: 600;">cơ sở vật chất hạ tầng hiện đại</span>, an toàn cho trẻ cùng <span style="color: #EF924D; font-weight: 600;">sân chơi nội bộ riêng biệt</span>. Nguồn <span style="color: #EF924D; font-weight: 600;">thực phẩm an toàn</span> được phục vụ trong tất cả các bữa ăn, <span style="color: #EF924D; font-weight: 600;">mang lại một môi trường hạnh phúc, thân thiện, an toàn</span>.`,
        forkIconUrl: "/icons/icon_fork.png",
        listItems: [
            "Lấy trẻ làm trung tâm,<br/>tôn trọng tính riêng biệt của trẻ.",
            "Tạo môi trường cho trẻ phát huy tính tự lập<br/>và khả năng tự học.",
            "Trẻ được phát triển toàn diện<br/>tất cả các giác quan: thị giác, thính giác, vận động..."
        ]
    };

    const features = data.featureBoxes || [
        { title: "Môi trường học tập lý tưởng", ttColor: "#7ED3F7", desc: "Hệ thống phòng học...", icon: "/icons/icon_environment.png" },
        { title: "Chương trình giáo dục thể chất quốc tế", ttColor: "#BFD730", desc: "AMG Kindergarten có hệ thống phòng Gym...", icon: "/icons/icon_sport.png" },
        { title: "Chương trình ngoại khóa phong phú", ttColor: "#FFD668", desc: "Tại AMG Kindergarten trẻ được tham gia...", icon: "/icons/icon_culture.png" },
        { title: "Chương trình tiếng Anh chuẩn quốc tế", ttColor: "#F6ADCD", desc: "Ở AMG Kindergarten, trẻ được học...", icon: "/icons/icon_english.png" },
    ];


    return (
        <section className="w-full bg-[#FFF6C7] px-4 md:px-6 py-10 relative z-10"> {/* Giảm py xuống để không quá cách xa */}
            {/* Icon voi này có vẻ position absolute với toàn trang, nên có thể giữ ở LandingPage.tsx cha */}
            {/* <Image src={decorElephant} alt="decorative elephant" width={isMobile ? 75 : 150} height={isMobile ? 50 : 100}
                   className="absolute left-5 lg:left-30 -top-10 z-20"/> */}
            <div className="w-full max-w-7xl mx-auto">
                <h2 style={{ textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white' }}
                    className="text-4xl md:text-4xl text-center text-[#F7B052] mb-2">
                    {title1}
                </h2>
                <h2 style={{ textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white' }}
                    className="text-4xl md:text-4xl text-center text-[#F7B052] mb-10"> {/* Tăng mb */}
                    {title2}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col">
                                    <h3 className="text-[#7ED3F7] font-semibold text-lg">{leftCol.sectionTitle1}</h3>
                                    <h3 className="text-[#7ED3F7] font-semibold text-lg mb-3">{leftCol.sectionTitle2}</h3>
                                </div>
                                {leftCol.decorCloudIconUrl &&
                                    <Image src={leftCol.decorCloudIconUrl} alt="cloud" width={100} height={50} className="ml-auto" /> // Đẩy cloud sang phải
                                }
                            </div>
                            <div className="text-black leading-relaxed text-sm text-justify prose prose-sm max-w-none"> {/* Dùng prose cho HTML */}
                                <RenderStaticHTMLContent content={`<p>${leftCol.descriptionHtml}</p>`} />
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            {leftCol.forkIconUrl &&
                                <Image src={leftCol.forkIconUrl} alt="fork icon" width={50} height={100} className="object-contain mt-1" />
                            }
                            <div className="space-y-6 text-sm text-black"> {/* Giảm space-y */}
                                {leftCol.listItems?.map((item, idx) => (
                                    <p key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Feature Boxes */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"> {/* Điều chỉnh gap */}
                        {features.map((item, idx) => (
                            <div key={idx} className="p-3 flex flex-col items-center text-center gap-2 rounded-2xl" style={{ backgroundColor: item.bg && item.bg.startsWith('#') ? item.bg : undefined }} // Nếu bg là mã màu
                                 // className={item.bg && item.bg.startsWith('bg-') ? `${item.bg} rounded-2xl p-3 flex flex-col items-center text-center gap-2` : "rounded-2xl p-3 flex flex-col items-center text-center gap-2"} // Nếu bg là class
                            >
                                <Image src={item.icon} alt={item.title} width={isMobile? 150: 200} height={isMobile? 75:100} className="object-contain h-20 md:h-24"/>
                                <p style={{color: item.ttColor}} className="font-bold text-base mt-2">
                                    {item.title}
                                </p>
                                <p className="text-xs text-black text-justify">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}