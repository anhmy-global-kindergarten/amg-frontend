'use client';
/* eslint-disable */
import Image from "next/image";
import ClassGallery from '@/components/ClassGallery';
import TestimonialCarousel from "@/components/TestimonialCarousel";
import HeaderMenu from "@/components/HeaderMenu";
import RegisterClassModal from "@/modals/RegisterClassModal";
import {useCallback, useEffect, useRef, useState} from 'react';
import {FaArrowUp, FaEdit, FaSave} from "react-icons/fa";

import EditableText from "@/components/landing-page/EditableText";
import EditableImage from "@/components/landing-page/EditableImage";

// INTERFACE ĐÃ ĐƯỢC MỞ RỘNG
interface PageContent {
    // Top Navbar
    topNavPhone: string;
    topNavEmail: string;
    // Header
    headerLogoSrc: string;
    // Banner Section Mobile
    bannerMobileTitle: string;
    bannerMobileSubtitle: string;
    bannerMobileDescription: string;
    bannerMobileKidsImageSrc: string;
    bannerMobileRegisterButtonImageSrc: string;
    bannerMobilePlayIconSrc: string;
    // Banner Section Desktop
    bannerDesktopTitle: string;
    bannerDesktopSubtitle: string;
    bannerDesktopDescription: string;
    bannerDesktopKidsImageSrc: string;
    bannerDesktopRegisterButtonImageSrc: string;
    bannerDesktopPlayIconSrc: string;

    // Gallery Section
    galleryImage1Src: string;
    galleryImage2Src: string;
    galleryImage3Src: string;
    galleryImage4Src: string;
    galleryImage5Src: string;
    galleryImage6Src: string;
    galleryImage7Src: string;
    galleryImage8Src: string;

    // About AMG Section
    aboutAmgSectionTitle: string;
    aboutAmgIntroHeading: string;
    aboutAmgParagraph: string;
    aboutAmgIcon1Src: string;
    aboutAmgIcon2Src: string;
    aboutAmgIcon3Src: string;
    aboutAmgIcon4Src: string;

    // Class Gallery Section
    classGalleryTitle: string;
    classGalleryBoxes: { imageSrc: string; altText: string; }[];
    classGalleryItems: { name: string; imageSrc: string; }[];


    // Meal Section
    mealSectionTitle: string;
    mealImage1Src: string;
    mealImage2Src: string;
    mealImage3Src: string;
    mealImage4Src: string;
    mealImage5Src: string;
    mealImage6Src: string;
    mealImage7Src: string;
    mealImage8Src: string;

    // Reasons Section
    reasonsSectionTitle1: string;
    reasonsSectionTitle2: string;
    reasonsCol1Heading1: string;
    reasonsCol1Heading2: string;
    reasonsCol1Para1: string;
    reasonsCol1ForkPara1: string;
    reasonsCol1ForkPara2: string;
    reasonsCol1ForkPara3: string;
    reasonsFeature1IconSrc: string;
    reasonsFeature1Title: string;
    reasonsFeature1Desc: string;
    reasonsFeature2IconSrc: string;
    reasonsFeature2Title: string;
    reasonsFeature2Desc: string;
    reasonsFeature3IconSrc: string;
    reasonsFeature3Title: string;
    reasonsFeature3Desc: string;
    reasonsFeature4IconSrc: string;
    reasonsFeature4Title: string;
    reasonsFeature4Desc: string;

    // Testimonials
    testimonials: { content: string; name: string; desc: string; }[];

    // Footer Section
    footerSystemTitle: string;
    footerSystemName: string;
    footerAddress1: string;
    footerAddress2: string;
    footerAddress3: string;
    footerAddress4: string;
    footerHotline: string;
    footerEmail: string;
    footerYoutubeName: string;
    footerFanpageImageSrc: string;
    footerYoutubeImageSrc: string;
    footerLinkTitle: string;
    footerSupportTitle: string;
    footerLinks: { text: string; href: string }[];
    footerSupportLinks: { text: string; href: string }[];
}

