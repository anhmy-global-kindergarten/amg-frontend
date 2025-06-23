'use client';
/* eslint-disable */
import Image from "next/image";
import ClassGallery from '@/components/ClassGallery';
import TestimonialCarousel from "@/components/TestimonialCarousel";
import HeaderMenu from "@/components/HeaderMenu";
import RegisterClassModal from "@/modals/RegisterClassModal";
import {useCallback, useEffect, useState} from 'react';
import { FaArrowUp } from "react-icons/fa";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
    DroppableProvided,
    DraggableProvided
} from 'react-beautiful-dnd';
import MealGallerySection from '@/components/landingPageBlocks/MealGallerySection';
import WhyParentsTrustSection from '@/components/landingPageBlocks/WhyParentsTrustSection';
import TestimonialAndFooterSection from '@/components/landingPageBlocks/TestimonialAndFooterSection';
import BannerSection from "@/components/landingPageBlocks/BannerSection";
import PhotoGallerySection from "@/components/landingPageBlocks/PhotoGallerySection";
import AboutAmgSection from "@/components/landingPageBlocks/AboutAmgSection";
interface LandingPageBlock {
    id: string; // ID duy nhất cho kéo thả
    type: 'banner' | 'photoGallery' | 'aboutAmg' | 'mealGallery' | 'whyParentsTrust' | 'testimonialFooter';
    data: any; // Dữ liệu cụ thể cho khối này (ví dụ: title, images, text)
}

const initialBlocksData: LandingPageBlock[] = [
    {
        id: 'block-banner-1',
        type: 'banner',
        data: {
            titleLine1: "Đăng Ký Ngay",
            titleLine2: "Ưu Đãi Hấp Dẫn",
            yearText: "Năm học 2024-2025",
            descriptionMobileLine1: "Mầm non ABC",
            descriptionMobileLine2: "Chất lượng hàng đầu",
            descriptionMobileLine3: "Môi trường thân thiện",
            descriptionDesktopLine1: "Nơi Ươm Mầm Tài Năng Việt",
            descriptionDesktopLine2: "Cho một tương lai tươi sáng",
            buttonImageUrl: "/banner/button_register_default.png",
            kidsImageUrl: "/banner/banner_kids_default.png",
            triangleImageUrl: "/banner/triangle_default.png"
        }
    },
    {
        id: 'block-photoGallery-1',
        type: 'photoGallery',
        data: { /* ... dữ liệu photo gallery ... */ }
    },
    {
        id: 'block-aboutAmg-1',
        type: 'aboutAmg',
        data: { /* ... dữ liệu about amg đầy đủ, bao gồm cả introHtml sạch ... */ }
    },
    {
        id: 'block-mealGallery-1',
        type: 'mealGallery',
        data: {
            title: "BỮA ĂN CỦA CON",
            imagesCol1: ["meal1", "meal2", "meal3"],
            imagesCol2: ["meal4", "meal5"],
            imagesCol3: ["meal6", "meal7", "meal8"]
        }
    },
    {
        id: 'block-whyParentsTrust-1',
        type: 'whyParentsTrust',
        data: {
            mainTitleLine1: "ĐIỀU GÌ KHIẾN PHỤ HUYNH TIN TƯỞNG",
            mainTitleLine2: "AMG?",
            decorElephantUrl: "/icons/icon_elephant2.png",
            leftColumn: {
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
            },
            featureBoxes: [
                { title: "Môi trường học tập lý tưởng", ttColor: "#7ED3F7", desc: "Hệ thống phòng học đầy đủ ánh sáng tự nhiên, trang bị đầy đủ cơ sở vật chất hạ tầng hiện đại, an toàn. Nguồn thực phẩm an toàn được phục vụ trong tất cả các bữa ăn của cả cô và trò, mang lại một môi trường hạnh phúc, thân thiện, an toàn.", bg: "bg-[#A4D9F3]", icon: "/icons/icon_environment.png" },
                { title: "Chương trình giáo dục thể chất quốc tế", ttColor: "#BFD730", desc: "AMG Kindergarten có hệ thống phòng Gym chuyên dụng, an toàn dành cho trẻ cùng giáo viên chuyên môn cao trong lĩnh vực giáo dục thể chất cho trẻ em. Bể bơi, bể float, bể cát động lực, sân chơi riêng biệt mang đến cho các con một môi trường hoạt động thể chất trọn vẹn nhất.", bg: "bg-[#FBE27D]", icon: "/icons/icon_sport.png" },
                { title: "Chương trình ngoại khóa phong phú", ttColor: "#FFD668", desc: "Tại AMG Kindergarten trẻ được tham gia nhiều hoạt động ngoại khóa đa dạng hàng tuần, hàng tháng, giúp trẻ có những trải nghiệm thực tế thú vị, phong phú, hỗ trợ hiệu quả phát triển các kỹ năng sống cũng như bồi đắp những giá trị cốt lõi.", bg: "bg-[#B0E59E]", icon: "/icons/icon_culture.png" },
                { title: "Chương trình tiếng Anh chuẩn quốc tế", ttColor: "#F6ADCD", desc: "Ở AMG Kindergarten, trẻ được học và tiếp cận tiếng Anh một cách tự nhiên qua các hoạt động vui chơi, học tập hàng ngày. Giáo viên người bản ngữ luôn tạo một không khí vui vẻ, thoải mái giúp trẻ yêu Tiếng Anh ngay từ nhỏ.", bg: "bg-[#F2B5F9]", icon: "/icons/icon_english.png" },
            ]
        }
    },
    {
        id: 'block-testimonialFooter-1',
        type: 'testimonialFooter',
        data: {
            // testimonialsData sẽ được quản lý bởi TestimonialCarousel,
            // nhưng bạn có thể truyền vào nếu muốn tùy chỉnh từ DB
            decorCloudUrl1: "/banner/icon_cloud.png", // Vị trí có thể cần điều chỉnh
            decorElephantUrl1: "/icons/icon_elephant3.png",
            decorCloudUrl2: "/banner/icon_cloud.png",
            systemInfo: { /* ... thông tin hệ thống ... */ },
            fanpageThumbnailUrl: "https://img.youtube.com/vi/wR0SAVlV8xM/hqdefault.jpg",
            fanpageLink: "https://www.facebook.com/yourfanpage", // Đổi link
            youtubeThumbnailUrl: "https://img.youtube.com/vi/LKDxvXi21GI/hqdefault.jpg",
            youtubeLink: "https://www.youtube.com/yourchannel", // Đổi link
            linkColumns: [
                { title: "LIÊN KẾT", items: [ {text:"Trang chủ", href:"/"}, /* ... */ ] },
                { title: "HỖ TRỢ", items: [ {text:"Trang chủ", href:"/"}, /* ... */ ] }
            ],
            decorElephantFooterUrl: "/icons/icon_elephant_footer.png"
        }
    },
];

