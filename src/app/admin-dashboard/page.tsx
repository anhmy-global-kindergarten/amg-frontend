import UserTable from './components/UserTable';
import RegisterTable from './components/RegisterTable';
import Charts from './components/Charts';

export default function AdminDashboard() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-white p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-6 text-center">
                🎓 Bảng điều khiển Admin
            </h1>

            {/* Biểu đồ */}
            <div className="grid gap-6 md:grid-cols-2">
                <Charts />
                {/* Có thể thêm biểu đồ khác tại đây */}
            </div>

            {/* Quản lý tài khoản người dùng */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">👤 Quản lý người dùng</h2>
                <UserTable />
            </div>

            {/* Quản lý đăng ký nhập học */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">📝 Đăng ký nhập học</h2>
                <RegisterTable />
            </div>
        </main>
    );
}
