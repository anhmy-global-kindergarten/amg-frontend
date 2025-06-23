'use client';
import Image from "next/image";
import RenderStaticHTMLContent from "@/app/utils/getStaticPageContent";
import ClassGallery from "@/components/ClassGallery"; // Để render HTML

interface AboutAmgSectionProps {
    isMobile: boolean; // Cần isMobile nếu layout thay đổi
    data: {
        mainTitle?: string;
        sectionTitle?: string;
        introductionHtml?: string;
        icons?: { src: string; alt: string; width?: number; height?: number }[];
        decorElephantUrl?: string;
        decorCloudUrl?: string;
    };
}

export default function AboutAmgSection({ isMobile, data }: AboutAmgSectionProps) {
    const mainTitle = data.mainTitle || "VỀ AMG";
    const sectionTitle = data.sectionTitle || "GIỚI THIỆU CHUNG";
    const introHtml = data.introductionHtml || `
        <p class="rounded-xl text-justify">
            <span style="background-color: #FACBCC;">Mầm non AMG Kindergarten là ngôi trường được hình thành từ </span>
            <span style="background-color: #FACBCC; color: #EF924D; font-weight: 600;">tình yêu của người mẹ dành cho con</span>
            <span style="background-color: #FACBCC;">. Chúng tôi mong muốn lan toả tình </span>
            <span style="background-color: #FACBCC; color: #EF924D; font-weight: 600;">yêu thương </span>
            <span style="background-color: #FACBCC;">và </span>
            <span style="background-color: #FACBCC; color: #EF924D; font-weight: 600;">năng lượng tích cực </span>
            <span style="background-color: #FACBCC;">đến con trẻ trên cơ sở tình yêu thương của người làm mẹ. Bằng việc lựa chọn, chắt lọc các chương trình, </span>
            <span style="background-color: #FACBCC; color: #EF924D; font-weight: 600;">giáo án tiên tiến từ Tây Âu và kết hợp cùng nhiều chuyên gia giáo dục có chuyên môn cao</span>
            <span style="background-color: #FACBCC;">, chúng tôi xây dựng nên </span>
            <span style="background-color: #FACBCC; color: #EF924D; font-weight: 600;">giáo án giáo dục mầm non độc quyền của AMG Kindergarten</span>
            <span style="background-color: #FACBCC;">. Với mục tiêu: </span>
            <span style="background-color: #FACBCC; color: #EF924D; font-weight: 600;">Lấy trẻ làm trung tâm</span>
            <span style="background-color: #FACBCC;">, quan tâm phát triển tới từng cá thể, thúc đẩy </span>
            <span style="background-color: #FACBCC; color: #EF924D; font-weight: 600;">năng lượng tích cực và tính sáng tạo</span>
            <span style="background-color: #FACBCC;">. Chúng tôi lựa chọn </span>
            <span style="background-color: #FACBCC; color: #EF924D; font-weight: 600;">Phương pháp Phần Lan </span>
            <span style="background-color: #FACBCC;">là nền tảng để triển khai giảng dạy tại nhà trường. Với cấu tạo bài học trải nghiệm đầy cuốn hút, thú vị cùng lịch trình di chuyển linh hoạt giúp thay đổi không gian học, AMG chắc chắn rằng mỗi ngày đến trường sẽ là </span>
            <span style="background-color: #FACBCC; color: #EF924D; font-weight: 600;">một hành trình đầy thú vị và ấn tượng với con trẻ</span>
            <span style="background-color: #FACBCC;">. AMG có </span>
            <span style="background-color: #FACBCC; color: #EF924D; font-weight: 600;">đội ngũ chuyên gia tư vấn toàn diện </span>
            <span style="background-color: #FACBCC;">không chỉ về học thuật mà còn cả phương diện chăm sóc và dinh dưỡng dành cho trẻ. AMG Kindergarten luôn nỗ lực mang lại một môi trường </span>
            <span style="background-color: #FACBCC; color: #EF924D; font-weight: 600;">giáo dục an toàn, trải nghiệm thú vị, hữu ích và sự chăm sóc chu đáo, toàn diện.</span>
        </p>
    `; // HTML mặc định, bạn nên lưu dạng sạch hơn trong DB và dùng prose
    const icons = data.icons || [
        { src: "/icons/icon_about1.png", alt: "Phương pháp giáo dục Phần Lan", width:300, height:170 },
        { src: "/icons/icon_about2.png", alt: "Cơ sở vật chất chuẩn Quốc tế", width:300, height:170 },
        { src: "/icons/icon_about3.png", alt: "Lớp học từ 6 tháng đến 6 tuổi", width:300, height:170 },
        { src: "/icons/icon_about4.png", alt: "Ngôn ngữ giảng dạy Việt, Anh", width:300, height:170 },
    ];
    const decorElephant = data.decorElephantUrl || "/icons/icon_elephant0.png";
    const decorCloud = data.decorCloudUrl || "/banner/icon_cloud.png";

    return (
        <section className="w-full bg-[#FFF6C7] py-10 relative z-10">
            <div className={`${isMobile ? 'w-[100%]' : 'w-[90%]'} mx-auto flex flex-col items-center gap-6`}>
                <div>
                    <Image src={decorElephant} alt="decor elephant" width={isMobile ? 60 : 100} height={isMobile ? 40 : 70} className="absolute left-[10%] -top-[70px] z-99"/>
                </div>
                <div className="w-full px-4 py-8">
                    <h2 style={{ textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white' }}
                        className="text-4xl md:text-4xl text-center text-[#F7B052] mb-6">{mainTitle}</h2>
                    <h3 className="text-lg md:text-xl font-semibold text-[#7ED3F7]">{sectionTitle}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Left - Text block */}
                        <div className="rounded-xl text-base leading-7 text-black space-y-4">
                            {/*
                                Để render HTML an toàn và có style từ `prose`, bạn nên dùng
                                component RenderStaticHTMLContent nếu `introHtml` là HTML sạch.
                                Đoạn HTML bạn cung cấp có nhiều `<span>` với `bg-[#FACBCC]`,
                                cách tốt nhất là áp dụng nền đó cho div cha và chỉ dùng span màu cho text.
                            */}
                            {/* <RenderStaticHTMLContent content={introHtml} /> */}
                            <div className="rounded-xl bg-[#FACBCC] p-4 text-justify"> {/* Áp dụng nền và padding ở đây */}
                                {introHtml.includes('<') ? <RenderStaticHTMLContent content={introHtml} /> : <p className="text-justify">{introHtml}</p>}
                            </div>
                        </div>
                        <Image src={decorCloud} alt="decor cloud" width={100} height={50} className="absolute right-5 top-[140px] lg:right-130 lg:top-[140px] z-99"/>
                        {/* Right - Icons grid */}
                        <div className="grid grid-cols-2 gap-4 place-items-center">
                            {icons.map((icon, idx) => (
                                <Image key={idx} src={icon.src} alt={icon.alt} width={icon.width || 300} height={icon.height || 170}/>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Class Gallery Section - Component này tự quản lý data của nó */}
                <ClassGallery/>
            </div>
        </section>
    );
}