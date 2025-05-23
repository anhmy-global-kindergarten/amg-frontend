import UserTable from './components/UserTable';
import RegisterTable from './components/RegisterTable';
import Charts from './components/Charts';

export default function AdminDashboard() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-white p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-6 text-center">
                🎓 Bảng điều khiển Admin
            </h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Charts />
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">👤 Quản lý người dùng</h2>
                <UserTable />
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">📝 Đăng ký nhập học</h2>
                <RegisterTable />
            </div>
        </main>
    );
}
