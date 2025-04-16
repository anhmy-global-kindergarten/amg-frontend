import Image from "next/image";

export default function HomePage() {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">

            {/* Header Navbar */}
            <header className="w-full py-6 px-10 flex justify-between items-center border-b border-gray-700">
                <h1 className="text-3xl font-extrabold text-blue-400">LiveNest</h1>
                <nav>
                    <ul className="flex gap-6 text-lg">
                        <li><a href="#live" className="hover:text-blue-400 transition">Live Now</a></li>
                        <li><a href="#categories" className="hover:text-blue-400 transition">Categories</a></li>
                        <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
                    </ul>
                </nav>
            </header>

            {/* Live Now Section */}
            <section id="live" className="mt-12 px-10">
                <h3 className="text-3xl font-bold mb-6">Live Now</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array(4).fill(0).map((_, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                            <Image src="/live-placeholder.png" width={300} height={200} alt="Live Stream" className="rounded-lg" />
                            <h4 className="text-lg font-semibold mt-2">Streamer {index + 1}</h4>
                            <p className="text-gray-400 text-sm">Live viewers: {Math.floor(Math.random() * 1000)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section id="categories" className="mt-16 px-10">
                <h3 className="text-3xl font-bold mb-6">Popular Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {["Gaming", "Music", "Education", "Tech"].map((category, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md text-center">
                            <h4 className="text-xl font-semibold">{category}</h4>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-16 py-6 text-gray-500 text-center w-full border-t border-gray-700">
                &copy; {new Date().getFullYear()} LiveNest. All rights reserved.
            </footer>
        </div>
    );
}
