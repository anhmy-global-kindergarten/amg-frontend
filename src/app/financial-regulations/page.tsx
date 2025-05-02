import Image from "next/image";
import Link from "next/link";

export default function FinancialRegulations() {
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
                        <span className="text-[#FFC107] font-medium">
                            Quy định tài chính AMG Kindergarten
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-[#FFD668] text-xl md:text-2xl text-center mt-8 uppercase font-bold">
                    QUY ĐỊNH TÀI CHÍNH AMG KINDERGARTEN
                </h3>

                {/* Content */}
                <div className="mt-6 w-full space-y-4 text-black">
                    {/* Chính sách ưu đãi */}
                    <div>
                        <p className="font-bold text-pink-500">I. Chính sách ưu đãi</p>
                        <ul className="list-none ml-6 space-y-1">
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">1. Ưu đãi học phí chính khóa của Học sinh được xác định theo chính sách của nhà trường tại từng thời điểm.</span>
                            </li>
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">2. Ưu đãi 5% tổng học phí chính khóa cho Học sinh có anh/chị/em ruột cùng học trong suốt quá trình các con cùng sinh hoạt tại trường.</span>
                            </li>
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">3. KHÔNG áp dụng song song các chương trình ưu đãi. Nhà trường sẽ tự động áp dụng chương trình ưu đãi học cao nhất trong thời điểm con nhập học.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Các khoản phí khác */}
                    <div>
                        <p className="font-bold text-pink-500">II. Các khoản phí khác</p>

                        {/* Phí ghi danh */}
                        <div className="ml-4">
                            <p className="font-semibold text-pink-500">1. Phí ghi danh</p>
                            <ul className="list-none ml-6 space-y-1">
                                <li className="px-2 py-1">
                                    <span
                                        className="bg-[#FACBCC]">- Phí ghi danh đóng 1 lần duy nhất: khi nhập học.</span>
                                </li>
                                <li className="px-2 py-1">
                                    <span className="bg-[#FACBCC]">- Khoản phí này KHÔNG hoàn lại hay chuyển nhượng với bất cứ lí do gì.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Phí phát triển trường */}
                        <div className="ml-4">
                            <p className="font-semibold text-pink-500">2. Phí phát triển trường</p>
                            <ul className="list-none ml-6 space-y-1">
                                <li className="px-2 py-1">
                                    <span className="bg-[#FACBCC]">- Phí phát triển trường là phí thường niên vào tháng 9 hằng năm, áp dụng với học sinh đang học tại trường.</span>
                                </li>
                                <li className="px-2 py-1">
                                    <span className="bg-[#FACBCC]">- Với học sinh mới nhập học: Nếu nhập học trước tháng 2 hằng năm sẽ đóng phí CSVC cả năm, nếu nhập học sau tháng 2 hằng năm, sẽ thu 50% mức phí CSVC cả năm.</span>
                                </li>
                                <li className="px-2 py-1">
                                    <span className="bg-[#FACBCC]">- Khoản phí này KHÔNG hoàn lại hay chuyển nhượng với bất cứ lí do gì.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Học phí */}
                        <div className="ml-4">
                            <p className="font-semibold text-pink-500">3. Học phí</p>
                            <ul className="list-none ml-6 space-y-1">
                                <li className="px-2 py-1">
                                    <span className="bg-[#FACBCC]">- Học phí tháng đầu tiên nhập học sẽ được tính theo ngày lẻ (nếu học sinh nhập học giữa tháng). Các tháng tiếp theo sẽ được tính theo gói học phí mà phụ huynh lựa chọn.</span>
                                </li>
                                <li className="px-2 py-1">
                                    <span className="bg-[#FACBCC]">- Học phí sẽ được nhà trường bảo lưu theo tháng, không tính ngày nghỉ lễ, nghỉ hè, học sinh nghỉ học được tính dựa trên dữ liệu của KidsOnline. Nhà trường khuyến khích bố mẹ đóng học phí có giai đoạn phù hợp với thời gian học của con để tránh bất tiện và chênh lệch với quy định.</span>
                                </li>
                                <li className="px-2 py-1">
                                    <span className="bg-[#FACBCC]">- Học phí nhà trường chỉ áp dụng cho các trường hợp học sinh lên cấp độ tiếp theo bị lỗi các lý do thiên tai, dịch bệnh bất khả kháng. Thời gian hoàn trong vòng 2 tháng kể từ khi nhà trường tiếp nhận thông tin bằng văn bản từ phụ huynh.</span>
                                </li>
                                <li className="px-2 py-1">
                                    <span className="bg-[#FACBCC]">- Học phí tiểu học: 2.500.000/tháng, áp dụng cho học sinh 5-6 tuổi. Khóa học tiểu học bắt đầu vào tháng 7 hằng năm. Nếu trong trường hợp học gia đình chưa có mong muốn cho con tham gia khóa học tiểu học, vui lòng thông báo lại với nhà trường.</span>
                                </li>
                                <li className="px-2 py-1">
                                    <span className="bg-[#FACBCC]">- Tăng học phí sẽ được áp dụng không quá 20%/năm. Tuy nhiên, mức phí tăng sẽ được nhà trường thông báo trước 3 tháng. Học phí tăng sẽ được áp dụng từ kỳ đóng tiếp theo của từng học sinh.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Phí dịch vụ bán trú */}
                        <div className="ml-4">
                            <p className="font-semibold text-pink-500">4. Phí dịch vụ bán trú</p>
                            <ul className="list-none ml-6 space-y-1">
                                <li className="px-2 py-1">
                                    <span className="bg-[#FACBCC]">- Phí dịch vụ bán trú bao gồm 5 bữa: bữa sáng, bữa phụ sáng, bữa trưa, bữa chiều và bữa phụ chiều được phục vụ cho học sinh AMG.</span>
                                </li>
                                <li className="px-2 py-1">
                                    <span className="bg-[#FACBCC]">- Phí dịch vụ bán trú: 65.000đ/ngày x số ngày học trong tháng.</span>
                                </li>
                                <li className="px-2 py-1">
                                    <span className="bg-[#FACBCC]">- Từ năm trường quyết toán hoàn phí dịch vụ vào mỗi kỳ đơn khi có những lý do nghỉ trường không báo trước từ 1 tuần (tức là nghỉ liên mạch từ t2-t6 của tuần học) khi phụ huynh đăng ký thông tin xin nghỉ trên KidsOnline.</span>
                                </li>
                                <li className="px-2 py-1">
                                    <span className="bg-[#FACBCC]">- Phí dịch vụ bán trú có thể thay đổi trong năm nếu có biến động về giá thực phẩm và được Nhà trường thông báo 30 ngày trước khi áp dụng.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Phí trông ngoài giờ */}
                    <div className="ml-4">
                        <p className="font-semibold text-pink-500">5. Phí trông ngoài giờ</p>
                        <ul className="list-none ml-6 space-y-1">
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">- Phụ huynh có nhu cầu gửi Học sinh ngoài khung giờ hoạt động chính thức của Nhà trường có thể đăng ký và nộp phí trông ngoài giờ. Phí này sẽ được nhà trường quyết toán theo tháng.</span>
                            </li>
                            <li className="px-2 py-1">
                                <span
                                    className="bg-[#FACBCC]">- Phí trông ngoài giờ 17h30-18h30: 30.000VND/block 30p</span>
                            </li>
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">- Phí trông thứ 7: 300.000VND/ngày, báo trước 15h chiều thứ 6</span>
                            </li>
                        </ul>
                    </div>

                    {/* Thời gian nghỉ hè */}
                    <div className="ml-4">
                        <p className="font-semibold text-pink-500">6. Thời gian nghỉ hè</p>
                        <ul className="list-none ml-6 space-y-1">
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">- Thời gian nghỉ hè từ 01/06 - 10/06 hàng năm.</span>
                            </li>
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">- Học phí tại kỳ nghỉ hè được tính tương đương với học phí dịch vụ trông trẻ thứ 7 nếu Phụ huynh có nhu cầu.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Chi phí dịch tễ */}
                    <div className="ml-4">
                        <p className="font-semibold text-pink-500">7. Chi phí dịch tễ</p>
                        <ul className="list-none ml-6 space-y-1">
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">- Các chi phí có thể phát sinh liên quan đến dịch tễ, khử khuẩn trường học sẽ được thông báo trước khi áp dụng.</span>
                            </li>
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">- Phụ phí nghỉ dịch sẽ do nhà trường quyết định liên quan đến các chi phí duy trì nhà trường trong thời gian dịch diễn ra</span>
                            </li>
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">- Phụ phí nghỉ dịch (nếu có) không quá 250.000VND/tháng/học sinh. Nếu trong trường hợp Phụ huynh báo nghỉ trong thời gian nghỉ dịch, phí nghỉ dịch sẽ được áp dụng từ khi áp dụng dịch bắt đầu đến khi nhà trường nhận được thông báo nghỉ. Sau nghỉ dịch, học sinh báo nghỉ quay lại trường sẽ được tính như học sinh mới.</span>
                            </li>
                        </ul>
                    </div>

                    {/* AMG Passport */}
                    <div className="ml-4">
                        <p className="font-semibold text-pink-500">8. AMG Passport</p>
                        <ul className="list-none ml-6 space-y-1">
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">- AMG Passport là 1 tấm thẻ dành riêng cho học sinh của hệ thống AMG Kindergarten, được sử dụng tại AM Kidzone.</span>
                            </li>
                            <li className="px-2 py-1">
                                <span
                                    className="bg-[#FACBCC]">- Tặng 100% vé vào cửa AM Kidzone trong ngày sinh nhật</span>
                            </li>
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">- Nhận giá vé ưu đãi 80.000VND tại Kidzone</span>
                            </li>
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">- Ưu đãi lên đến 20% các hệ thống khác của AM</span>
                            </li>
                            <li className="px-2 py-1">
                                <span
                                    className="bg-[#FACBCC]">- AMG Passport sẽ là một món quà nhỏ khi con nhập học. Nếu mất thẻ, phí làm lại thẻ 50.000VND/thẻ.</span>
                            </li>
                            <li className="px-2 py-1">
                                <span className="bg-[#FACBCC]">- Thẻ sẽ được hoàn lại cho hệ thống AMG Kindergarten khi con kết thúc quá trình học tại trường</span>
                            </li>
                        </ul>
                    </div>

                    <div className="ml-4">
                        <span className="bg-[#FACBCC]">AMG Kindergarten xin cảm ơn Quý Phụ huynh đã luôn đồng hành cùng chúng tôi!</span>
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
