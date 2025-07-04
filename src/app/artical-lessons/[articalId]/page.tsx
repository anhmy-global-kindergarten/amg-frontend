'use client';
/* eslint-disable */
import Image from "next/image";
import Link from "next/link";
import {notFound, useParams} from "next/navigation";
import React, {use, useEffect} from "react";
import { useState } from "react";
import {Menu} from "@headlessui/react";
import {MoreVertical} from "lucide-react";
import {Post, usePostById} from "@/app/hooks/usePostById";
import RenderHTMLContent from "@/app/utils/getContent";
import formatDateDisplay from "@/app/utils/formatDate";
import {useAuth} from "@/app/hooks/useAuth";
import {deletePost} from "@/app/utils/deletePost";
import {CreateCommentPayload} from "@/app/utils/comment";
import {usePostComments} from "@/app/hooks/useComment";
import CommentItem from "@/components/CommentItem";

export default function LessonDetail() {
    const params = useParams();
    const articalId = params?.articalId as string;

    const { post, images, loading, error } = usePostById(articalId);
    const { name: loggedInUserName, role, id: userId } = useAuth();
    const {
        comments,
        loading: commentsLoading,
        error: commentsError,
        createComment,
        deleteComment,
        updateComment,
    } = usePostComments(articalId);

    const [commentAuthor, setCommentAuthor] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        if (loggedInUserName) {
            setCommentAuthor(loggedInUserName);
        }
    }, [loggedInUserName]);

    const handleCommentSubmit = async () => {
        if (!userId?.trim()) {
            alert("Vui lòng đăng nhập để gửi bình luận.");
            return;
        }

        if (!commentAuthor.trim() || !commentContent.trim()) {
            alert("Vui lòng nhập tên và nội dung bình luận.");
            return;
        }

        setIsSubmitting(true);

        const payload: CreateCommentPayload = {
            postId: articalId,
            authorId: userId,
            authorName: commentAuthor,
            content: commentContent,
        };

        const success = await createComment(payload);

        if (success) {
            setCommentContent("");
            if (!loggedInUserName) {
                setCommentAuthor("");
            }
        } else {
            alert("Gửi bình luận thất bại. Vui lòng thử lại.");
        }

        setIsSubmitting(false);
    };

    const handleCommentDelete = async (commentId: string) => {
        if (window.confirm("Bạn có chắc muốn xóa bình luận này?")) {
            await deleteComment(commentId);
        }
    };

