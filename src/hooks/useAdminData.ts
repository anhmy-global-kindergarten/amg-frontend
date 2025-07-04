/* eslint-disable */
import {useState, useEffect, useCallback} from 'react';

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

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.');
        (error as any).info = await res.json();
        (error as any).status = res.status;
        throw error;
    }
    return res.json();
};

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetcher(`/api-v1/users/get-all-user`);
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                setUsers([]);
                console.warn("API did not return an array for users:", data);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch users');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // const updateUserStatus = useCallback(async (userId: string, isActive: boolean) => {
    //     const endpoint = isActive ? 'reactivate-user' : 'deactivate-user';
    //
    //     try {
    //         const response = await fetch(`/api-v1/users/${endpoint}/${userId}`, { method: 'POST' });
    //         if (!response.ok) {
    //             const errData = await response.json();
    //             throw new Error(errData.error || 'Cập nhật trạng thái thất bại');
    //         }
    //         setUsers(prev =>
    //             prev.map(u => u.id === userId ? { ...u, is_active: isActive } : u)
    //         );
    //     } catch (err: any) {
    //         alert(`Lỗi: ${err.message}`);
    //     }
    // }, []);
    //
    // const updateUserRole = useCallback(async (userId: string, newRole: string) => {
    //     try {
    //         const response = await fetch(`/api-v1/users/update-user/${userId}`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ role: newRole }),
    //         });
    //
    //         if (!response.ok) {
    //             const errData = await response.json();
    //             throw new Error(errData.error || 'Cập nhật vai trò thất bại');
    //         }
    //
    //         setUsers(prev =>
    //             prev.map(u => u.id === userId ? { ...u, role: newRole } : u)
    //         );
    //
    //     } catch (err: any) {
    //         alert(`Lỗi: ${err.message}`);
    //     }
    // }, []);

    return { users, loading, error, fetchUsers };
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