export default function LandingPage() {
    const [isClient, setIsClient] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        setPageBlocks(initialBlocksData);

        const handleScroll = () => setShowScrollToTop(window.scrollY > 300);
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);

        checkMobile();
        window.addEventListener("scroll", handleScroll);
        window.addEventListener('resize', checkMobile);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);
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

    const [isEditMode, setIsEditMode] = useState(false);
    const [pageBlocks, setPageBlocks] = useState<LandingPageBlock[]>(initialBlocksData); // Dùng dữ liệu ban đầu

    // Fetch và Save Layout (TODO: Triển khai API)
    useEffect(() => {
        const loadLayout = async () => {
            // setLoading(true); // Thêm state loading nếu cần
            try {
                // const response = await fetch('/api/get-landing-layout'); // API của bạn
                // if (response.ok) {
                //     const savedBlocks = await response.json();
                //     if (savedBlocks && savedBlocks.length > 0) {
                //         setPageBlocks(savedBlocks);
                //     } else {
                //         setPageBlocks(initialBlocksData);
                //     }
                // } else {
                //     setPageBlocks(initialBlocksData); // Fallback
                // }
                console.log("Chế độ xem: Sử dụng layout mặc định hoặc đã fetch (nếu có)");
                // Hiện tại, luôn dùng initialBlocksData khi không ở edit mode,
                // hoặc bạn có thể fetch layout public ở đây.
                if (!isEditMode) setPageBlocks(initialBlocksData);


            } catch (error) {
                console.error("Error loading layout:", error);
                setPageBlocks(initialBlocksData); // Fallback
            }
            // setLoading(false);
        };

        const loadUserLayout = async () => {
            // Logic fetch layout CỦA USER nếu họ đã từng lưu
            console.log("Edit mode: TODO - Fetch layout đã lưu của user");
            // Giả sử chưa có, vẫn dùng initial
            setPageBlocks(initialBlocksData);
        }

        if (isEditMode) {
            loadUserLayout();
        } else {
            loadLayout();
        }
    }, [isEditMode]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination || !isEditMode) return;
        const items = Array.from(pageBlocks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setPageBlocks(items);
    };

    const EditControls = () => (
        (isAuthenticated && (role === "admin" || role === "teacher")) && (
            <div className="fixed top-16 right-4 flex flex-col gap-2 z-[10001]">
                <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`px-4 py-2 rounded shadow-lg text-white font-semibold
                        ${isEditMode ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'}`}
                >
                    {isEditMode ? 'Tắt Chỉnh Sửa' : 'Bật Chỉnh Sửa'}
                </button>
                {isEditMode && (
                    <button
                        onClick={async () => {
                            console.log("Đang lưu layout:", pageBlocks);
                            // TODO: Gọi API để lưu pageBlocks
                            // await fetch('/api/save-landing-layout', { method: 'POST', body: JSON.stringify(pageBlocks) });
                            alert("Layout đã được lưu (giả lập)!");
                            setIsEditMode(false);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-lg"
                    >
                        Lưu Layout
                    </button>
                )}
            </div>
        )
    );

    // Hàm render các khối
    const renderBlock = useCallback((block: LandingPageBlock, index: number) => {
        // Truyền thêm props isEditMode và hàm để cập nhật data của block nếu cần
        const blockProps = {
            key: block.id,
            isMobile,
            data: block.data,
            // Ví dụ: onUpdateData: (newData) => handleUpdateBlockData(block.id, newData)
        };

        const commonProps = { // Đổi tên để tránh nhầm lẫn
            isMobile,
            data: block.data,
        };

        switch (block.type) {
            case 'banner':
                return <BannerSection {...commonProps} openModal={openModal} />;
            case 'photoGallery':
                return <PhotoGallerySection {...commonProps} />;
            case 'aboutAmg':
                return <AboutAmgSection {...commonProps} />;
            case 'mealGallery':
                // @ts-ignore
                return <MealGallerySection {...commonProps} />;
            case 'whyParentsTrust':
                // @ts-ignore
                return <WhyParentsTrustSection {...commonProps} />;
            case 'testimonialFooter':
                // @ts-ignore
                return <TestimonialAndFooterSection {...commonProps} />;
            default:
                console.warn("Unknown block type:", block.type);
                return <div key={block.id} className="p-4 border border-dashed border-red-500">Unknown Block: {block.type}</div>;
        }
    }, [isMobile, openModal]);


    if (!isClient) {
        return null;
    }

    return (
        <div className="w-full min-h-screen bg-[#FFF6C7] overflow-hidden relative font-sans text-[#4D4D4D]">
            {/* Top Navbar */}
            <EditControls />
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
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="landingPageDroppable" isDropDisabled={!isEditMode} isCombineEnabled={!isEditMode} ignoreContainerClipping={false}>
                    {(provided: DroppableProvided, snapshotDroppable) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col">
                            {pageBlocks.map((block, index) => (
                                <Draggable key={block.id} draggableId={block.id} index={index} isDragDisabled={!isEditMode}>
                                    {(providedDraggable: DraggableProvided, snapshot) => (
                                        <div
                                            ref={providedDraggable.innerRef}
                                            {...providedDraggable.draggableProps}
                                            style={{
                                                ...providedDraggable.draggableProps.style,
                                                // Thêm style khi kéo nếu muốn
                                            }}
                                            className={`
                                                ${isEditMode ? 'my-1 border-2 border-dashed hover:border-blue-400 relative' : ''}
                                                ${snapshot.isDragging ? 'shadow-2xl border-blue-500' : ''}
                                            `}
                                        >
                                            {isEditMode && (
                                                <>
                                                    <div
                                                        {...providedDraggable.dragHandleProps}
                                                        className="absolute top-1 left-1 bg-gray-700 text-white text-xs px-2 py-0.5 rounded cursor-grab z-50"
                                                        title={`Kéo để di chuyển khối ${block.type}`}
                                                    >
                                                        ✥ Kéo
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            // TODO: Mở modal/form để sửa data của block này
                                                            // Ví dụ: truyền block.id, block.type, block.data vào một modal editor
                                                            alert(`Chỉnh sửa nội dung khối: ${block.type} (ID: ${block.id})`);
                                                            console.log("Current block data:", block.data);
                                                        }}
                                                        className="absolute top-1 right-1 bg-yellow-500 text-black text-xs px-2 py-0.5 rounded z-50 hover:bg-yellow-600"
                                                    >
                                                        Sửa
                                                    </button>
                                                </>
                                            )}
                                            {renderBlock(block, index)}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

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
