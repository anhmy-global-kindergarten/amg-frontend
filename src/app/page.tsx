import Image from "next/image";

export default function LandingPage() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
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

        <main className="text-center px-6 mt-12 flex flex-col items-center">
          <h2 className="text-5xl font-extrabold mb-4">Stream Anytime, Anywhere</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
            Join LiveNest to stream high-quality videos, interact with audiences, and create your own live experience.
          </p>
            <a href="/signup"
               className="px-6 py-3 bg-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-500 transition shadow-lg">
                Get Started
            </a>

            <div className="mt-12 relative w-full max-w-4xl max-h-[500px] overflow-hidden">
                <Image src="/banner.png" width={800} height={350} alt="Live streaming example" className="rounded-lg shadow-xl" />
          </div>
        </main>

        <section id="features" className="mt-16 text-center px-6 w-full max-w-5xl">
          <h3 className="text-3xl font-bold mb-6">Why Choose LiveNest?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">High-Quality Streaming</h4>
              <p className="text-gray-400">Experience ultra-low latency and full HD streaming.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Real-Time Chat</h4>
              <p className="text-gray-400">Engage with your audience through interactive live chat.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Monetization</h4>
              <p className="text-gray-400">Earn revenue through subscriptions and sponsorships.</p>
            </div>
          </div>
        </section>

        <footer className="mt-16 py-6 text-gray-500 text-center w-full border-t border-gray-700">
          &copy; {new Date().getFullYear()} LiveNest. All rights reserved.
        </footer>
      </div>
  );
}
