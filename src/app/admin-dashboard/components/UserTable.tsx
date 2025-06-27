"use client";
/* eslint-disable */
import React, {Fragment, useCallback, useState} from "react";
import { useUsers, User } from "@/app/hooks/useAdminData";
import { format } from "date-fns";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
        return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
    } catch (error) {
        return dateString;
    }
};

const USER_STATUSES = {
    active: { label: 'Hoạt động', color: 'bg-green-100 text-green-800', is_active: true },
    inactive: { label: 'Vô hiệu hóa', color: 'bg-red-100 text-red-800', is_active: false },
};

const STATUS_ACTIONS = [
    { label: 'Kích hoạt', newStatus: 'active', endpointSuffix: 'reactivate-user' },
    { label: 'Vô hiệu hóa', newStatus: 'inactive', endpointSuffix: 'deactivate-user' },
];

const USER_ROLES = {
    admin: { label: 'Admin', color: 'bg-purple-100 text-purple-800' },
    teacher: { label: 'Giáo viên', color: 'bg-blue-100 text-blue-800' },
    parent: { label: 'Phụ huynh', color: 'bg-yellow-100 text-yellow-800' },
};

const ROLE_ACTIONS = [
    { label: 'Giáo viên', newRole: 'teacher' },
    { label: 'Phụ huynh', newRole: 'parent' },
];

const RoleMenu = ({ user, onUpdate }: { user: User, onUpdate: () => void }) => {
    const currentRoleInfo = USER_ROLES[user.role as keyof typeof USER_ROLES] ?? USER_ROLES.parent;

    const handleRoleChange = async (newRole: string) => {
        const roleInfo = USER_ROLES[newRole as keyof typeof USER_ROLES];
        if (!roleInfo) return;

        if (window.confirm(`Bạn có chắc muốn đổi vai trò người dùng này thành "${roleInfo.label}"?`)) {
            try {
                const response = await fetch(`/api-v1/users/update-user/${user.id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ role: newRole }),
                });
                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || 'Cập nhật vai trò thất bại');
                }
                onUpdate();
            } catch (err: any) {
                alert(`Lỗi: ${err.message}`);
            }
        }
    };

    return (
        <Menu as="div" className="relative inline-block text-left w-full">
            <Menu.Button className={`w-full inline-flex justify-center items-center rounded-md px-3 py-1.5 text-xs font-medium shadow-sm hover:opacity-80 ${currentRoleInfo.color}`}>
                {currentRoleInfo.label}
                <ChevronDownIcon className="ml-2 -mr-1 h-4 w-4" />
            </Menu.Button>
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {ROLE_ACTIONS.map((action) => (
                            <Menu.Item key={action.newRole} disabled={user.role === action.newRole}>
                                {({ active, disabled }) => (
                                    <button
                                        onClick={() => handleRoleChange(action.newRole)}
                                        className={`group flex w-full items-center rounded-md px-2 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} ${disabled ? 'cursor-not-allowed text-gray-400' : ''}`}
                                        disabled={disabled}
                                    >
                                        {action.label}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
        </Menu>
    );
}

const StatusMenu = ({ user, onUpdate }: { user: User, onUpdate: () => void }) => {
    const currentStatusInfo = user.is_active ? USER_STATUSES.active : USER_STATUSES.inactive;

    const handleStatusChange = async (newStatusKey: 'active' | 'inactive') => {
        const newStatus = USER_STATUSES[newStatusKey];
        if (window.confirm(`Bạn có chắc muốn chuyển người dùng này thành "${newStatus.label}"?`)) {
            const endpoint = newStatus.is_active ? 'reactivate-user' : 'deactivate-user';
            try {
                const response = await fetch(`/api-v1/users/${endpoint}/${user.id}`, { method: 'POST' });
                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || 'Cập nhật trạng thái thất bại');
                }
                onUpdate();
            } catch (err: any) {
                alert(`Lỗi: ${err.message}`);
            }
        }
    };

    return (
        <Menu as="div" className="relative inline-block text-left w-full">
            <Menu.Button className={`w-full inline-flex justify-center items-center rounded-md px-3 py-1.5 text-xs font-medium shadow-sm hover:opacity-80 ${currentStatusInfo.color}`}>
                {currentStatusInfo.label}
                <ChevronDownIcon className="ml-2 -mr-1 h-4 w-4" />
            </Menu.Button>
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {STATUS_ACTIONS.map((action) => (
                            <Menu.Item key={action.newStatus} disabled={currentStatusInfo.is_active === (action.newStatus === 'active')}>
                                {({ active, disabled }) => (
                                    <button
                                        onClick={() => handleStatusChange(action.newStatus as any)}
                                        className={`group flex w-full items-center rounded-md px-2 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} ${disabled ? 'cursor-not-allowed text-gray-400' : ''}`}
                                        disabled={disabled}
                                    >
                                        {action.label}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
        </Menu>
    );
};


const UserRow = React.memo(({ user, onUpdate }: { user: User, onUpdate: () => void }) => {

    const isAdmin = user.role === 'admin';
    const currentStatusInfo = user.is_active ? USER_STATUSES.active : USER_STATUSES.inactive;
    const currentRoleInfo = USER_ROLES[user.role as keyof typeof USER_ROLES] ?? USER_ROLES.parent;

    return (
        <tr className="hover:bg-yellow-50 text-sm text-gray-700">
            <td className="py-2 px-4 border">{user.name}</td>
            <td className="py-2 px-4 border">{user.username}</td>
            <td className="py-2 px-4 border relative">
                {isAdmin ? (
                    <span className={`px-3 py-1.5 text-xs font-medium rounded-md ${currentRoleInfo.color}`}>{currentRoleInfo.label}</span>
                ) : (
                    <RoleMenu user={user} onUpdate={onUpdate} />
                )}
            </td>
            <td className="py-2 px-4 border">{formatDate(user.date_created)}</td>
            <td className="py-2 px-4 border relative">
                {isAdmin ? (
                    <span className={`px-3 py-1.5 text-xs font-medium rounded-md ${currentStatusInfo.color}`}>{currentStatusInfo.label}</span>
                ) : (
                    <StatusMenu user={user} onUpdate={onUpdate} />
                )}
            </td>
        </tr>
    );
});

export default function UserTable() {
    const { users, loading, error, fetchUsers } = useUsers();
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
                </tr>
                </thead>
                <tbody>
                    {currentUsers.length > 0 ? currentUsers.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            onUpdate={fetchUsers}
                        />
                    )) : (
                        <tr><td colSpan={5} className="text-center py-10 border text-gray-500">Không có người dùng nào.</td></tr>
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
                {Array.from({length: totalPages}, (_, i) => i + 1).map(pageNumber => (
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