"use client";
/* eslint-disable */
import { useState } from "react";
import { useUsers, User } from "@/app/hooks/useAdminData";
import { format } from "date-fns";

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
        return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
    } catch (error) {
        return dateString;
    }
};

export default function UserTable() {
    const { users, loading, error, setUsers } = useUsers();
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);

    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentUsers = users.slice(indexOfFirst, indexOfLast);

    const totalPages = users.length > 0 ? Math.ceil(users.length / recordsPerPage) : 1;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleToggleActive = async (userId: string, currentIsActive: boolean) => {
        const action = currentIsActive ? "vô hiệu hóa" : "kích hoạt lại";
        const endpoint = currentIsActive
            ? `/api-v1/users/deactivate-user/${userId}`
            : `/api-v1/users/reactivate-user/${userId}`;

        if (window.confirm(`Bạn có chắc muốn ${action} người dùng này?`)) {
            try {
                const res = await fetch(endpoint, { method: 'POST' });
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.error || `Lỗi khi ${action}`);
                }
                alert(`Đã ${action} người dùng.`);
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_active: !currentIsActive } : u));
            } catch (err: any) {
                alert(`Lỗi: ${err.message}`);
            }
        }
    };

    if (loading) {
        return <div className="bg-white p-4 rounded-xl shadow-md text-center">Đang tải danh sách người dùng...</div>;
    }
    if (error) {
        return <div className="bg-white p-4 rounded-xl shadow-md text-center text-red-500">Lỗi tải dữ liệu: {error}</div>;
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm  text-orange-700">Tổng số: {users.length} người dùng</span>
                <label className="text-sm text-orange-700">
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
                    <th className="py-2 px-4 border text-left">Tên</th>
                    <th className="py-2 px-4 border text-left">Username</th>
                    <th className="py-2 px-4 border text-left">Vai trò</th>
                    <th className="py-2 px-4 border text-left">Ngày tạo</th>
                    <th className="py-2 px-4 border text-left">Trạng thái</th>
                    <th className="py-2 px-4 border text-center">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.length > 0 ? currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-yellow-50 text-sm text-gray-700">
                        <td className="py-2 px-4 border">{user.name}</td>
                        <td className="py-2 px-4 border">{user.username}</td>
                        <td className="py-2 px-4 border">{user.role}</td>
                        <td className="py-2 px-4 border">{formatDate(user.date_created)}</td>
                        <td className="py-2 px-4 border">
                             <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                 user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                             }`}>
                                {user.is_active ? 'Hoạt động' : 'Vô hiệu hóa'}
                            </span>
                        </td>
                        <td className="py-2 px-4 border text-center space-x-1">
                            {/* <button className="text-blue-600 hover:underline text-xs p-1">Sửa</button> */}
                            <button
                                onClick={() => handleToggleActive(user.id, user.is_active)}
                                className={`text-xs p-1 ${user.is_active ? 'text-red-500 hover:underline' : 'text-green-500 hover:underline'}`}>
                                {user.is_active ? 'Vô hiệu hóa' : 'Kích hoạt'}
                            </button>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={6} className="text-center py-10 border text-gray-500">Không có người dùng nào.</td>
                    </tr>
                )}
                </tbody>
            </table>

            <div className="flex justify-center mt-4 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-3 py-1 rounded bg-orange-100 hover:bg-orange-200 text-sm text-orange-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                >
                    ← Trước
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                            currentPage === pageNumber
                                ? 'bg-orange-400 text-white'
                                : 'bg-blue-100 hover:bg-orange-200 text-blue-700'
                        }`}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-3 py-1 rounded bg-orange-100 hover:bg-orange-200 text-sm text-orange-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                >
                    Tiếp →
                </button>
            </div>
        </div>
    );
}