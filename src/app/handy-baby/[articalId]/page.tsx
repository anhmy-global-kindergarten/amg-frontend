'use client';
/* eslint-disable */
import Image from "next/image";
import Link from "next/link";
import {notFound, useParams} from "next/navigation";
import React, { useState } from "react";
import {Menu} from "@headlessui/react";
import {MoreVertical} from "lucide-react";
import {usePostById} from "@/app/hooks/usePostById";
import {useAuth} from "@/app/hooks/useAuth";
import formatDateDisplay from "@/app/utils/formatDate";
import RenderHTMLContent from "@/app/utils/getContent";

export default function HandyBabyDetail() {
    const params = useParams();
    const articalId = params?.articalId as string;

    const { post, images, loading, error } = usePostById(articalId);
    const { name, role } = useAuth();

    const [comments, setComments] = useState([
        {
            name: "Nguyễn Văn A",
            email: "vana@example.com",
            content: "Một sự kiện hay!",
        },
        {
            name: "Trần Thị B",
            email: "thib@example.com",
            content: "Cảm ơn các cô vì những sự kiện tuyệt vời!",
        },
    ]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        content: "",
    });
    // const articals = [
    //     {
    //         id: "1",
    //         title: "Chuyến tàu hoả số học",
    //         date: "27/06/2022",
    //         author: "admin",
    //         content: `“Chơi mà học” về các con số và nhận biết phương tiện tàu hoả cùng AMG Crafts Chúc ba mẹ và các con có những phút giây vui vẻ bên nhau nhé!`,
    //         imageHeader: "/events/event1.png",
    //         image1: "/events/event1.png",
    //         image2: "/events/event2.png",
    //         image3: "/events/event3.png",
    //         image4: "/events/event4.png",
    //         image5: "",
    //         youtubeURL: "https://www.youtube.com/watch?v=5mQTXgcU4C4&ab_channel=TinhHoaNh%E1%BA%A1cVi%E1%BB%87t",
    //     },
    //     {
    //         id: "2",
    //         title: "Chiếc chong chóng từ cốc giấy",
    //         date: "27/06/2022",
    //         author: "admin",
    //         content: `Trong bối cảnh dịch bệnh đầy thử thách, AMG mong muốn lan tỏa tinh thần tích cực và yêu thương qua cuộc thi ảnh đầy cảm xúc: “BABY, NEW VERSION”. Đây là sân chơi để các gia đình lưu giữ khoảnh khắc đáng yêu của các bé trong thời gian ở nhà. [highlight]Mỗi nụ cười, ánh mắt ngây thơ hay hành động hồn nhiên của bé[/highlight] đều có thể trở thành điều kỳ diệu chạm đến trái tim mọi người. Tham gia cuộc thi, bạn không chỉ lưu lại những ký ức đẹp mà còn có cơ hội [highlight]nhận được những phần quà hấp dẫn từ AMG[/highlight]. Đừng bỏ lỡ cơ hội để bé yêu của bạn tỏa sáng!`,
    //         imageHeader: "/events/event1.png",
    //         image1: "/events/event1.png",
    //         image2: "/events/event2.png",
    //         image3: "/events/event3.png",
    //         image4: "/events/event4.png",
    //         image5: "",
    //         youtubeURL: "https://www.youtube.com/watch?v=5mQTXgcU4C4&ab_channel=TinhHoaNh%E1%BA%A1cVi%E1%BB%87t",
    //     },
    //     {
    //         id: "3",
    //         title: "Chiếc bình số học",
    //         date: "27/06/2022",
    //         author: "admin",
    //         content: `Trong bối cảnh dịch bệnh đầy thử thách, AMG mong muốn lan tỏa tinh thần tích cực và yêu thương qua cuộc thi ảnh đầy cảm xúc: “BABY, NEW VERSION”. Đây là sân chơi để các gia đình lưu giữ khoảnh khắc đáng yêu của các bé trong thời gian ở nhà. [highlight]Mỗi nụ cười, ánh mắt ngây thơ hay hành động hồn nhiên của bé[/highlight] đều có thể trở thành điều kỳ diệu chạm đến trái tim mọi người. Tham gia cuộc thi, bạn không chỉ lưu lại những ký ức đẹp mà còn có cơ hội [highlight]nhận được những phần quà hấp dẫn từ AMG[/highlight]. Đừng bỏ lỡ cơ hội để bé yêu của bạn tỏa sáng!`,
    //         imageHeader: "/events/event1.png",
    //         image1: "/events/event1.png",
    //         image2: "/events/event2.png",
    //         image3: "/events/event3.png",
    //         image4: "/events/event4.png",
    //         image5: "",
    //         youtubeURL: "",
    //     },
    //     {
    //         id: "4",
    //         title: "Khám phá hệ mặt trời",
    //         date: "27/06/2022",
    //         author: "admin",
    //         content: `Trong bối cảnh dịch bệnh đầy thử thách, AMG mong muốn lan tỏa tinh thần tích cực và yêu thương qua cuộc thi ảnh đầy cảm xúc: “BABY, NEW VERSION”. Đây là sân chơi để các gia đình lưu giữ khoảnh khắc đáng yêu của các bé trong thời gian ở nhà. [highlight]Mỗi nụ cười, ánh mắt ngây thơ hay hành động hồn nhiên của bé[/highlight] đều có thể trở thành điều kỳ diệu chạm đến trái tim mọi người. Tham gia cuộc thi, bạn không chỉ lưu lại những ký ức đẹp mà còn có cơ hội [highlight]nhận được những phần quà hấp dẫn từ AMG[/highlight]. Đừng bỏ lỡ cơ hội để bé yêu của bạn tỏa sáng!`,
    //         imageHeader: "/events/event1.png",
    //         image1: "/events/event1.png",
    //         image2: "/events/event2.png",
    //         image3: "/events/event3.png",
    //         image4: "/events/event4.png",
    //         image5: "",
    //         youtubeURL: "",
    //     },
    //     {
    //         id: "5",
    //         title: "Quá trình phát triển của thực vật",
    //         date: "27/06/2022",
    //         author: "admin",
    //         content: `Trong bối cảnh dịch bệnh đầy thử thách, AMG mong muốn lan tỏa tinh thần tích cực và yêu thương qua cuộc thi ảnh đầy cảm xúc: “BABY, NEW VERSION”. Đây là sân chơi để các gia đình lưu giữ khoảnh khắc đáng yêu của các bé trong thời gian ở nhà. [highlight]Mỗi nụ cười, ánh mắt ngây thơ hay hành động hồn nhiên của bé[/highlight] đều có thể trở thành điều kỳ diệu chạm đến trái tim mọi người. Tham gia cuộc thi, bạn không chỉ lưu lại những ký ức đẹp mà còn có cơ hội [highlight]nhận được những phần quà hấp dẫn từ AMG[/highlight]. Đừng bỏ lỡ cơ hội để bé yêu của bạn tỏa sáng!`,
    //         imageHeader: "/events/event1.png",
    //         image1: "/events/event1.png",
    //         image2: "/events/event2.png",
    //         image3: "/events/event3.png",
    //         image4: "/events/event4.png",
    //         image5: "",
    //         youtubeURL: "",
    //     },
    //     {
    //         id: "6",
    //         title: "Học làm phương tiện giao thông",
    //         date: "27/06/2022",
    //         author: "admin",
    //         content: `Trong bối cảnh dịch bệnh đầy thử thách, AMG mong muốn lan tỏa tinh thần tích cực và yêu thương qua cuộc thi ảnh đầy cảm xúc: “BABY, NEW VERSION”. Đây là sân chơi để các gia đình lưu giữ khoảnh khắc đáng yêu của các bé trong thời gian ở nhà. [highlight]Mỗi nụ cười, ánh mắt ngây thơ hay hành động hồn nhiên của bé[/highlight] đều có thể trở thành điều kỳ diệu chạm đến trái tim mọi người. Tham gia cuộc thi, bạn không chỉ lưu lại những ký ức đẹp mà còn có cơ hội [highlight]nhận được những phần quà hấp dẫn từ AMG[/highlight]. Đừng bỏ lỡ cơ hội để bé yêu của bạn tỏa sáng!`,
    //         imageHeader: "/events/event1.png",
    //         image1: "/events/event1.png",
    //         image2: "/events/event2.png",
    //         image3: "/events/event3.png",
    //         image4: "/events/event4.png",
    //         image5: "",
    //         youtubeURL: "https://www.youtube.com/watch?v=5mQTXgcU4C4&ab_channel=TinhHoaNh%E1%BA%A1cVi%E1%BB%87t",
    //     },
    // ];
    if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
    if (error && !post) {
        return <p className="text-center text-red-500">Đã xảy ra lỗi khi tải sổ tay.</p>;
    }

    if (!post) {
        return notFound();
    }
    const { day, month } = formatDateDisplay(post.create_at);
    return (
        <div className="relative min-h-screen bg-white p-4 md:p-8 flex flex-col items-center overflow-hidden">
            {/* Background */}
            <Image
                src="/decorations/decor_bg.png"
                alt="Decor Background"
                fill
                className="object-cover opacity-100 pointer-events-none z-0"
                priority
            />

            <div className="relative w-full max-w-5xl z-10 flex flex-col items-center">
                {/* Breadcrumb */}
                <div className="w-full mb-6 text-sm text-gray-600">
                    <div className="flex flex-wrap items-center space-x-2">
                        <Link
                            href="/"
                            className="font-semibold text-black hover:underline"
                        >
                            Trang chủ
                        </Link>
                        <span>/</span>
                        <Link
                            href="/handy-baby"
                            className="font-medium text-[#FFC107] hover:underline"
                        >
                            Bé khéo tay
                        </Link>
                        <span>/</span>
                        <span className="text-[#FFC107] font-medium">
                            {post.title}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-[#FFD668] text-xl md:text-2xl text-center mt-8 uppercase">
                    Bé khéo tay
                </h3>
                <Image
                    src={post.header_image}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="rounded-lg shadow mb-6"
                />
                <div className="w-full p-6 md:p-12 relative">
                    <div className="max-w-4xl mx-auto">
                        <p className="absolute top-5 left-30 text-sm text-black mb-2">Đăng bởi: {post.author}</p>
                        <h1 className="absolute top-12 left-30 text-[#FFC107] text-xl font-bold uppercase">{post.title}</h1>
                        {(role === "admin" || role === "teacher") && (
                            <div className="absolute top-4 right-4">
                                <Menu>
                                    <Menu.Button className="p-2 rounded-full hover:bg-[#FFF9E5]">
                                        <MoreVertical className="w-5 h-5 text-[#FFC107]" />
                                    </Menu.Button>
                                    <Menu.Items
                                        className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-30">
                                        <Menu.Item>
                                            {({active}) => (
                                                <Link
                                                    href={`/post/edit/${post.id}`}
                                                    className={`block px-4 py-2 text-sm ${
                                                        active ? 'bg-[#FFF9E5] text-[#FFC107]' : 'text-gray-700'
                                                    }`}
                                                >
                                                    Chỉnh sửa
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            </div>
                        )}
                        <div
                            className="w-[70px] h-[70px] bg-[#FFD668] absolute top-5 left-7 rounded-xl flex items-center justify-center shadow-md">
                            <div
                                className="bg-[#FDCED0] w-[50px] h-[50px] rounded flex flex-col items-center justify-center">
                                <span className="text-white text-2xl font-bold leading-none">{day}</span>
                                <span className="text-white text-xs leading-none">Tháng {month}</span>
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="text-[15px] leading-loose text-gray-800 whitespace-pre-line pt-40">
                            <span className="bg-[#FDCED0]">
                                <RenderHTMLContent content={post.content} images={images} />
                            </span>
                        </div>

                        <div className="w-full max-w-4xl mt-12 px-4 md:px-0">
                            <h4 className="text-xl font-bold text-[#FFB300] mb-6">Bình luận</h4>

                            {comments.length === 0 && (
                                <p className="text-gray-500 italic">Chưa có bình luận nào.</p>
                            )}

                            {comments.map((cmt, index) => (
                                <div
                                    key={index}
                                    className="mb-6 bg-[#FFF9E5] p-5 rounded-xl shadow-md border border-[#FFE082] hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-base font-semibold text-[#795548]">{cmt.name}</p>
                                        <p className="text-sm text-[#A1887F] italic">{cmt.email}</p>
                                    </div>
                                    <p className="text-gray-800 text-sm leading-relaxed">{cmt.content}</p>
                                </div>
                            ))}
                        </div>

                        <div className="w-full max-w-4xl mt-8 px-4 md:px-0">
                            <h4 className="text-[#FFC107] mb-4">Viết bình luận của bạn:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Họ và tên"
                                    className="rounded-full border px-4 py-2 text-black"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="rounded-full border px-4 py-2 text-black"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <textarea
                                placeholder="Viết bình luận"
                                className="w-full mt-4 border rounded-2xl px-4 py-2 text-black"
                                rows={4}
                                value={formData.content}
                                onChange={(e) => setFormData({...formData, content: e.target.value})}
                            ></textarea>
                            <img
                                src="/buttons/btn_comment.png"
                                alt="Gửi bình luận"
                                className="mt-4 w-40 cursor-pointer"
                                onClick={() => {
                                    if (!formData.name || !formData.email || !formData.content) return;
                                    setComments([...comments, formData]);
                                    setFormData({name: "", email: "", content: ""});
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Icons */}
            <Image
                src="/icons/icon_elephant_star.png"
                alt="Elephant Star"
                width={120}
                height={120}
                className="absolute right-10 top-10 z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={60}
                height={60}
                className="absolute right-5 top-40 z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={40}
                height={40}
                className="absolute right-[150px] top-[70px] z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={60}
                height={60}
                className="absolute left-5 top-40 z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={60}
                height={60}
                className="absolute left-10 top-[350px] z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={40}
                height={40}
                className="absolute right-[125px] top-[150px] z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={60}
                height={60}
                className="absolute left-[260px] top-[280px] z-9 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={50}
                height={50}
                className="absolute right-1/2 bottom-[58px] z-9 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={45}
                height={45}
                className="absolute left-[144px] bottom-[20px] z-10 hidden md:block"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={55}
                height={55}
                className="absolute right-24 bottom-[10px] z-10 hidden md:block"
            />
        </div>
    );
}
