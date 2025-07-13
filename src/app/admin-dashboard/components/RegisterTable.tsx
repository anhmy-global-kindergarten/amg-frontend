"use client";
/* eslint-disable */

import React, {useState, Fragment, useCallback} from "react";
import {Candidate, useCandidates} from "@/app/hooks/useAdminData";
import { format } from "date-fns";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const formatDate = (dateString: string | undefined, dateFormat: string = 'dd/MM/yyyy') => {
    if (!dateString) return 'N/A';
    try {
        return format(new Date(dateString), dateFormat);
    } catch (error) {
        console.error("Error formatting date:", dateString, error);
        return dateString;
    }
};


const CANDIDATE_STATUSES = {
    new: { label: 'Mới', color: 'bg-blue-100 text-blue-800' },
    contacted: { label: 'Đã liên hệ', color: 'bg-yellow-100 text-yellow-800' },
    approved: { label: 'Đã duyệt', color: 'bg-green-100 text-green-800' },
    rejected: { label: 'Từ chối', color: 'bg-red-100 text-red-800' },
    deleted: { label: 'Đã xóa', color: 'bg-gray-200 text-gray-600 line-through' },
    recovered: { label: 'Đã phục hồi', color: 'bg-indigo-100 text-indigo-800' },
};

const CANDIDATE_ACTIONS = [
    { label: 'Mới', newStatus: 'new', endpointSuffix: 'update-candidate' },
    { label: 'Đã liên hệ', newStatus: 'contacted', endpointSuffix: 'update-candidate' },
    { label: 'Duyệt đơn', newStatus: 'approved', endpointSuffix: 'update-candidate' },
    { label: 'Từ chối đơn', newStatus: 'rejected', endpointSuffix: 'update-candidate' },
    { label: 'Xóa (Ẩn đi)', newStatus: 'deleted', endpointSuffix: 'delete-candidate' },
    { label: 'Phục hồi', newStatus: 'recovered', endpointSuffix: 'recovery-candidate' },
];

const StatusMenu = ({ candidate, onUpdate }: { candidate: Candidate, onUpdate: () => void }) => {
    const currentStatusInfo = CANDIDATE_STATUSES[candidate.status as keyof typeof CANDIDATE_STATUSES] || { label: candidate.status, color: 'bg-gray-100 text-gray-800' };

    const handleStatusChange = async (newStatus: string, endpointSuffix: string) => {
        let apiEndpoint = `/api-v1/candidates/${endpointSuffix}/${candidate.id}`;
        let requestBody: any = { status: newStatus };
        let method = 'POST';

        if (endpointSuffix === 'delete-candidate' || endpointSuffix === 'recovery-candidate') {
            requestBody = undefined;
        }

        if (window.confirm(`Bạn có chắc muốn chuyển trạng thái đơn này thành "${CANDIDATE_STATUSES[newStatus as keyof typeof CANDIDATE_STATUSES]?.label || newStatus}"?`)) {
            try {
                const response = await fetch(apiEndpoint, {
                    method: method,
                    headers: requestBody ? { 'Content-Type': 'application/json' } : {},
                    body: requestBody ? JSON.stringify(requestBody) : undefined,
                });

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || 'Cập nhật trạng thái thất bại');
                }
                onUpdate();
            } catch (err: any) {
                alert(`Lỗi: ${err.message}`);
                console.error("Change status error:", err);
            }
        }
    };

    return (
        <Menu as="div" className="relative inline-block text-left w-full">
            <div>
                <Menu.Button className={`w-full inline-flex justify-center items-center rounded-md px-3 py-1.5 text-xs font-medium shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${currentStatusInfo.color}`}>
                    {currentStatusInfo.label}
                    <ChevronDownIcon className="ml-2 -mr-1 h-4 w-4" aria-hidden="true" />
                </Menu.Button>
            </div>
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {CANDIDATE_ACTIONS.map((action) => {
                            if (candidate.status === action.newStatus) return null;
                            if (candidate.status === 'deleted' && action.endpointSuffix !== 'recovery-candidate') return null;
                            if (candidate.status !== 'deleted' && action.endpointSuffix === 'recovery-candidate') return null;

                            return (
                                <Menu.Item key={action.newStatus}>
                                    {({ active }) => (
                                        <button
                                            onClick={() => handleStatusChange(action.newStatus, action.endpointSuffix)}
                                            className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            {action.label}
                                        </button>
                                    )}
                                </Menu.Item>
                            );
                        })}
                    </div>
                </Menu.Items>
        </Menu>
    );
};

export default function RegisterTable() {
    const { candidates, loading, error, fetchCandidates } = useCandidates();
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);

    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentRegistrations = candidates.slice(indexOfFirst, indexOfLast);

    const totalPages = candidates.length > 0 ? Math.ceil(candidates.length / recordsPerPage) : 1;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return <div className="bg-white p-6 rounded-xl shadow-md text-center">Đang tải danh sách đăng ký...</div>;
    }
    if (error) {
        return <div className="bg-white p-6 rounded-xl shadow-md text-center text-red-500">Lỗi tải dữ liệu: {error}</div>;
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md overflow-auto">
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-blue-700">Tổng số: {candidates.length} đơn đăng ký</span>
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
                    <th className="px-4 py-2 border text-left">Học sinh</th>
                    <th className="px-4 py-2 border text-left">Giới tính</th>
                    <th className="px-4 py-2 border text-left">Ngày sinh</th>
                    <th className="px-4 py-2 border text-left">Phụ huynh</th>
                    <th className="px-4 py-2 border text-left">Địa chỉ</th>
                    <th className="px-4 py-2 border text-left">SĐT</th>
                    <th className="px-4 py-2 border text-left">Ngày ĐK</th>
                    <th className="px-4 py-2 border text-left w-48">Trạng thái</th>
                </tr>
                </thead>
                <tbody>
                {currentRegistrations.length > 0 ? currentRegistrations.map((item) => {
                    const currentStatusInfo = CANDIDATE_STATUSES[item.status as keyof typeof CANDIDATE_STATUSES] || { label: item.status, color: 'bg-gray-100 text-gray-800' };
                    return (
                        <tr key={item.id} className="hover:bg-yellow-50 text-sm text-gray-700">
                            <td className="py-2 px-4 border">{item.student_name}</td>
                            <td className="py-2 px-4 border">{item.gender}</td>
                            <td className="py-2 px-4 border">{formatDate(item.dob)}</td>
                            <td className="py-2 px-4 border">{item.parent_name}</td>
                            <td className="py-2 px-4 border">{item.address}</td>
                            <td className="py-2 px-4 border">{item.phone}</td>
                            <td className="py-2 px-4 border">{formatDate(item.create_at, 'dd/MM/yyyy HH:mm')}</td>
                            <td className="py-2 px-4 border">
                                <StatusMenu candidate={item} onUpdate={fetchCandidates} />
                            </td>
                        </tr>
                    );
                }) : (
                    <tr>
                        <td colSpan={9} className="text-center py-10 border text-gray-500">Không có đơn đăng ký nào.</td>
                    </tr>
                )}
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
                    className="px-3 py-1 rounded bg-blue-100 hover:bg-orange-200 text-sm text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                >
                    Tiếp →
                </button>
            </div>
        </div>
    );
}