//     const lessons = [
//         {
//             id: "1",
//             title: "Chiếc bể bơi chứa đầy nước và niềm vui",
//             date: "27/06/2022",
//             author: "admin",
//             content: `Mùa hè lại đến rồi và chắc hẳn 1 trong những hoạt động các bạn nhỏ yêu thích nhất trong những ngày hè oi ả chính là bơi lội. Vì vậy,[highlight] những bể bơi di động đã được các cô chuẩn bị ngay ở sân sau của cơ sở 1[/highlight] để các con thỏa sức chơi đùa với nước
// AMG hiểu rằng vận động thể chất trong đó có các hoạt động với nước là những hoạt động cực kỳ quan trọng và tạo hứng thú lớn với con trẻ, vậy nên thầy giáo thể chất chuyên biệt của AMG luôn sẵn sàng tạo ra[highlight] những tiết học thú vị, an toàn, đúng quy cách và thật tự nhiên cho con trẻ[/highlight], với mong muốn con trẻ sẽ có những trải nghiệm vui và bổ ích nhất tại AMG
// Có những bạn nhỏ rất thích nước nhưng cũng có những bạn lại hơi rụt rè. Các hoạt động dưới nước như tập nín thở, sải cánh tay hay đạp nước… dần dần giúp các con làm quen với nước, khắc phục sự nhút nhát ban đầu để trở nên dạn dĩ và tận hưởng thêm nhiều niềm vui
// Tại AMG mỗi tiết học với nước của các con được diễn ra đều[highlight] đầy ắp tiếng cười và màu sắc[/highlight]. AMG lựa chọn một chiếc bể bơi không góc cạnh để làm cho tiết bơi của các con được an toàn và êm ái hơn... Những màu sắc sặc sỡ từ những bộ đồ bơi đáng yêu hay những chiếc phao bơi cùng bóng hơi đầy xinh động kèm theo đó là tiếng cười rộn ràng của con trẻ đã tạo nên những tiết bơi rất đặc trưng AMG. `,
//             imageHeader: "/lessons/lesson1.png",
//             image1: "/lessons/lesson1.png",
//             image2: "/lessons/lesson1.png",
//             image3: "/lessons/lesson1.png",
//             image4: "/lessons/lesson1.png",
//             image5: "",
//         },
//     ];
    if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
    if (error && !post) {
        return <p className="text-center text-red-500">Đã xảy ra lỗi khi tải bài học.</p>;
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
                            href="/artical-lessons"
                            className="font-medium text-[#FFC107] hover:underline"
                        >
                            Tiết học của con
                        </Link>
                        <span>/</span>
                        <span className="text-[#FFC107] font-medium">
                            {post.title}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="font-mali-bold text-[#FFD668] text-xl md:text-2xl text-center mt-8 uppercase">
                    Tiết học của con
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
                        <p className="font-mali absolute top-10 left-30 text-sm text-black mb-2">Đăng bởi: {post.author}</p>
                        <h1 className="font-mali-bold absolute top-15 left-30 text-[#FFC107] text-xl font-bold uppercase mb-2">{post.title}</h1>
                        {(role === "admin" || role === "teacher") && (
                            <div className="absolute top-4 right-4">
                                <Menu>
                                    <Menu.Button className="p-2 rounded-full hover:bg-[#FFF9E5]">
                                        <MoreVertical className="w-5 h-5 text-[#FFC107]" />
                                    </Menu.Button>
                                    <Menu.Items
                                        className="font-mali-semibold absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-30">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href={`/post/edit/${post.id}`}
                                                    className={`block w-full px-4 py-2 text-sm text-left ${
                                                        active ? 'bg-[#FFF9E5] text-[#FFC107]' : 'text-gray-700'
                                                    }`}
                                                >
                                                    Chỉnh sửa
                                                </Link>
                                            )}
                                        </Menu.Item>

                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => deletePost(post.id, "/artical-lessons")}
                                                    className={`block w-full px-4 py-2 text-sm text-left ${
                                                        active ? 'bg-[#FFE5E5] text-[#FF0000]' : 'text-gray-700'
                                                    }`}
                                                >
                                                    Xóa
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            </div>
                        )}
                        <div
                            className="w-[70px] h-[70px] bg-[#FFD668] absolute top-5 left-7 rounded-xl flex items-center justify-center shadow-md">
                            <div
                                className="w-[50px] h-[50px] rounded flex flex-col items-center justify-center">
                                <span className="font-mali-bold text-white text-2xl font-bold leading-none">{day}</span>
                                <span className="font-mali-medium text-white text-xs leading-none">Tháng {month}</span>
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="text-[15px] leading-loose text-gray-800 whitespace-pre-line pt-40">
                            <span className="font-mali bg-[#FDCED0]">
                                <RenderHTMLContent content={post.content} images={images} />
                            </span>
                        </div>

                        <div className="w-full max-w-4xl mt-12 px-4 md:px-0">
                            <h4 className="font-mali-semibold text-xl font-bold text-[#FFB300] mb-6">Bình luận</h4>

                            {comments.length === 0 && (
                                <p className="font-mali-medium text-gray-500 italic">Chưa có bình luận nào.</p>
                            )}

                            {!commentsLoading && !commentsError && comments.length > 0 && comments.map((cmt) => (
                                <CommentItem
                                    key={cmt._id}
                                    comment={cmt}
                                    currentUser={{ id: userId, role }}
                                    onDelete={deleteComment}
                                    onUpdate={updateComment}
                                />
                            ))}
                        </div>

                        <div className="w-full max-w-4xl mt-8 px-4 md:px-0">
                            <h4 className="font-mali-bold text-[#FFC107] mb-4">Viết bình luận của bạn:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Họ và tên"
                                    className="font-mali rounded-full border px-4 py-2 text-black"
                                    value={commentAuthor}
                                    onChange={(e) => setCommentAuthor(e.target.value)}
                                    disabled={!!loggedInUserName}
                                />
                            </div>
                            <textarea
                                placeholder="Viết bình luận"
                                className="font-mali w-full mt-4 border rounded-2xl px-4 py-2 text-black"
                                rows={4}
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                            ></textarea>
                            <img
                                src="/buttons/btn_comment.png"
                                alt="Gửi bình luận"
                                className="mt-4 w-40 cursor-pointer"
                                onClick={!isSubmitting ? handleCommentSubmit : undefined}
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