/* eslint-disable */
import { useState, useEffect } from 'react';

export interface User {
    id: string;
    username: string;
    name: string;
    role: string;
    date_created: string;
    update_at: string;
    is_active: boolean;
}

export interface Candidate {
    id: string;
    student_name: string;
    gender: string;
    dob: string;
    parent_name: string;
    address: string;
    phone: string;
    status: string;
    create_at: string;
    update_at: string;
}

export interface ChartDataPoint {
    date: string;
    count: number;
}

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api-v1/users/get-all-user`);
                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data: User[] = await res.json();
                setUsers(data || []);
            } catch (err: any) {
                setError(err.message);
                console.error("Fetch users error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    return { users, loading, error, setUsers };
}

export function useCandidates() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api-v1/candidates/get-all-candidates`);
                if (!res.ok) {
                    throw new Error('Failed to fetch candidates');
                }
                const data: Candidate[] = await res.json(); // Ép kiểu về Candidate[]
                setCandidates(data || []);
            } catch (err: any) {
                setError(err.message);
                console.error("Fetch candidates error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCandidates();
    }, []);
    return { candidates, loading, error, setCandidates };
}

export function useRegistrationChartData() {
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChartData = async () => {
            setLoading(true);
            setError(null);
            try {
                // GIẢ SỬ bạn có một API endpoint như sau:
                // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/amg/v1/analytics/registrations-over-time`);
                // if (!res.ok) throw new Error('Failed to fetch chart data');
                // const data: ChartDataPoint[] = await res.json();
                // setChartData(data || []);

                // Dữ liệu giả lập trong khi chờ API
                await new Promise(resolve => setTimeout(resolve, 500));
                const mockData: ChartDataPoint[] = [
                    { date: '06/05', count: 2 }, { date: '07/05', count: 5 },
                    { date: '08/05', count: 3 }, { date: '09/05', count: 4 },
                    { date: '10/05', count: 1 }, { date: '11/05', count: 7 },
                ];
                setChartData(mockData);
            } catch (err: any) {
                setError(err.message);
                console.error("Fetch chart data error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchChartData();
    }, []);
    return { chartData, loading, error };
}