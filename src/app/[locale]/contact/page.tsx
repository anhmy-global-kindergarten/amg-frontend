"use client";

import {ChangeEvent, FormEvent, useState} from "react";
import Image from "next/image";
import Link from "next/link";

const mapUrls = {
    hamnghi:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.946867054752!2d105.75907097503159!3d21.034811880616015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455197754e671%3A0x3001ed5f17c5ca13!2sAMG-%20AnhMy%20Global%20Kindergarten!5e0!3m2!1svi!2sus!4v1746109300134!5m2!1svi!2sus",
    duytan:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d553.5817755910355!2d105.7809426380258!3d21.031107647247854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345506a0130c4d%3A0x219bb769bc58d10a!2sAMG%20Kindergarten%20%26%20Kidzone%20Duy%20T%C3%A2n!5e0!3m2!1svi!2sus!4v1746110206371!5m2!1svi!2sus",
    ecopark:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.9980219821205!2d105.93634997502917!3d20.952594580677758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abbbcfe94933%3A0xdbebdf525e346f6d!2sAMG%20Kindergarten%20%26%20Kidzone%20Ecopark!5e0!3m2!1svi!2sus!4v1746110277273!5m2!1svi!2sus",
};

export default function Contact() {
    const [currentMap, setCurrentMap] = useState(mapUrls.hamnghi);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: "" });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            setStatus({ loading: false, success: true, error: "" });
            // Reset form sau khi gửi thành công
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setStatus({
                loading: false,
                success: false,
                error: "Gửi thông tin thất bại. Vui lòng thử lại.",
            });
            console.error("Failed to send message:", error);
        }
    };

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
                        <span className="text-[#FFC107] font-medium">Liên hệ</span>
                    </div>
                </div>

                {/* Cơ sở chọn map */}
                <div className="w-full py-6 flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center">
                    <Image
                        src="/info/amg_box1.png"
                        alt="Cơ sở 1"
                        width={300}
                        height={100}
                        className="cursor-pointer"
                        onClick={() => setCurrentMap(mapUrls.hamnghi)}
                    />
                    <Image
                        src="/info/amg_box2.png"
                        alt="Cơ sở 2"
                        width={300}
                        height={100}
                        className="cursor-pointer"
                        onClick={() => setCurrentMap(mapUrls.duytan)}
                    />
                    <Image
                        src="/info/amg_box3.png"
                        alt="Cơ sở 3"
                        width={300}
                        height={100}
                        className="cursor-pointer"
                        onClick={() => setCurrentMap(mapUrls.ecopark)}
                    />
                </div>

                {/* Google Map */}
                <div className="w-full max-w-4xl z-10">
                    <iframe
                        src={currentMap}
                        width="100%"
                        height="450"
                        className="border-0 w-full"
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                {/* Tiêu đề liên hệ */}
                <h3 className="font-mali-bold text-xl md:text-2xl text-center lg:translate-x-[130px] mt-8 text-black">
                    Liên hệ với chúng tôi
                </h3>

                {/* Info + Form */}
                <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 rounded-xl p-4 md:p-6 z-10">
                    {/* Thông tin liên hệ */}
                    <div className="font-mali-medium flex-1 space-y-4 text-sm text-[#FFD668]">
                        <div className="flex items-start gap-2">
                            <Image
                                src="/icons/icon_location.png"
                                alt="Location"
                                width={16}
                                height={16}
                            />
                            <span>
                                No B18-06, Vinhome Gardenia, P. Hàm Nghi, Mỹ Đình, Hà Nội.
                            </span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Image
                                src="/icons/icon_location.png"
                                alt="Location"
                                width={16}
                                height={16}
                            />
                            <span>
                                No B18-05A, Vinhome Gardenia, P. Hàm Nghi, Mỹ Đình, Hà Nội.
                            </span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Image
                                src="/icons/icon_location.png"
                                alt="Location"
                                width={16}
                                height={16}
                            />
                            <span>
                                Tầng 2, Tòa nhà Dreamland Bonanza, 23 Duy Tân, Cầu Giấy, Hà Nội
                            </span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Image
                                src="/icons/icon_location.png"
                                alt="Location"
                                width={16}
                                height={16}
                            />
                            <span>
                                S301, Sky 3, Aquabay, Khu đô thị Ecopark, Hưng Yên
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image
                                src="/icons/icon_phone.png"
                                alt="Phone"
                                width={16}
                                height={16}
                            />
                            <span>097.399.2001</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image
                                src="/icons/icon_email.png"
                                alt="Email"
                                width={16}
                                height={16}
                            />
                            <span>anhmy.kindergarten@gmail.com</span>
                        </div>
                    </div>

                    {/* Form liên hệ */}
                    <form onSubmit={handleSubmit} className="flex-1 space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Họ và tên"
                            className="font-mali w-full border rounded-2xl px-4 py-2 text-black"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Email"
                            className="font-mali w-full border rounded-2xl px-4 py-2 text-black"
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Nội dung"
                            className="font-mali w-full border rounded-2xl px-4 py-2 h-32 resize-none text-black"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={status.loading}
                            className="font-mali bg-[#FFC107] text-white px-6 py-2 rounded-full hover:bg-yellow-400 transition disabled:bg-gray-400"
                        >
                            {status.loading ? "Đang gửi..." : "Gửi thông tin"}
                        </button>

                        {status.success && (
                            <p className="font-mali text-green-600 font-mali">
                                Cảm ơn bạn! Chúng tôi đã nhận được thông tin.
                            </p>
                        )}
                        {status.error && (
                            <p className="font-mali text-red-600 font-mali">{status.error}</p>
                        )}
                    </form>
                </div>
            </div>

            {/* Các icon sao */}
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
