"use client";

import { useState } from "react";

const REGISTRATIONS = [
    {
        id: 1,
        studentName: 'Nguyễn Văn A',
        gender: 'Nam',
        dob: '2019-05-10',
        parentName: 'Nguyễn Văn B',
        address: '123 Đường ABC, TP.HCM',
        phone: '0901234567',
    },
    {
        id: 2,
        studentName: 'Trần Thị B',
        gender: 'Nữ',
        dob: '2020-08-22',
        parentName: 'Trần Văn C',
        address: '456 Đường XYZ, Hà Nội',
        phone: '0919876543',
    },
    {
        id: 3,
        studentName: 'Lê Minh C',
        gender: 'Nam',
        dob: '2018-12-01',
        parentName: 'Lê Văn D',
        address: '789 Đường DEF, Đà Nẵng',
        phone: '0908765432',
    },
    {
        id: 4,
        studentName: 'Phạm Thị D',
        gender: 'Nữ',
        dob: '2021-02-15',
        parentName: 'Phạm Văn E',
        address: '321 Đường LMN, Cần Thơ',
        phone: '0934567890',
    },
    {
        id: 5,
        studentName: 'Hoàng Gia H',
        gender: 'Nam',
        dob: '2019-11-23',
        parentName: 'Hoàng Văn H',
        address: '654 Đường OPQ, Bình Dương',
        phone: '0981122334',
    },
    {
        id: 6,
        studentName: 'Võ Thị I',
        gender: 'Nữ',
        dob: '2020-06-09',
        parentName: 'Võ Văn J',
        address: '777 Đường QRS, Huế',
        phone: '0972233445',
    },
];

export default function RegisterTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);

    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentRegistrations = REGISTRATIONS.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(REGISTRATIONS.length / recordsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md overflow-auto">
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-blue-700">Tổng số: {REGISTRATIONS.length} đơn đăng ký</span>
                <label className="text-sm text-blue-700">
                    Hiển thị mỗi trang:
                    <select
                        className="ml-2 border rounded px-2 py-1"
                        value={recordsPerPage}
                        onChange={(e) => {
                            setRecordsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        {[5, 10, 15, 20].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <table className="w-full table-auto border-collapse">
                <thead>
                <tr className="bg-blue-100 text-blue-700">
                    <th className="py-2 border">Học sinh</th>
                    <th className="py-2 border">Giới tính</th>
                    <th className="py-2 border">Ngày sinh</th>
                    <th className="py-2 border">Phụ huynh</th>
                    <th className="py-2 border">Địa chỉ</th>
                    <th className="py-2 border">SĐT</th>
                    <th className="py-2 border">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {currentRegistrations.map((item) => (
                    <tr key={item.id} className="hover:bg-yellow-50 text-sm text-gray-700">
                        <td className="py-2 border pl-4">{item.studentName}</td>
                        <td className="py-2 border pl-4">{item.gender}</td>
                        <td className="py-2 border pl-4">{item.dob}</td>
                        <td className="py-2 border pl-4">{item.parentName}</td>
                        <td className="py-2 border pl-4">{item.address}</td>
                        <td className="py-2 border pl-4">{item.phone}</td>
                        <td className="py-2 border pl-4 space-x-2">
                            <button className="text-blue-600 hover:underline text-sm">Xem</button>
                            <button className="text-green-600 hover:underline text-sm">Sửa</button>
                            <button className="text-red-500 hover:underline text-sm">Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-3 py-1 rounded bg-blue-100 hover:bg-orange-200 text-sm text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                >
                    ← Trước
                </button>
                <span className="text-sm text-blue-700 font-medium mt-1">
        Trang {currentPage} / {totalPages}
    </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-3 py-1 rounded bg-blue-100 hover:bg-orange-200 text-sm text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                >
                    Tiếp →
                </button>
            </div>
        </div>
    );
}