// INITIAL CONTENT ĐÃ ĐƯỢC MỞ RỘNG
const initialPageContent: PageContent = {
    topNavPhone: "0972556001",
    topNavEmail: "anhmykindergarten@gmail.com",
    headerLogoSrc: "/banner/logo.png",
    bannerMobileTitle: "Đăng ký<br/>Tuyển sinh",
    bannerMobileSubtitle: "năm học 2024-2025",
    bannerMobileDescription: "Mầm non AMG<br/>Trường mầm non song ngữ<br/>Giảng dạy theo chương trình Phần Lan và tiếng anh Grapeseeds",
    bannerMobileKidsImageSrc: "/banner/banner_kids_1.png",
    bannerMobileRegisterButtonImageSrc: "/banner/button_register.png",
    bannerMobilePlayIconSrc: "/banner/icon_play.png",
    bannerDesktopTitle: "Đăng ký<br/>Tuyển sinh",
    bannerDesktopSubtitle: "năm học 2024-2025",
    bannerDesktopDescription: "Anh Mỹ Global - Môi trường giáo dục hoàn hảo <br class=\"hidden sm:block\"/>cho trẻ từ 15 tháng tới 6 tuổi",
    bannerDesktopKidsImageSrc: "/banner/banner_kids_1.png",
    bannerDesktopRegisterButtonImageSrc: "/banner/button_register.png",
    bannerDesktopPlayIconSrc: "/banner/icon_play.png",
    galleryImage1Src: "/gallery/photo1.png",
    galleryImage2Src: "/gallery/photo2.png",
    galleryImage3Src: "/gallery/photo3.png",
    galleryImage4Src: "/gallery/photo4.png",
    galleryImage5Src: "/gallery/photo5.png",
    galleryImage6Src: "/gallery/photo6.png",
    galleryImage7Src: "/gallery/photo7.png",
    galleryImage8Src: "/gallery/photo8.png",
    aboutAmgSectionTitle: "VỀ AMG",
    aboutAmgIntroHeading: "GIỚI THIỆU CHUNG",
    aboutAmgParagraph: ` mầm non AMG Kindergarten là ngôi trường được hình thành từ <span class="text-[#EF924D]">tình yêu của người mẹ dành cho con</span>. Chúng tôi mong muốn lan toả tình <span class="text-[#EF924D]">yêu thương</span> và <span class="text-[#EF924D]">năng lượng tích cực</span> đến con trẻ trên cơ sở tình yêu thương của người làm mẹ. Bằng việc lựa chọn, chắt lọc các chương trình, <span class="text-[#EF924D]">giáo án tiên tiến từ Tây Âu và kết hợp cùng nhiều chuyên gia giáo dục có chuyên môn cao</span>, chúng tôi xây dựng nên <span class="text-[#EF924D]">giáo án giáo dục mầm non độc quyền của AMG Kindergaten</span>. Với mục tiêu: <span class="text-[#EF924D]">Lấy trẻ làm trung tâm</span>, quan tâm phát triển tới từng cá thể, thúc đẩy <span class="text-[#EF924D]">năng lượng tích cực và tính sáng tạo</span>. Chúng tôi lựa chọn <span class="text-[#EF924D]">Phương pháp Phần Lan </span>.là nền tảng để triển khai giảng dạy tại nhà trường. Với cấu tạo bài học trải nghiệm đầy cuốn hút, thú vị cùng lịch trình di chuyển linh hoạt giúp thay đổi không gian học, AMG chắc chắn rằng mỗi ngày đến trường sẽ là <span class="text-[#EF924D]">một hành trình đầy thú vị và ấn tượng với con trẻ</span>. AMG có <span class="text-[#EF924D]">đội ngũ chuyên gia tư vấn toàn diện </span>không chỉ về học thuật mà còn cả phương diện chăm sóc và dinh dưỡng dành cho trẻ. AMG Kindergarten luôn nỗ lực mang lại một môi trường <span class="text-[#EF924D]">giáo dục an toàn, trải nghiệm thú vị, hữu ích và sự chăm sóc chu đáo, toàn diện.</span>`,
    aboutAmgIcon1Src: "/icons/icon_about1.png",
    aboutAmgIcon2Src: "/icons/icon_about2.png",
    aboutAmgIcon3Src: "/icons/icon_about3.png",
    aboutAmgIcon4Src: "/icons/icon_about4.png",
    classGalleryTitle: "HỆ THỐNG LỚP HỌC",
    classGalleryBoxes: [
        { imageSrc: "/info/amg_box1.png", altText: "Tab 1" },
        { imageSrc: "/info/amg_box2.png", altText: "Tab 2" },
        { imageSrc: "/info/amg_box3.png", altText: "Tab 3" },
    ],
    classGalleryItems: [
        { name: 'BLUEBERRY', imageSrc: '/class/blueberry.png' },
        { name: 'CHERRY', imageSrc: '/class/cherry.png' },
        { name: 'LEMON', imageSrc: '/class/lemon.png' },
        { name: 'MANGO', imageSrc: '/class/mango.png' },
        { name: 'INTERNATIONAL', imageSrc: '/class/international.png' },
    ],
    mealSectionTitle: "BỮA ĂN CỦA CON",
    mealImage1Src: "/meal/meal1.png",
    mealImage2Src: "/meal/meal2.png",
    mealImage3Src: "/meal/meal3.png",
    mealImage4Src: "/meal/meal4.png",
    mealImage5Src: "/meal/meal5.png",
    mealImage6Src: "/meal/meal6.png",
    mealImage7Src: "/meal/meal7.png",
    mealImage8Src: "/meal/meal8.png",
    reasonsSectionTitle1: "ĐIỀU GÌ KHIẾN PHỤ HUYNH TIN TƯỞNG",
    reasonsSectionTitle2: "AMG?",
    reasonsCol1Heading1: "CHƯƠNG TRÌNH HỌC",
    reasonsCol1Heading2: "CHUẨN QUỐC TẾ",
    reasonsCol1Para1: `AMG Kindergarten với hệ thống lớp học cho <span class="text-[#EF924D]">trẻ từ 6 tháng đến 6 tuổi</span>, hệ thống phòng học đầy đủ <span class="text-[#EF924D]">ánh sáng tự nhiên</span>, trang bị đầy đủ <span class="text-[#EF924D]"> cơ sở vật chất hạ tầng hiện đại</span>, an toàn cho trẻ cùng <span class="text-[#EF924D]"> sân chơi nội bộ riêng biệt</span>. Nguồn <span class="text-[#EF924D]"> thực phẩm an toàn</span> được phục vụ trong tất cả các bữa ăn, <span class="text-[#EF924D]"> mang lại một môi trường hạnh phúc, thân thiện, an toàn</span>.`,
    reasonsCol1ForkPara1: "Lấy trẻ làm trung tâm, tôn trọng tính riêng biệt của trẻ.",
    reasonsCol1ForkPara2: "Tạo môi trường cho trẻ phát huy tính tự lập và khả năng tự học.",
    reasonsCol1ForkPara3: "Trẻ được phát triển toàn diện tất cả các giác quan: thị giác, thính giác, vận động...",
    reasonsFeature1IconSrc: "/icons/icon_environment.png",
    reasonsFeature1Title: "Môi trường học tập lý tưởng",
    reasonsFeature1Desc: "Hệ thống phòng học đầy đủ ánh sáng tự nhiên, trang bị đầy đủ cơ sở vật chất hạ tầng hiện đại, an toàn. Nguồn thực phẩm an toàn được phục vụ trong tất cả các bữa ăn của cả cô và trò, mang lại một môi trường hạnh phúc, thân thiện, an toàn.",
    reasonsFeature2IconSrc: "/icons/icon_sport.png",
    reasonsFeature2Title: "Chương trình giáo dục thể chất quốc tế",
    reasonsFeature2Desc: "AMG Kindergarten có hệ thống phòng Gym chuyên dụng, an toàn dành cho trẻ cùng giáo viên chuyên môn cao trong lĩnh vực giáo dục thể chất cho trẻ em. Bể bơi, bể float, bể cát động lực, sân chơi riêng biệt mang đến cho các con một môi trường hoạt động thể chất trọn vẹn nhất.",
    reasonsFeature3IconSrc: "/icons/icon_culture.png",
    reasonsFeature3Title: "Chương trình ngoại khóa phong phú",
    reasonsFeature3Desc: "Tại AMG Kindergarten trẻ được tham gia nhiều hoạt động ngoại khóa đa dạng hàng tuần, hàng tháng, giúp trẻ có những trải nghiệm thực tế thú vị, phong phú, hỗ trợ hiệu quả phát triển các kỹ năng sống cũng như bồi đắp những giá trị cốt lõi.",
    reasonsFeature4IconSrc: "/icons/icon_english.png",
    reasonsFeature4Title: "Chương trình tiếng Anh chuẩn quốc tế",
    reasonsFeature4Desc: "Ở AMG Kindergarten, trẻ được học và tiếp cận tiếng Anh một cách tự nhiên qua các hoạt động vui chơi, học tập hàng ngày. Giáo viên người bản ngữ luôn tạo một không khí vui vẻ, thoải mái giúp trẻ yêu Tiếng Anh ngay từ nhỏ.",
    testimonials: [
        {
            content: "Qua những trải nghiệm tuyệt vời của con tại AMG, tôi thấy nhà trường đã thực sự làm tốt sứ mệnh của mình khi mang tới cho các con một môi trường học tập hiện đại, thân thiện và cởi mở...",
            name: "Nguyễn Hà Phương",
            desc: "Phụ huynh cháu Măng",
        },
        {
            content: "Con tôi đã thay đổi rất tích cực nhờ chương trình học và sự quan tâm của thầy cô ở đây. Tôi rất an tâm khi gửi gắm con tại AMG.",
            name: "Trần Minh Tâm",
            desc: "Phụ huynh bé Su",
        },
        {
            content: "Chương trình học phong phú, giáo viên tận tâm. Tôi đặc biệt ấn tượng với các hoạt động ngoại khóa hàng tháng.",
            name: "Lê Thảo Vy",
            desc: "Phụ huynh bé Na",
        },
    ],
    footerSystemTitle: "HỆ THỐNG AMG",
    footerSystemName: "ANHMY GLOBAL KINDERGARTEN",
    footerAddress1: "Cơ sở 1: No B18-06, Vinhomes Gardenia, P. Hàm Nghi, Mỹ Đình, Hà Nội.",
    footerAddress2: "Cơ sở 2: No B18-05A, Vinhomes Gardenia, P. Hàm Nghi, Mỹ Đình, Hà Nội.",
    footerAddress3: "Cơ sở 3: Tầng 2, Tòa nhà Dreamland Bonanza, 23 Duy Tân, Cầu Giấy, Hà Nội",
    footerAddress4: "Cơ sở 4: S301, Sky 3, Aquabay, Khu đô thị Ecopark, Hưng Yên",
    footerHotline: "Hotline: 0972999201",
    footerEmail: "Email: anhmykindergarten@gmail.com",
    footerYoutubeName: "Youtube: AMG - AnhMy Global Kindergarten",
    footerFanpageImageSrc: "https://img.youtube.com/vi/wR0SAVlV8xM/hqdefault.jpg",
    footerYoutubeImageSrc: "https://img.youtube.com/vi/LKDxvXi21GI/hqdefault.jpg",
    footerLinkTitle: "LIÊN KẾT",
    footerSupportTitle: "HỖ TRỢ",
    footerLinks: [
        { text: "Trang chủ", href: "/" }, { text: "Giới thiệu", href: "/" }, { text: "Hệ thống lớp học", href: "/" }, { text: "Tin tức sự kiện", href: "/" }, { text: "Thư viện AMG", href: "/" }, { text: "Tuyển sinh", href: "/" }, { text: "Liên hệ", href: "/" },
    ],
    footerSupportLinks: [
        { text: "Trang chủ", href: "/" }, { text: "Giới thiệu", href: "/" }, { text: "Hệ thống lớp học", href: "/" }, { text: "Tin tức sự kiện", href: "/" }, { text: "Thư viện AMG", href: "/" }, { text: "Tuyển sinh", href: "/" }, { text: "Liên hệ", href: "/" },
    ]
};

const newTestimonialTemplate = {
    content: "Click để sửa nội dung cảm nhận mới...",
    name: "Tên phụ huynh",
    desc: "Mô tả (ví dụ: Phụ huynh bé An)",
};

const newClassGalleryItemTemplate = {
    name: 'NEW_CLASS',
    imageSrc: '/placeholder.png'
};

const newClassGalleryBoxTemplate = {
    imageSrc: '/placeholder.png',
    altText: 'Cơ sở mới'
};

async function fetchContentFromAPI(): Promise<PageContent> {
    try {
        const response = await fetch(`/api-v1/landing-page/get-content`);
        if (response.status === 404) {
            console.warn("API 404: Không có nội dung trong DB. Sử dụng dữ liệu mặc định.");
            return initialPageContent;
        }
        if (!response.ok) throw new Error(`Lỗi mạng: ${response.statusText}`);
        const content = await response.json();
        const hydratedContent: PageContent = { ...initialPageContent, ...content };
        return hydratedContent;
    } catch (error) {
        alert("Không thể kết nối tới server. Trang sẽ hiển thị nội dung mặc định.");
        return initialPageContent;
    }
}

