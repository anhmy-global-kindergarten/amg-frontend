import Image from "next/image";
import Link from "next/link";

export default function Story() {
    return (
        <div className="relative min-h-screen bg-[#FFFFFF] p-8 flex flex-col items-center overflow-hidden">
            {/* Background decor */}
            <Image
                src="/decorations/decor_bg.png"
                alt="Decor Background"
                fill
                className="object-cover opacity-100 pointer-events-none z-0"
                priority
            />

            {/* Content */}
            <div className="relative w-full max-w-5xl z-10 flex flex-col items-center">
                {/* Breadcrumb */}
                <div className="w-full mb-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="font-semibold text-black hover:underline">
                            Trang chủ
                        </Link>
                        <span>/</span>
                        <span className="text-[#FFC107] font-medium">Câu chuyện AMG</span>
                    </div>
                </div>
                {/* Logo */}
                <div className="mb-6">
                    <Image
                        src="/banner/logo.png"
                        alt="AMG Kindergarten Logo"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </div>
                {/* Title */}
                <div className="max-w-4xl w-full z-10">
                    {/* Tiêu đề lớn */}
                    <h1 className="text-[#F7C948] text-xl font-semibold uppercase mb-8">
                        Nội quy an toàn trường học AMG
                    </h1>

                    {/* Tiêu đề mục I */}
                    <h2 className="text-[#F7C948] text-lg font-bold mb-6">
                        I. Về cơ sở vật chất
                    </h2>

                    {/* Danh sách nội dung */}
                    <ol className="list-decimal list-inside space-y-4 text-gray-800 text-base">
                        <li>
                            Sân chơi bằng phẳng, không trơn trượt; có hệ thống biển chỉ dẫn các vị trí, khu vực vui chơi
                            bằng ký hiệu phù hợp với nhận thức của trẻ.
                        </li>
                        <li>
                            Hệ thống bồn hoa, bồn cây không có góc cạnh sắc nhọn; chậu hoa, cây cảnh đặt ở vị trí an
                            toàn, chắc chắn; không trồng cây có quả vỏ cứng, hoa, quả có nhựa độc, gai sắc hoặc thu hút
                            ruồi, muỗi.
                        </li>
                        <li>
                            Hệ thống chứa nước (giếng, bể, bồn...) có nắp đậy, khóa chắc chắn; có cửa hoặc rào chắn ở
                            lối ra các khu vực như kênh, mương, suối, ao, hồ, hồ sâu, bể bơi (nếu có).
                        </li>
                        <li>
                            Hệ thống cống, rãnh bảo đảm kín, không rò rỉ, ứ đọng gây ô nhiễm môi trường; khu thu gom rác
                            thải bố trí độc lập, có lối ra vào riêng cách xa các khối phòng chức năng; bảo đảm thu gom
                            rác thải đúng quy định.
                        </li>
                        <li>
                            Hệ thống phòng cháy, chữa cháy được nghiệm thu; thiết bị phòng cháy chữa cháy được kiểm định
                            theo quy định và bảo đảm hoạt động bình thường.
                        </li>
                        <li>
                            Phòng nhóm/lớp thông thoáng mát, sạch sẽ, đủ ánh sáng.
                        </li>
                        <li>
                            Hệ thống cửa (ra vào, cửa sổ) có móc cố định khi cửa mở; cửa sổ có chấn song chắc chắn, an
                            toàn; cửa ra vào của nhóm trẻ có thanh chắn an toàn.
                        </li>
                        <li>
                            Không gian trong phòng, nhóm được bố trí thân thiện, phù hợp với độ tuổi, màu sắc trung
                            tính; chiều cao các tranh ảnh, thiết bị phù hợp tầm nhìn của trẻ.
                        </li>
                        <li>
                            Không gian trong phòng, nhóm được bố trí thân thiện, phù hợp với độ tuổi, màu sắc trung
                            tính; chiều cao các tranh ảnh, thiết bị phù hợp tầm nhìn của trẻ.
                        </li>
                        <li>
                            Góc chơi bố trí phù hợp với diện tích phòng, nhóm/lớp, an toàn và thuận tiện cho trẻ hoạt
                            động; không bố trí góc chơi ở khu vực cửa ra vào và cửa nhà vệ sinh.
                        </li>
                        <li>
                            Các khu vực trong nhóm/lớp có hệ thống chỉ dẫn/quy định bằng ký hiệu khoa học, phù hợp nhận
                            thức của trẻ.
                        </li>
                        <li>
                            Lan can, hiên chơi thiết kế đúng quy định (chiều cao lớn hơn lm, sử dụng các thanh đứng với
                            khoảng cách nhỏ hơn 10 cm, không làm các thanh phân chia ngang) hoặc được gia cố chắc chắn,
                            đảm bảo an toàn; không kê bàn ghế và đồ dùng ở khu vực lan can.
                        </li>
                        <li>
                            Cầu thang có tay vịn, bậc thang thiết kế đúng quy định, dễ sử dụng đối với trẻ; thang máy,
                            thang vận chuyển thực phẩm (nếu có) có cửa, khóa bảo đảm an toàn.
                        </li>
                        <li>
                            Có thiết bị vệ sinh phù hợp với trẻ, dễ sử dụng; có đủ nước để sử dụng; đối với lớp mẫu
                            giáo, bố trí riêng nhà vệ sinh cho trẻ em gái và trẻ em trai.
                        </li>
                        <li>
                            Nhà vệ sinh bảo đảm giáo viên dễ quan sát; nền nhà vệ sinh luôn khô ráo, sạch sẽ; dụng cụ có
                            chứa nước (xô, chậu...) có nắp đậy an toàn.
                        </li>
                        <li>
                            Dụng cụ đựng hoá chất (các chất tẩy rửa..) có nhãn rõ ràng để xa tầm với của trẻ em. Chỉ sử
                            dụng các chất tẩy rửa trong danh mục quy định.
                        </li>
                        <li>
                            Thiết bị, đồ dùng, đồ chơi trong nhóm/lớp bảo đảm an toàn, phù hợp với độ tuổi; đồ dùng, đồ
                            chơi theo danh mục và bảo đảm tiêu chuẩn theo quy định.
                        </li>
                        <li>
                            Đồ chơi ngoài trời bố trí ở vị trí an toàn, bảo đảm trẻ dễ sử dụng; không sử dụng những đồ
                            chơi đã gãy, hỏng có nguy cơ mất an toàn với trẻ
                        </li>
                        <li>
                            Thiết bị, đồ dùng, đồ chơi sắp xếp khoa học, phù hợp với độ tuổi, thân thiện, thuận tiện cho
                            trẻ tiếp cận sử dụng; hệ thống tủ, giá, kệ.. .được kê xếp an toàn, có vít/chốt cố định.
                        </li>
                        <li>
                            Bình chứa nước uống, tủ/giá đựng ca cốc được bố trí tại khu vực trẻ dễ lấy, dễ cất và an
                            toàn khi sử dụng.
                        </li>
                        <li>
                            Tài liệu, học liệu bảo đảm yêu cầu về tính an toàn, thẩm mỹ, giáo dục; phù hợp với đặc điểm
                            tâm, sinh lý và nhu cầu nhận thức của trẻ, phát huy khả năng tư duy sáng tạo, kích thích
                            tính tò mò, khám phá, ham hiểu biết ở trẻ.
                        </li>
                        <li>
                            Các đồ dùng, giáo cụ trực quan dễ gây mất an toàn (dao, kéo, hột hạt,...) chỉ cho trẻ sử
                            dụng khi có sự hướng dẫn, giám sát của giáo viên.
                        </li>
                    </ol>
                    <br/>
                    <h2 className="text-[#F7C948] text-lg font-bold mb-6">
                        II. Về An toàn Vệ sinh Thực phẩm
                    </h2>
                    <ol className="list-decimal list-inside space-y-4 text-gray-800 text-base">
                        <li>
                            Độc lập với các khối phòng chức năng; bảo đảm về thiết kế theo quy trình bếp 1 chiều, lưu
                            thông không khí.
                        </li>
                        <li>
                            Có đầy đủ trang thiết bị đáp ứng yêu cầu an toàn thực phẩm theo quy định hiện hành; đồ dùng
                            phục vụ ăn uống làm bằng chất liệu an toàn, được vệ sinh sạch sẽ.
                        </li>
                        <li>
                            Có hợp đồng cung cấp thực phẩm hoặc biên bản cam kết về nguồn gốc, xuất xứ của thực phẩm.
                        </li>
                        <li>
                            Quy trình chế biến, nấu nướng, chia ăn bảo đảm các quy định về an toàn thực phẩm
                        </li>
                        <li>
                            Thực hiện kiểm thực 3 bước và lưu mẫu thức ăn đúng quy định.
                        </li>
                    </ol>
                    <br/>
                    <h2 className="text-[#F7C948] text-lg font-bold mb-6">
                        III. Về cán bộ quản lý, giáo viên, nhân viên và môi trường sư phạm
                    </h2>
                    <ol className="list-decimal list-inside space-y-4 text-gray-800 text-base">
                        <li>
                            Không có cán bộ quản lý, giáo viên, nhân viên vi phạm đạo đức nhà giáo
                        </li>
                        <li>
                            Không có tình trạng bạo hành, xâm hại trẻ em xảy ra trong cơ sở giáo dục mầm non
                        </li>
                        <li>
                            Cán bộ quản lý, giáo viên, nhân viên được tập huấn nâng cao năng lực về bảo đảm an toàn, phòng, chống tai nạn thương tích; kỹ năng sơ, cấp cứu; phòng, chống bạo hành trẻ; kỹ năng ứng xử sư phạm.
                        </li>
                        <li>
                            Có đủ giáo viên theo quy định.
                        </li>
                        <li>
                            Nhân viên nấu ăn bảo đảm các điều kiện về sức khỏe và kiến thức an toàn thực phẩm theo quy định.
                        </li>
                        <li>
                            Thực hiện lồng ghép giáo dục trẻ kiến thức, kỹ năng tự bảo vệ bản thân trong các hoạt động nuôi dưỡng, chăm sóc, giáo dục trẻ hàng ngày; thực hiện giáo dục hoà nhập cho trẻ có nhu cầu đặc biệt.
                        </li>
                        <li>
                            Trang phục của cán bộ quản lý, giáo viên, nhân viên gọn gàng, lịch sự, thuận tiện trong công tác nuôi dưỡng, chăm sóc, giáo dục trẻ em.
                        </li>
                    </ol>
                    <br/>
                    <h2 className="text-[#F7C948] text-lg font-bold mb-6">
                        IV. Về tổ chức hoạt động; quan hệ nhà trường, gia đình và xã hội
                    </h2>
                    <ol className="list-decimal list-inside space-y-4 text-gray-800 text-base">
                        <li>
                            Có kế hoạch xây dựng cơ sở giáo dục mầm non an toàn, phòng, chống tai nạn thương tích.
                        </li>
                        <li>
                            Số điện thoại, hộp thư góp ý, các hình thức tiếp nhận thông tin về bạo hành, xâm hại, bảo
                            đảm an toàn cho trẻ được công khai ở các vị trí dễ quan sát, tiếp cận.
                        </li>
                        <li>
                            Có quy định về đón, trả trẻ để phòng tránh trẻ bị thất lạc; các phương án sơ tán khi xảy ra
                            tình huống bất thường (cháy, nổ, cấp cứu, thiên tai...)
                        </li>
                        <li>
                            Có hệ thống công nghệ thông tin kết nối internet để tra cứu thông tin và được kiểm soát về
                            nội dung đảm bảo an toàn, lành mạnh, phù hợp.
                        </li>
                        <li>
                            Có hệ thống kết nối, chia sẻ thông tin giữa nhà trường với gia đình về kết quả nuôi dưỡng,
                            chăm sóc, giáo dục trẻ và kịp thời thông tin về những tiến bộ hoặc khó khăn của trẻ.
                        </li>
                        <li>
                            Có bộ quy tắc ứng xử văn hóa trong cơ sở giáo dục mầm non theo quy định
                        </li>
                        <li>
                            Thực hiện công tác y tế trường học theo quy định; phối hợp với ngành y tế địa phương trong công tác chăm sóc sức khỏe cho trẻ em.
                        </li>
                    </ol>
                </div>
            </div>

            {/* Elephant Icon */
            }
            <Image
                src="/icons/icon_elephant_star.png"
                alt="Elephant Star"
        width={120}
        height={120}
        className="absolute right-70 top-20 z-10"
    />

    <Image src="/banner/icon_star_empty.png" alt="Star Empty" width={60} height={60}
           className="absolute right-20 top-50 z-10"/>
    <Image src="/banner/icon_star_empty.png" alt="Star Empty" width={40} height={40}
           className="absolute right-150 top-17 z-10"/>
    <Image src="/banner/icon_star_empty.png" alt="Star Empty" width={60} height={60}
           className="absolute left-20 top-30 z-10"/>

    <Image
        src="/banner/icon_star_empty.png"
        alt="Star Empty"
        width={60}
        height={60}
        className="absolute left-10 top-350 z-10"
    />
    <Image
        src="/banner/icon_star_empty.png"
        alt="Star Empty"
        width={40}
        height={40}
        className="absolute right-125 top-150 z-10"
    />
    <Image
        src="/banner/icon_star_empty.png"
        alt="Star Empty"
        width={60}
        height={60}
        className="absolute left-260 top-280 z-9"
    />
    <Image
        src="/banner/icon_star_empty.png"
        alt="Star Empty"
        width={50}
        height={50}
        className="absolute right-1/2 bottom-58 z-9"
    />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={45}
                height={45}
                className="absolute left-36 bottom-20 z-10"
            />
            <Image
                src="/banner/icon_star_empty.png"
                alt="Star Empty"
                width={55}
                height={55}
                className="absolute right-24 bottom-10 z-10"
            />

        </div>
    );
};
