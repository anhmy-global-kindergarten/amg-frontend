"use client";

import { useState } from "react";

const USERS = [
    { id: 1, name: "Admin", email: "admin@example.com", role: "Admin", created_at: "2025-01-01" },
    { id: 2, name: "Giáo viên", email: "teacher@example.com", role: "Teacher", created_at: "2025-02-15" },
    { id: 3, name: "Người dùng A", email: "a@example.com", role: "Parent", created_at: "2025-03-01" },
    { id: 4, name: "Người dùng B", email: "b@example.com", role: "Parent", created_at: "2025-03-02" },
    { id: 5, name: "Người dùng C", email: "c@example.com", role: "Parent", created_at: "2025-03-03" },
    { id: 6, name: "Người dùng D", email: "d@example.com", role: "Parent", created_at: "2025-03-04" },
    { id: 7, name: "Người dùng E", email: "e@example.com", role: "Parent", created_at: "2025-03-05" },
    { id: 8, name: "Người dùng F", email: "f@example.com", role: "Parent", created_at: "2025-03-06" },
];

export default function UserTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);

    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentUsers = USERS.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(USERS.length / recordsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">Tổng số: {USERS.length} người dùng</span>
                <label className="text-sm">
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
                <tr className="bg-orange-100 text-orange-700">
                    <th className="py-2 border">Tên</th>
                    <th className="py-2 border">Email</th>
                    <th className="py-2 border">Vai trò</th>
                    <th className="py-2 border">Ngày tạo</th>
                    <th className="py-2 border">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-yellow-50 text-sm text-gray-700">
                        <td className="py-2 border pl-4">{user.name}</td>
                        <td className="py-2 border pl-4">{user.email}</td>
                        <td className="py-2 border pl-4">{user.role}</td>
                        <td className="py-2 border pl-4">{user.created_at}</td>
                        <td className="py-2 border pl-4 space-x-2">
                            <button className="text-blue-600 hover:underline text-sm">Sửa</button>
                            <button className="text-red-500 hover:underline text-sm">Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
                    disabled={currentPage === 1}
                >
                    ← Trước
                </button>
                <span className="text-sm mt-1">Trang {currentPage} / {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
                    disabled={currentPage === totalPages}
                >
                    Tiếp →
                </button>
            </div>
        </div>
    );
}