async function saveContentToAPI(content: PageContent): Promise<{ success: boolean; message: string }> {
    try {
        const response = await fetch(`/api-v1/landing-page/update-content`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(content),
        });
        if (!response.ok) throw new Error(`Lỗi mạng: ${response.statusText}`);
        const result = await response.json();
        return { success: true, message: result.message || "Lưu thành công!" };
    } catch (error) {
        return { success: false, message: "Có lỗi xảy ra khi lưu dữ liệu." };
    }
}

async function updateImagesStatusAPI(urls: string[]): Promise<boolean> {
    if (urls.length === 0) return true; // Không có gì để cập nhật

    console.log("Đang gọi API để cập nhật trạng thái ảnh...");
    try {
        const payload = urls.map(url => ({ url, style: '' })); // Style có thể để trống
        const response = await fetch(`/api-v1/images/update-status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`Lỗi mạng: ${response.statusText}`);
        }
        console.log("Cập nhật trạng thái ảnh thành công!");
        return true;
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái ảnh:", error);
        return false;
    }
}

function extractImageUrls(content: PageContent): string[] {
    const urls = new Set<string>();
    const urlRegex = /\/uploads\/[a-f0-9-]+\.(png|jpg|jpeg|gif|webp)/gi;

    const contentString = JSON.stringify(content);

    const matches = contentString.match(urlRegex);
    if (matches) {
        matches.forEach(url => urls.add(url));
    }

    return Array.from(urls);
}

export default function LandingPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [role, setRole] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [pageContent, setPageContent] = useState<PageContent | null>(null);
    const [originalContent, setOriginalContent] = useState<PageContent | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [currentlyEditingId, setCurrentlyEditingId] = useState<string | null>(null);
    const handleStartEditing = (id: string) => {
        if (currentlyEditingId === null) {
            setCurrentlyEditingId(id);
        } else {
            alert("Vui lòng lưu hoặc hủy thay đổi hiện tại trước khi sửa mục khác.");
        }
    };

    const handleStopEditing = () => {
        setCurrentlyEditingId(null);
    };

    const hasUnsavedChanges = JSON.stringify(pageContent) !== JSON.stringify(originalContent);

    useEffect(() => {
        const loadContent = async () => {
            setIsLoading(true);
            const contentFromAPI = await fetchContentFromAPI();
            setPageContent(contentFromAPI);
            setOriginalContent(contentFromAPI);
            setIsLoading(false);
        };
        loadContent();
    }, []);

    const listContainerRef = useRef<HTMLUListElement>(null);
    const verticalBarRef = useRef<HTMLDivElement>(null);
    const ListItem = ({ children }: { children: React.ReactNode }) => (
        <li className="relative pl-16">
            <div className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-0.5 bg-[#FFD06E]"></div>
            <div
                className="absolute top-1/2 -translate-y-1/2 left-8 -translate-x-1/2 w-5 h-5 bg-[#FFD06E] rounded-full"></div>
            {children}
        </li>
    );

    useEffect(() => {
        const listContainer = listContainerRef.current;
        const verticalBar = verticalBarRef.current;

        if (!listContainer || !verticalBar) return;

        const calculateBarPosition = () => {
            const listItems = listContainer.children;
            if (listItems.length < 1) return;

            const firstItem = listItems[0] as HTMLElement;
            const lastItem = listItems[listItems.length - 1] as HTMLElement;

            // Tính vị trí tâm theo chiều dọc của mục đầu tiên
            const startY = firstItem.offsetTop + (firstItem.offsetHeight / 2);

            // Tính vị trí tâm theo chiều dọc của mục cuối cùng
            const endY = lastItem.offsetTop + (lastItem.offsetHeight / 2);

            // Áp dụng style cho thanh dọc
            verticalBar.style.top = `${startY}px`;
            verticalBar.style.height = `${endY - startY}px`;
        };

        // Chạy lần đầu
        calculateBarPosition();

        // Chạy lại mỗi khi thay đổi kích thước cửa sổ (quan trọng cho responsive)
        window.addEventListener('resize', calculateBarPosition);

        // Dọn dẹp event listener khi component bị unmount
        return () => window.removeEventListener('resize', calculateBarPosition);

    }, [pageContent]);

    const [isUploading, setIsUploading] = useState(false);
    const [uploadingImageId, setUploadingImageId] = useState<string | null>(null);

    const handleImageUpload = async (id: string, file: File) => {
        setIsUploading(true);
        setUploadingImageId(id);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`/api-v1/images/upload-image`, {
                method: 'POST', body: formData,
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload thất bại');
            }
            const result = await response.json();
            const newUrl = result.url;
            if (newUrl) {
                handleContentUpdate(id, newUrl);
            }
        } catch (error) {
            alert(`Upload ảnh thất bại: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setIsUploading(false);
            setUploadingImageId(null);
        }
    };

    const handleToggleEditMode = () => {
        if (isEditMode) {
            if (hasUnsavedChanges) {
                if (window.confirm("Bạn có thay đổi chưa lưu. Bạn có chắc muốn thoát mà không lưu?")) {
                    setPageContent(originalContent);
                    setIsEditMode(false);
                }
            } else {
                setIsEditMode(false);
            }
        } else {
            setOriginalContent(pageContent);
            setIsEditMode(true);
        }
    };

    const handleSaveChanges = async () => {
        if (!pageContent) return;
        setIsSaving(true);
        const usedImageUrls = extractImageUrls(pageContent);
        const statusUpdateSuccess = await updateImagesStatusAPI(usedImageUrls);
        if (!statusUpdateSuccess) {
            alert("Có lỗi xảy ra khi cập nhật trạng thái ảnh. Nội dung chưa được lưu. Vui lòng thử lại.");
            setIsSaving(false);
            return;
        }
        const result = await saveContentToAPI(pageContent);
        setIsSaving(false);
        alert(result.message);
        if (result.success) {
            setOriginalContent(pageContent);
            setIsEditMode(false);
        }
    };

    const handleResetToDefault = async () => {
        if (window.confirm("Bạn có chắc muốn khôi phục nội dung về mặc định? Hành động này sẽ không thể phục hồi, bạn vẫn chắc chắn muốn thực hiện ?.")) {
            setIsSaving(true);
            const result = await saveContentToAPI(initialPageContent);
            setIsSaving(false);
            alert(result.message);
            if (result.success) {
                setPageContent(initialPageContent);
                setOriginalContent(initialPageContent);
                setIsEditMode(false);
            }
        }
    };

    const handleContentUpdate = (id: string, value: string) => {
        setPageContent(prev => {
            if (!prev) return null;
            const newContent = JSON.parse(JSON.stringify(prev));

            if (id.startsWith('testimonial_')) {
                const [, indexStr, key] = id.split('_');
                const index = parseInt(indexStr, 10);
                if (isNaN(index)) return newContent;
                const newTestimonials = [...newContent.testimonials];
                (newTestimonials[index] as any)[key] = value;
                return {...newContent, testimonials: newTestimonials};
            }

            if (id.startsWith('classGalleryItem_')) {
                const [, indexStr, key] = id.split('_');
                const index = parseInt(indexStr, 10);
                if (isNaN(index)) return newContent;
                const newItems = [...newContent.classGalleryItems];
                (newItems[index] as any)[key] = value;
                return {...newContent, classGalleryItems: newItems};
            }

            if (id.startsWith('classGalleryBox_')) {
                const [, indexStr, key] = id.split('_');
                const index = parseInt(indexStr, 10);
                if (isNaN(index)) return newContent;
                const newBoxes = [...newContent.classGalleryBoxes];
                (newBoxes[index] as any)[key] = value;
                return {...newContent, classGalleryBoxes: newBoxes};
            }

            // ... (Thêm các logic cho mảng khác nếu có)

            (newContent as any)[id] = value;
            return newContent;
        });
        handleStopEditing();
    };

    const handleAddItem = (arrayKey: keyof PageContent, newItemTemplate: any) => {
        setPageContent(prev => {
            if (!prev) return null;
            const currentArray = prev[arrayKey];
            if (Array.isArray(currentArray)) {
                const newArray = [...currentArray, { ...newItemTemplate }];
                return { ...prev, [arrayKey]: newArray };
            }
            return prev;
        });
    };

    const handleDeleteItem = (arrayKey: keyof PageContent, indexToDelete: number) => {
        if (!window.confirm("Bạn có chắc muốn xóa mục này?")) return;
        setPageContent(prev => {
            if (!prev) return null;
            const currentArray = prev[arrayKey];
            if (Array.isArray(currentArray)) {
                const newArray = currentArray.filter((_, index) => index !== indexToDelete);
                return { ...prev, [arrayKey]: newArray };
            }
            return prev;
        });
    };


    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        const handleScroll = () => setShowScrollToTop(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'});

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                setRole(parsed?.user?.role || parsed?.role || null);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Lỗi đọc user từ localStorage:", error);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    if (isLoading || !pageContent) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-[#FFF6C7]">
                <p className="text-2xl text-[#EA570A]">Đang tải nội dung trang...</p>
            </div>
        );
    }

    const canEdit = isAuthenticated && (role === "admin" || role === "teacher");


    const features = [
        {
            idBase: "reasonsFeature1",
            titleKey: "reasonsFeature1Title",
            descKey: "reasonsFeature1Desc",
            iconKey: "reasonsFeature1IconSrc",
            ttColor: "#7ED3F7",
        },
        {
            idBase: "reasonsFeature2",
            titleKey: "reasonsFeature2Title",
            descKey: "reasonsFeature2Desc",
            iconKey: "reasonsFeature2IconSrc",
            ttColor: "#BFD730",
        },
        {
            idBase: "reasonsFeature3",
            titleKey: "reasonsFeature3Title",
            descKey: "reasonsFeature3Desc",
            iconKey: "reasonsFeature3IconSrc",
            ttColor: "#FFD668",
        },
        {
            idBase: "reasonsFeature4",
            titleKey: "reasonsFeature4Title",
            descKey: "reasonsFeature4Desc",
            iconKey: "reasonsFeature4IconSrc",
            ttColor: "#F6ADCD",
        },
    ];

    const galleryImages1 = [
        {id: "galleryImage5Src", src: pageContent.galleryImage5Src},
        {id: "galleryImage6Src", src: pageContent.galleryImage6Src},
        {id: "galleryImage7Src", src: pageContent.galleryImage7Src},
    ];
    const galleryImages2 = [
        {id: "galleryImage1Src", src: pageContent.galleryImage1Src},
        {id: "galleryImage8Src", src: pageContent.galleryImage8Src},
    ];
    const galleryImages3 = [
        {id: "galleryImage2Src", src: pageContent.galleryImage2Src},
        {id: "galleryImage3Src", src: pageContent.galleryImage3Src},
        {id: "galleryImage4Src", src: pageContent.galleryImage4Src},
    ];
    const mealImages1 = [
        {id: "mealImage1Src", src: pageContent.mealImage1Src},
        {id: "mealImage2Src", src: pageContent.mealImage2Src},
        {id: "mealImage3Src", src: pageContent.mealImage3Src},
    ];
    const mealImages2 = [
        {id: "mealImage4Src", src: pageContent.mealImage4Src},
        {id: "mealImage5Src", src: pageContent.mealImage5Src},
    ];
    const mealImages3 = [
        {id: "mealImage6Src", src: pageContent.mealImage6Src},
        {id: "mealImage7Src", src: pageContent.mealImage7Src},
        {id: "mealImage8Src", src: pageContent.mealImage8Src},
    ];

    return (
        <div className="w-full min-h-screen bg-[#FFF6C7] overflow-hidden relative font-sans text-[#4D4D4D]">
            {/* EDIT MODE TOGGLE AND SAVE BUTTON - Only for admin/teacher */}
            {canEdit && (
                <div className="font-mali-semibold fixed top-20 right-2 z-[99999] bg-white p-2 shadow-lg rounded-md flex flex-col gap-2">
                    <button
                        onClick={handleToggleEditMode}
                        className={`px-3 py-1.5 text-sm rounded ${isEditMode ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white flex items-center gap-1.5`}
                    >
                        <FaEdit/> {isEditMode ? 'Tắt Chỉnh Sửa' : 'Bật Chỉnh Sửa'}
                    </button>
                    {isEditMode && (
                        <>
                            <button
                                onClick={handleSaveChanges}
                                disabled={!hasUnsavedChanges || isSaving}
                                className="px-3 py-1.5 text-sm rounded bg-green-500 hover:bg-green-600 text-white flex items-center gap-1.5 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                <FaSave/> {isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                            </button>
                            <button
                                onClick={handleResetToDefault}
                                disabled={isSaving}
                                className="px-3 py-1.5 text-sm rounded bg-yellow-500 hover:bg-yellow-600 text-white disabled:bg-gray-400"
                            >
                                Reset Mặc Định
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Top Navbar */}
            {!isMobile && (
                <div
                    className="w-full bg-[#FFF6C7] text-[#FFC107] text-sm py-4 px-4 lg:px-8 flex flex-col lg:flex-row justify-between items-center gap-4 ">
                    <div className="flex flex-col sm:flex-row items-center sm:space-x-6 gap-2 sm:gap-0">
                        <div className="flex items-center space-x-2 font-mali-bold ">
                            <Image src="/icons/icon_phone.png" alt="icon phone" height={15} width={15}/>
                            <EditableText
                                id="topNavPhone"
                                initialHtml={pageContent.topNavPhone}
                                onSave={handleContentUpdate}
                                isEditMode={isEditMode}
                                tag="a"
                                className="font-mali-bold hover:underline"
                                style={{color: '#FFC107'}}
                                // @ts-ignore
                                href={`tel:${pageContent.topNavPhone.replace(/<[^>]*>?/gm, '')}`}
                                isCurrentlyEditing={currentlyEditingId === 'topNavPhone'}
                                onStartEditing={handleStartEditing}
                                onCancelEditing={handleStopEditing}
                            />
                        </div>
                        <div className="flex items-center space-x-2 font-mali-bold ">
                            <Image src="/icons/icon_email.png" alt="icon email" height={20} width={20}/>
                            <EditableText
                                id="topNavEmail"
                                initialHtml={pageContent.topNavEmail}
                                onSave={handleContentUpdate}
                                isEditMode={isEditMode}
                                tag="a"
                                className="font-mali-bold hover:underline"
                                style={{color: '#FFC107'}}
                                // @ts-ignore
                                href={`mailto:${pageContent.topNavEmail.replace(/<[^>]*>?/gm, '')}`}
                                isCurrentlyEditing={currentlyEditingId === 'topNavEmail'}
                                onStartEditing={handleStartEditing}
                                onCancelEditing={handleStopEditing}
                            />
                        </div>
                    </div>

                    {/* Right side: Language and Social Icons */}
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        {/* Flags - Decorative */}
                        <div className="flex space-x-2">
                            <Image src="/icons/icon_flag_vn.png" alt="VN" height={20} width={40}
                                   className="object-cover"/>
                            <Image src="/icons/icon_flag_eng.png" alt="ENG" height={20} width={40}
                                   className="object-cover"/>
                        </div>
                        {/* Social icons - Decorative links */}
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
                                            className="font-mali-bold bg-[#4CAF50] text-white px-4 py-1 rounded hover:bg-[#449d48] transition"
                                        >
                                            Dashboard
                                        </a>
                                        <a
                                            href="/post/create"
                                            className="font-mali-bold bg-[#FFC107] text-white px-4 py-1 rounded hover:bg-[#e5a906] transition"
                                        >
                                            Tạo bài viết
                                        </a>
                                    </div>
                                )}
                                <button
                                    onClick={() => handleLogout()}
                                    className="font-mali-bold bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <a
                                href="/login"
                                className="font-mali-bold bg-[#FFC107] text-white px-4 py-1 rounded hover:bg-[#e5a906] transition"
                            >
                                Đăng nhập
                            </a>
                        )}
                    </div>
                </div>
            )}
            {/* Header */}
            <header className={`relative w-full ${isMobile ? 'h-[170px]' : 'h-[330px]'}`}>
                <Image // Decorative background
                    src="/banner/cloud_banner.png"
                    alt="Header Cloud"
                    fill
                    className="object-cover z-0"
                    priority
                />
                <div className={`absolute top-4 z-10 ${isMobile ? 'left-1/2 -translate-x-1/2' : 'left-4'}`}>
                    {/* LOGO is content, not decorative */}
                    <EditableImage
                        id="headerLogoSrc"
                        initialSrc={pageContent.headerLogoSrc}
                        altText="Logo AMG"
                        onFileSelect={handleImageUpload}
                        isUploading={isUploading && uploadingImageId === 'headerLogoSrc'}
                        isEditMode={isEditMode}
                        width={120} height={80}
                    />
                </div>
                <HeaderMenu isAuthenticated={isAuthenticated}/> {/* HeaderMenu is static as requested */}
            </header>

            {/* Banner Section - All content is editable */}
            {isMobile ? (
                <section className="relative pt-2 pb-20 z-10 flex flex-col items-center text-center overflow-visible">
                    <div
                        className="absolute right-1/2 translate-x-[40%] w-[70%] max-w-[550px] h-[570px] mb-6 z-10 -top-48">
                        <EditableImage id="bannerMobileKidsImageSrc" initialSrc={pageContent.bannerMobileKidsImageSrc}
                                       altText="Kids" onFileSelect={handleImageUpload} isEditMode={isEditMode} fill
                                       isUploading={isUploading && uploadingImageId === 'bannerMobileKidsImageSrc'}
                                       objectFit="contain" width={550} height={570} className="w-full h-full"/>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute right-1/2 translate-x-1/2 top-2 w-[250px] h-[300px] z-9"><Image
                        src="/banner/triangle_shade.png" alt="Triangle" fill className="object-contain"/></div>
                    <Image src="/banner/big_cloud.png" alt="big cloud" width={3000} height={200}
                           className="w-[200vw] max-w-none absolute left-1/2 -translate-x-125 top-[165px] z-10"/>
                    <Image src="/banner/panel_white.png" alt="panel white" width={1000} height={100}
                           className="w-full h-[250px] absolute top-[255px] z-10"/>
                    <Image src="/banner/big_cloud.png" alt="big cloud" width={3000} height={200}
                           className="w-[250vw] h-[250px] max-w-none absolute left-1/2 -translate-x-100 top-[380px] z-10 scale-x-[-1]"/>
                    <div className="relative w-full max-w-xl z-20 top-60 pb-2">
                        <EditableText id="bannerMobileTitle" initialHtml={pageContent.bannerMobileTitle}
                                      onSave={handleContentUpdate} isEditMode={isEditMode} tag="h1"
                                      className="font-cadena text-4xl sm:text-5xl text-[#EA570A] leading-tight"
                                      style={{textShadow: '0 0 8px white, 0 0 8px white, 4px 4px 0 white, -4px -4px 0 white'}}
                                      isCurrentlyEditing={currentlyEditingId === 'bannerMobileTitle'}
                                      onStartEditing={handleStartEditing}
                                      onCancelEditing={handleStopEditing}
                        />
                        <EditableText id="bannerMobileSubtitle" initialHtml={pageContent.bannerMobileSubtitle}
                                      onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                      className="font-cadena text-3xl text-[#FFD105] mb-1"
                                      isCurrentlyEditing={currentlyEditingId === 'bannerMobileSubtitle'}
                                      onStartEditing={handleStartEditing}
                                      onCancelEditing={handleStopEditing}
                        />
                        <EditableText id="bannerMobileDescription" initialHtml={pageContent.bannerMobileDescription}
                                      onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                      className="font-mali-medium mb-4 text-[#EA570A] text-xs leading-relaxed"
                                      isCurrentlyEditing={currentlyEditingId === 'bannerMobileDescription'}
                                      onStartEditing={handleStartEditing}
                                      onCancelEditing={handleStopEditing}
                        />
                        <div className="relative w-fit mx-auto">
                            <button onClick={openModal} className="relative">
                                <Image alt="bannerMobileRegisterButtonImageSrc"
                                    src="/banner/button_register_mobile.png"
                                               width={200} height={60} className="hover:opacity-90 transition"/>
                            </button>
                        </div>
                    </div>
                </section>
            ) : (
                <section
                    className="relative px-4 sm:px-6 pb-20 z-10 max-w-8xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between">
                    <div className="ml-50 w-full lg:w-auto max-w-xl z-20 text-center lg:text-left">
                        <div className="relative mb-3">
                            <EditableText
                                id="bannerDesktopTitle"
                                initialHtml={pageContent.bannerDesktopTitle}
                                onSave={handleContentUpdate}
                                isEditMode={isEditMode}
                                tag="h1"
                                className="relative font-cadena text-7xl text-[#EA570A] leading-tight z-20 [paint-order:stroke] fill-current [-webkit-text-stroke:12px_white]"
                                isCurrentlyEditing={currentlyEditingId === 'bannerDesktopTitle'}
                                onStartEditing={handleStartEditing}
                                onCancelEditing={handleStopEditing}
                            />

                        </div>
                        <EditableText id="bannerDesktopSubtitle" initialHtml={pageContent.bannerDesktopSubtitle}
                                      onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                      className="font-cadena text-3xl sm:text-3xl text-[#FFD105] mb-4"
                                      isCurrentlyEditing={currentlyEditingId === 'bannerDesktopSubtitle'}
                                      onStartEditing={handleStartEditing}
                                      onCancelEditing={handleStopEditing}
                        />
                        <EditableText id="bannerDesktopDescription" initialHtml={pageContent.bannerDesktopDescription}
                                      onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                      className="font-mali-medium mb-2 text-[#EA570A]"
                                      isCurrentlyEditing={currentlyEditingId === 'bannerDesktopDescription'}
                                      onStartEditing={handleStartEditing}
                                      onCancelEditing={handleStopEditing}
                        />
                        <div className="relative w-fit mx-auto lg:mx-0">
                            <button onClick={openModal} className="relative">
                                <Image alt="bannerMobileRegisterButtonImageSrc"
                                       src="/banner/button_register_desktop.png"
                                       width={300} height={100} className="hover:opacity-90 transition"/>
                            </button>
                        </div>
                    </div>
                    <div
                        className={`absolute w-full right-60 max-w-[600px] h-[400px] sm:h-[600px] lg:h-[800px] z-10 mb-10 lg:mb-0 lg:mt-0 ${isMobile ? 'top-50' : ''}`}>
                        <EditableImage id="bannerDesktopKidsImageSrc" initialSrc={pageContent.bannerDesktopKidsImageSrc}
                                       isUploading={isUploading && uploadingImageId === 'bannerDesktopKidsImageSrc'}
                                       altText="Kids" onFileSelect={handleImageUpload} isEditMode={isEditMode} fill
                                       objectFit="contain" width={600} height={800} className="w-full h-full"/>
                    </div>
                    {/* Decorative */}
                    <div
                        className="absolute sm:block right-70 top-70 lg:top-0 w-[250px] sm:w-[350px] md:w-[400px] h-[300px] sm:h-[450px] md:h-[500px] z-9">
                        <Image src="/banner/triangle_shade.png" alt="Triangle" fill className="object-contain"/></div>
                    <Image src="/banner/big_cloud.png" alt="" width={2100} height={80}
                           className="w-full absolute top-[970px] lg:top-[400px] z-10"/>
                </section>
            )}

            {/* Gallery Section - All images now editable */}
            <section className="relative w-full mt-40 z-20 px-4">
                <div className="grid grid-cols-3 gap-2 max-w-7xl mx-auto">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-2">
                        {galleryImages1.map((img) => (
                            <EditableImage
                                key={img.id}
                                id={img.id}
                                initialSrc={img.src}
                                altText="Gallery Image"
                                onFileSelect={handleImageUpload}
                                isUploading={isUploading && uploadingImageId === img.id}
                                isEditMode={isEditMode}
                                fill
                                objectFit="cover"
                                width={340}
                                height={350}
                                className="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden"
                            />
                        ))}
                    </div>
                    {/* Column 2 */}
                    <div className="flex flex-col gap-2 justify-center">
                        {galleryImages2.map((img) => (
                            <EditableImage
                                key={img.id}
                                id={img.id}
                                initialSrc={img.src}
                                altText="Gallery Image"
                                onFileSelect={handleImageUpload}
                                isUploading={isUploading && uploadingImageId === img.id}
                                isEditMode={isEditMode}
                                fill
                                objectFit="cover"
                                width={400}
                                height={525}
                                className="w-full h-[225px] sm:h-[300px] md:h-[400px] lg:h-[525px] rounded-2xl overflow-hidden"
                            />
                        ))}
                    </div>
                    {/* Column 3 */}
                    <div className="flex flex-col gap-2">
                        {galleryImages3.map((img) => (
                            <EditableImage
                                key={img.id}
                                id={img.id}
                                initialSrc={img.src}
                                altText="Gallery Image"
                                onFileSelect={handleImageUpload}
                                isUploading={isUploading && uploadingImageId === img.id}
                                isEditMode={isEditMode}
                                fill
                                objectFit="cover"
                                width={340}
                                height={350}
                                className="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* About & Class Gallery Section */}
            <section className="w-full bg-[#FFF6C7] py-10 relative z-20">
                <div className={`${isMobile ? 'w-[100%]' : 'w-[90%]'} mx-auto flex flex-col items-center gap-6`}>
                    {/* Decorative elephant */}
                    <div><Image src="/icons/icon_elephant0.png" alt="" width={isMobile ? 60 : 100}
                                height={isMobile ? 40 : 70} className={`absolute z-99 ${isMobile ? '-top-[20px] left-[5%]' : '-top-[70px] left-[10%]'}`}/></div>
                    <div className="w-full px-4 py-8">
                        <EditableText id="aboutAmgSectionTitle" initialHtml={pageContent.aboutAmgSectionTitle}
                                      onSave={handleContentUpdate} isEditMode={isEditMode} tag="h2"
                                      className={`font-cadena text-center text-[#F7B052] mb-6 ${isMobile ? 'text-4xl' : 'text-7xl'}
                                       [paint-order:stroke] fill-current [-webkit-text-stroke:12px_white]`}
                                      isCurrentlyEditing={currentlyEditingId === 'aboutAmgSectionTitle'}
                                      onStartEditing={handleStartEditing}
                                      onCancelEditing={handleStopEditing}
                        />
                        <EditableText id="aboutAmgIntroHeading" initialHtml={pageContent.aboutAmgIntroHeading}
                                      onSave={handleContentUpdate} isEditMode={isEditMode} tag="h3"
                                      className="font-mali-semibold text-lg md:text-xl font-semibold text-[#7ED3F7]"
                                      isCurrentlyEditing={currentlyEditingId === 'aboutAmgIntroHeading'}
                                      onStartEditing={handleStartEditing}
                                      onCancelEditing={handleStopEditing}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <div className="rounded-xl text-base leading-7 text-black space-y-4 text-justify">
                                <EditableText id="aboutAmgParagraph" initialHtml={pageContent.aboutAmgParagraph}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali rounded-xl"
                                              textEditorStyle={{lineHeight: '1.75rem', color: 'black'}}
                                              isCurrentlyEditing={currentlyEditingId === 'aboutAmgParagraph'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                            </div>
                            {/* Decorative cloud */}
                            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                                   className="absolute right-5 top-[140px] lg:right-130 lg:top-[140px]  z-99"/>
                            <div className="grid grid-cols-2 gap-4 place-items-center">
                                <EditableImage id="aboutAmgIcon1Src" initialSrc={pageContent.aboutAmgIcon1Src}
                                               altText="Phương pháp giáo dục Phần Lan" onFileSelect={handleImageUpload}
                                               isUploading={isUploading && uploadingImageId === 'aboutAmgIcon1Src'}
                                               isEditMode={isEditMode} width={300} height={170}/>
                                <EditableImage id="aboutAmgIcon2Src" initialSrc={pageContent.aboutAmgIcon2Src}
                                               altText="Cơ sở vật chất chuẩn Quốc tế" onFileSelect={handleImageUpload}
                                               isUploading={isUploading && uploadingImageId === 'aboutAmgIcon2Src'}
                                               isEditMode={isEditMode} width={300} height={170}/>
                                <EditableImage id="aboutAmgIcon3Src" initialSrc={pageContent.aboutAmgIcon3Src}
                                               altText="Lớp học từ 6 tháng đến 6 tuổi" onFileSelect={handleImageUpload}
                                               isUploading={isUploading && uploadingImageId === 'aboutAmgIcon3Src'}
                                               isEditMode={isEditMode} width={300} height={170}/>
                                <EditableImage id="aboutAmgIcon4Src" initialSrc={pageContent.aboutAmgIcon4Src}
                                               altText="Ngôn ngữ giảng dạy Việt, Anh" onFileSelect={handleImageUpload}
                                               isUploading={isUploading && uploadingImageId === 'aboutAmgIcon4Src'}
                                               isEditMode={isEditMode} width={300} height={170}/>
                            </div>
                        </div>
                    </div>
                    {/* ClassGallery now receives editable content */}
                    <ClassGallery
                        title={pageContent.classGalleryTitle}
                        boxes={pageContent.classGalleryBoxes}
                        items={pageContent.classGalleryItems}
                        isEditMode={isEditMode}
                        onSave={handleContentUpdate}
                        onFileSelect={handleImageUpload}
                        onAddItemClass={() => handleAddItem('classGalleryItems', newClassGalleryItemTemplate)}
                        onDeleteItemClass={(index) => handleDeleteItem('classGalleryItems', index)}
                        onAddBox={() => handleAddItem('classGalleryBoxes', newClassGalleryBoxTemplate)}
                        onDeleteBox={(index) => handleDeleteItem('classGalleryBoxes', index)}
                        currentlyEditingId={currentlyEditingId}
                        handleStartEditing={handleStartEditing}
                        handleStopEditing={handleStopEditing}
                    />
                </div>
            </section>

            {/* Meal Section - All images now editable */}
            <section className="relative w-full mt-10 z-50 px-4  text-center">
                <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                       className="absolute right-5 -top-[60px] lg:right-50 lg:top-[4700px]  z-99"/>
                <EditableText id="mealSectionTitle" initialHtml={pageContent.mealSectionTitle}
                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="h2"
                              className={`font-cadena text-center text-[#F7B052] mb-6 ${isMobile ? 'text-4xl' : 'text-7xl'}
                               [paint-order:stroke] fill-current [-webkit-text-stroke:12px_white]`}
                              isCurrentlyEditing={currentlyEditingId === 'mealSectionTitle'}
                              onStartEditing={handleStartEditing}
                              onCancelEditing={handleStopEditing}
                />
                <div className="grid grid-cols-3 gap-2 max-w-7xl mx-auto">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-2">
                        {mealImages1.map((img) => (
                            <EditableImage
                                key={img.id}
                                id={img.id}
                                initialSrc={img.src}
                                altText="Meal Image"
                                onFileSelect={handleImageUpload}
                                isUploading={isUploading && uploadingImageId === img.id}
                                isEditMode={isEditMode}
                                fill
                                objectFit="cover"
                                width={340}
                                height={350}
                                className="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden"
                            />
                        ))}
                    </div>
                    {/* Column 2 */}
                    <div className="flex flex-col gap-2 justify-center">
                        {mealImages2.map((img) => (
                            <EditableImage
                                key={img.id}
                                id={img.id}
                                initialSrc={img.src}
                                altText="Meal Image"
                                onFileSelect={handleImageUpload}
                                isUploading={isUploading && uploadingImageId === img.id}
                                isEditMode={isEditMode}
                                fill
                                objectFit="cover"
                                width={400}
                                height={525}
                                className="w-full h-[225px] sm:h-[300px] md:h-[400px] lg:h-[525px] rounded-2xl overflow-hidden"
                            />
                        ))}
                    </div>
                    {/* Column 3 */}
                    <div className="flex flex-col gap-2">
                        {mealImages3.map((img) => (
                            <EditableImage
                                key={img.id}
                                id={img.id}
                                initialSrc={img.src}
                                altText="Meal Image"
                                onFileSelect={handleImageUpload}
                                isUploading={isUploading && uploadingImageId === img.id}
                                isEditMode={isEditMode}
                                fill
                                objectFit="cover"
                                width={340}
                                height={350}
                                className="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Reasons Section - All content is editable */}
            <section className="w-full bg-[#FFF6C7] px-4 md:px-6 relative z-10">
                <Image src="/icons/icon_elephant2.png" alt="" width={isMobile ? 75 : 150} height={isMobile ? 50 : 100}
                       className="left-5 lg:left-30 top-[8800px] lg:top-[4550px] z-99"/>
                <div className="w-full max-w-7xl mx-auto">
                    <EditableText id="reasonsSectionTitle1" initialHtml={pageContent.reasonsSectionTitle1}
                                  onSave={handleContentUpdate} isEditMode={isEditMode} tag="h2"
                                  className={`font-cadena text-center text-[#F7B052] mb-2 ${isMobile ? 'text-3xl' : 'text-7xl'}
                                   [paint-order:stroke] fill-current [-webkit-text-stroke:12px_white]`}
                                  isCurrentlyEditing={currentlyEditingId === 'reasonsSectionTitle1'}
                                  onStartEditing={handleStartEditing}
                                  onCancelEditing={handleStopEditing}
                    />
                    <EditableText id="reasonsSectionTitle2" initialHtml={pageContent.reasonsSectionTitle2}
                                  onSave={handleContentUpdate} isEditMode={isEditMode} tag="h2"
                                  className={`font-cadena text-center text-[#F7B052] mb-6 ${isMobile ? 'text-3xl' : 'text-7xl'}
                                   [paint-order:stroke] fill-current [-webkit-text-stroke:12px_white]`}
                                  isCurrentlyEditing={currentlyEditingId === 'reasonsSectionTitle2'}
                                  onStartEditing={handleStartEditing}
                                  onCancelEditing={handleStopEditing}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col">
                                        <EditableText id="reasonsCol1Heading1"
                                                      initialHtml={pageContent.reasonsCol1Heading1}
                                                      onSave={handleContentUpdate} isEditMode={isEditMode} tag="h3"
                                                      className="font-mali-semibold text-[#7ED3F7] font-semibold text-base"
                                                      isCurrentlyEditing={currentlyEditingId === 'reasonsCol1Heading1'}
                                                      onStartEditing={handleStartEditing}
                                                      onCancelEditing={handleStopEditing}
                                        />
                                        <EditableText id="reasonsCol1Heading2"
                                                      initialHtml={pageContent.reasonsCol1Heading2}
                                                      onSave={handleContentUpdate} isEditMode={isEditMode} tag="h3"
                                                      className="font-mali-semibold text-[#7ED3F7] font-semibold text-base mb-3"
                                                      isCurrentlyEditing={currentlyEditingId === 'reasonsCol1Heading2'}
                                                      onStartEditing={handleStartEditing}
                                                      onCancelEditing={handleStopEditing}
                                        />
                                    </div>
                                    <Image src="/banner/icon_cloud.png" alt="cloud" width={100} height={50}
                                           className="right-2 z-10 ml-10"/>
                                </div>
                                <EditableText id="reasonsCol1Para1" initialHtml={pageContent.reasonsCol1Para1}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali text-black leading-relaxed text-sm text-justify"
                                              isCurrentlyEditing={currentlyEditingId === 'reasonsCol1Para1'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                            </div>
                            <div className="relative">
                                <div
                                    ref={verticalBarRef}
                                    className="absolute left-2 w-0.5 bg-[#FFD06E] transition-all duration-300"
                                ></div>

                                <ul ref={listContainerRef} className="flex flex-col gap-y-12">
                                    <ListItem>
                                        <EditableText
                                            id="reasonsCol1ForkPara1"
                                            initialHtml={pageContent.reasonsCol1ForkPara1}
                                            onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                            className="font-mali text-sm text-black min-w-0 break-words"
                                            isCurrentlyEditing={currentlyEditingId === 'reasonsCol1ForkPara1'}
                                            onStartEditing={handleStartEditing}
                                            onCancelEditing={handleStopEditing}
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <EditableText
                                            id="reasonsCol1ForkPara2"
                                            initialHtml={pageContent.reasonsCol1ForkPara2}
                                            onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                            className="font-mali text-sm text-black min-w-0 break-words"
                                            isCurrentlyEditing={currentlyEditingId === 'reasonsCol1ForkPara2'}
                                            onStartEditing={handleStartEditing}
                                            onCancelEditing={handleStopEditing}
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <EditableText
                                            id="reasonsCol1ForkPara3"
                                            initialHtml={pageContent.reasonsCol1ForkPara3}
                                            onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                            className="font-mali text-sm text-black min-w-0 break-words"
                                            isCurrentlyEditing={currentlyEditingId === 'reasonsCol1ForkPara3'}
                                            onStartEditing={handleStartEditing}
                                            onCancelEditing={handleStopEditing}
                                        />
                                    </ListItem>
                                </ul>
                            </div>
                        </div>
                        <div className="md:col-span-2 grid grid-cols-2 gap-2 transform scale-[0.95] md:scale-100">
                            {features.map((item) => (
                                <div key={item.idBase} className="rounded-2xl p-2 flex flex-col gap-2">
                                    <EditableImage id={item.iconKey}
                                                   initialSrc={pageContent[item.iconKey as keyof PageContent] as string}
                                                   altText={pageContent[item.titleKey as keyof PageContent] as string}
                                                   onFileSelect={handleImageUpload} isEditMode={isEditMode} width={400}
                                                   isUploading={isUploading && uploadingImageId === item.iconKey}
                                                   height={150} className="mx-auto"/>
                                    <EditableText id={item.titleKey}
                                                  initialHtml={pageContent[item.titleKey as keyof PageContent] as string}
                                                  onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                                  className="font-mali-medium font-bold text-xl" style={{color: item.ttColor}}
                                                  isCurrentlyEditing={currentlyEditingId === item.titleKey}
                                                  onStartEditing={handleStartEditing}
                                                  onCancelEditing={handleStopEditing}
                                    />
                                    <EditableText id={item.descKey}
                                                  initialHtml={pageContent[item.descKey as keyof PageContent] as string}
                                                  onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                                  className="font-mali text-xs text-black text-justify"
                                                  isCurrentlyEditing={currentlyEditingId === item.descKey}
                                                  onStartEditing={handleStartEditing}
                                                  onCancelEditing={handleStopEditing}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials & Footer Section */}
            <section className="w-full bg-[#FFF6C7] px-4 md:px-6 relative z-10 text-[#4D4D4D]">
                <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                       className="right-10 top-[6350px] lg:right-75 lg:top-[6100px]  z-99"/>
                <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12">
                    <div className="gap-0">
                        <div className="flex justify-end">
                        <Image src="/icons/icon_elephant3.png" alt="elephant decorative" width={100} height={70}
                                   className="right-10 -top-[20px] lg:right-150 lg:-top-[35px] z-99"/>
                        </div>
                        {/* TestimonialCarousel now receives editable content */}
                        <TestimonialCarousel testimonials={pageContent.testimonials} isEditMode={isEditMode}
                                             onSave={handleContentUpdate}
                                             onAddItem={() => handleAddItem('testimonials', newTestimonialTemplate)}
                                             onDeleteItem={(index) => handleDeleteItem('testimonials', index)}
                                             currentlyEditingId={currentlyEditingId}
                                             handleStartEditing={handleStartEditing}
                                             handleStopEditing={handleStopEditing}
                        />
                    </div>
                    <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                           className="absolute -left-5 top-[570px] z-99"/>

                    {isMobile ? (
                        <div className="flex flex-col gap-10 w-full">
                            <div className="space-y-1">
                                <EditableText id="footerSystemTitle" initialHtml={pageContent.footerSystemTitle}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="h3"
                                              className="font-mali-medium font-bold text-base"
                                              isCurrentlyEditing={currentlyEditingId === 'footerSystemTitle'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerSystemName" initialHtml={pageContent.footerSystemName}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali-medium font-semibold"
                                              isCurrentlyEditing={currentlyEditingId === 'footerSystemName'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerAddress1" initialHtml={pageContent.footerAddress1}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerAddress1'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerAddress2" initialHtml={pageContent.footerAddress2}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerAddress2'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerAddress3" initialHtml={pageContent.footerAddress3}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerAddress3'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerAddress4" initialHtml={pageContent.footerAddress4}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerAddress4'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerHotline" initialHtml={pageContent.footerHotline}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerHotline'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerEmail" initialHtml={pageContent.footerEmail}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerEmail'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerYoutubeName" initialHtml={pageContent.footerYoutubeName}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerYoutubeName'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                            </div>
                            <div className="flex flex-row flex-wrap gap-x-10 gap-y-4">
                                <div>
                                    <EditableText id="footerLinkTitle" initialHtml={pageContent.footerLinkTitle}
                                                  onSave={handleContentUpdate} isEditMode={isEditMode} tag="h3"
                                                  className="font-mali-medium font-bold text-sm mb-2"
                                                  isCurrentlyEditing={currentlyEditingId === 'footerLinkTitle'}
                                                  onStartEditing={handleStartEditing}
                                                  onCancelEditing={handleStopEditing}
                                    />
                                    <ul className="space-y-1 text-sm">
                                        {pageContent.footerLinks.map((link, index) => (
                                            <li key={index}>
                                                <EditableText id={`footerLink_${index}_text`}
                                                              initialHtml={link.text}
                                                              onSave={handleContentUpdate}
                                                              isEditMode={isEditMode} tag="a"
                                                              className="font-mali"
                                                              href={link.href}
                                                              isCurrentlyEditing={currentlyEditingId === `footerLink_${index}_text`}
                                                              onStartEditing={handleStartEditing}
                                                              onCancelEditing={handleStopEditing}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <EditableText id="footerSupportTitle" initialHtml={pageContent.footerSupportTitle}
                                                  onSave={handleContentUpdate} isEditMode={isEditMode} tag="h3"
                                                  className="font-mali-medium font-bold text-sm mb-2"
                                                  isCurrentlyEditing={currentlyEditingId === 'footerSupportTitle'}
                                                  onStartEditing={handleStartEditing}
                                                  onCancelEditing={handleStopEditing}
                                    />
                                    <ul className="space-y-1 text-sm">
                                        {pageContent.footerSupportLinks.map((link, index) => (
                                            <li key={index}>
                                                <EditableText id={`footerSupportLink_${index}_text`}
                                                              initialHtml={link.text}
                                                              onSave={handleContentUpdate}
                                                              isEditMode={isEditMode} tag="a"
                                                              className="font-mali"
                                                              href={link.href}
                                                              isCurrentlyEditing={currentlyEditingId === `footerSupportLink_${index}_text`}
                                                              onStartEditing={handleStartEditing}
                                                              onCancelEditing={handleStopEditing}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex justify-between items-start mt-4 w-full">
                                <div className="flex flex-col items-start space-y-4">
                                    <h3 className="font-mali-bold font-bold">FANPAGE</h3>

                                    <a href="https://www.youtube.com/watch?v=wR0SAVlV8xM" target="_blank"
                                       rel="noopener noreferrer">
                                        <EditableImage
                                            id="footerFanpageImageSrc"
                                            initialSrc={pageContent.footerFanpageImageSrc}
                                            altText="YouTube Thumbnail"
                                            onFileSelect={handleImageUpload}
                                            isUploading={isUploading && uploadingImageId === 'footerFanpageImageSrc'}
                                            isEditMode={isEditMode}
                                            width={145}
                                            height={80}
                                            className="rounded-lg"
                                        />
                                    </a>

                                    <h3 className="font-mali-bold font-bold">YOUTUBE</h3>

                                    <a href="https://www.youtube.com/watch?v=LKDxvXi21GI" target="_blank"
                                       rel="noopener noreferrer">
                                        <EditableImage
                                            id="footerYoutubeImageSrc"
                                            initialSrc={pageContent.footerYoutubeImageSrc}
                                            altText="YouTube Thumbnail"
                                            onFileSelect={handleImageUpload}
                                            isUploading={isUploading && uploadingImageId === 'footerYoutubeImageSrc'}
                                            isEditMode={isEditMode}
                                            width={145}
                                            height={80}
                                            className="rounded-lg"
                                        />
                                    </a>
                                </div>

                                <div
                                    className="flex items-start absolute -right-2 sm:top-auto sm:relative mt-4 sm:mt-0">
                                    <Image src="/icons/icon_elephant_footer.png" alt="" width={isMobile ? 190 : 300}
                                           height={isMobile ? 75 : 150} className="mt-4"/>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="w-full flex flex-col lg:flex-row justify-between items-start gap-10 text-sm relative">
                            <div className="space-y-1">
                                <EditableText id="footerSystemTitle" initialHtml={pageContent.footerSystemTitle}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="h3"
                                              className="font-mali-medium font-bold text-base"
                                              isCurrentlyEditing={currentlyEditingId === 'footerSystemTitle'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerSystemName" initialHtml={pageContent.footerSystemName}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali-medium font-semibold"
                                              isCurrentlyEditing={currentlyEditingId === 'footerSystemName'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerAddress1" initialHtml={pageContent.footerAddress1}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerAddress1'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerAddress2" initialHtml={pageContent.footerAddress2}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerAddress2'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerAddress3" initialHtml={pageContent.footerAddress3}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerAddress3'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerAddress4" initialHtml={pageContent.footerAddress4}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerAddress4'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerHotline" initialHtml={pageContent.footerHotline}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerHotline'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerEmail" initialHtml={pageContent.footerEmail}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerEmail'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <EditableText id="footerYoutubeName" initialHtml={pageContent.footerYoutubeName}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="p"
                                              className="font-mali"
                                              isCurrentlyEditing={currentlyEditingId === 'footerYoutubeName'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <div className="flex flex-wrap sm:flex-nowrap gap-6 mt-4">
                                    <div className="flex flex-col items-start">
                                        <h3 className="font-mali-bold font-bold">FANPAGE</h3>
                                        <a href="https://www.youtube.com/watch?v=wR0SAVlV8xM" target="_blank"
                                           rel="noopener noreferrer">
                                            <EditableImage id="footerFanpageImageSrc"
                                                           initialSrc={pageContent.footerFanpageImageSrc}
                                                           altText="YouTube Thumbnail" onFileSelect={handleImageUpload}
                                                           isUploading={isUploading && uploadingImageId === 'footerFanpageImageSrc'}
                                                           isEditMode={isEditMode} width={180} height={100}
                                                           className="rounded-lg mt-2"/>
                                        </a>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h3 className="font-mali-bold font-bold">YOUTUBE</h3>
                                        <a href="https://www.youtube.com/watch?v=LKDxvXi21GI" target="_blank"
                                           rel="noopener noreferrer">
                                            <EditableImage id="footerYoutubeImageSrc"
                                                           initialSrc={pageContent.footerYoutubeImageSrc}
                                                           altText="YouTube Thumbnail" onFileSelect={handleImageUpload}
                                                           isUploading={isUploading && uploadingImageId === 'footerYoutubeImageSrc'}
                                                           isEditMode={isEditMode} width={180} height={100}
                                                           className="rounded-lg mt-2"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <EditableText id="footerLinkTitle" initialHtml={pageContent.footerLinkTitle}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="h3"
                                              className="font-mali-medium font-bold text-base mb-2"
                                              isCurrentlyEditing={currentlyEditingId === 'footerLinkTitle'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <ul className="space-y-1">
                                    {pageContent.footerLinks.map((link, index) => (
                                        <li key={index}>
                                            <EditableText id={`footerLink_${index}_text`}
                                                          initialHtml={link.text}
                                                          onSave={handleContentUpdate}
                                                          className="font-mali"
                                                          isEditMode={isEditMode} tag="a" href={link.href}
                                                          isCurrentlyEditing={currentlyEditingId === `footerLink_${index}_text`}
                                                          onStartEditing={handleStartEditing}
                                                          onCancelEditing={handleStopEditing}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <EditableText id="footerSupportTitle" initialHtml={pageContent.footerSupportTitle}
                                              onSave={handleContentUpdate} isEditMode={isEditMode} tag="h3"
                                              className="font-mali-medium font-bold text-base mb-2"
                                              isCurrentlyEditing={currentlyEditingId === 'footerSupportTitle'}
                                              onStartEditing={handleStartEditing}
                                              onCancelEditing={handleStopEditing}
                                />
                                <ul className="space-y-1">
                                    {pageContent.footerSupportLinks.map((link, index) => (
                                        <li key={index}>
                                            <EditableText id={`footerSupportLink_${index}_text`}
                                                          initialHtml={link.text}
                                                          onSave={handleContentUpdate}
                                                          className="font-mali"
                                                          isEditMode={isEditMode} tag="a" href={link.href}
                                                          isCurrentlyEditing={currentlyEditingId === `footerSupportLink_${index}_text`}
                                                          onStartEditing={handleStartEditing}
                                                          onCancelEditing={handleStopEditing}
                                            />
                                        </li>
                                    ))}
                                    <Image src="/icons/icon_elephant_footer.png" alt="" width={isMobile ? 150 : 300}
                                           height={isMobile ? 75 : 150}
                                           className="absolute right-0 bottom-0 lg:right-[100px] lg:top-auto z-0"/>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Decorative icons */}
            <Image src="/banner/icon_cloud.png" alt="" width={100} height={70}
                   className="absolute left-[5%] top-[50vh] -z-10"/>
            <Image src="/banner/icon_cloud.png" alt="" width={100} height={50}
                   className="absolute left-1/3 translate-x-[80px] top-[45vh] -z-10"/>
            <Image src="/banner/icon_star_empty.png" alt="" width={60} height={70}
                   className="absolute left-1/3 top-[40vh] -z-10"/>

            {showModal && <RegisterClassModal onClose={closeModal}/>}
            {showScrollToTop && (
                <button onClick={scrollToTop}
                        className="fixed bottom-6 right-6 z-[9998] bg-[#FFC107] hover:bg-[#ffb300] text-white p-3 rounded-full shadow-lg transition-opacity duration-300"
                        aria-label="Scroll to top">
                    <FaArrowUp size={20}/>
                </button>
            )}
        </div>
    );
}