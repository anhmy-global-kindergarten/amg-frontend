export default function SignupPage() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">

            <header className="w-full py-6 px-10 flex justify-between items-center border-b border-gray-700">
                <h1 className="text-3xl font-extrabold text-blue-400">LiveNest</h1>
                <nav>
                    <ul className="flex gap-6 text-lg">
                        <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
                        <li><a href="#pricing" className="hover:text-blue-400 transition">Pricing</a></li>
                        <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
                    </ul>
                </nav>
            </header>

            <div className="flex flex-col items-center justify-center flex-grow">
                <h1 className="text-3xl font-extrabold text-blue-400 mb-6">Sign Up for LiveNest</h1>

                <form className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Name</label>
                        <input type="text" className="w-full p-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Email</label>
                        <input type="email" className="w-full p-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Password</label>
                        <input type="password" className="w-full p-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition">
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-gray-400">
                    Already have an account? <a href="/login" className="text-blue-400 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
}
