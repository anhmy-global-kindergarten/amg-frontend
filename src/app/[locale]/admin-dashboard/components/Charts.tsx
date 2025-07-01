'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { date: '06/05', count: 2 },
    { date: '07/05', count: 5 },
    { date: '08/05', count: 3 },
    { date: '09/05', count: 4 },
    { date: '10/05', count: 1 },
];

export default function Charts() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-orange-400 font-semibold mb-4">Biểu đồ số lượt đăng ký</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
