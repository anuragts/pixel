import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="bg-slate-50 min-h-screen px-12">
      <div className="w-full">
        <header className="flex justify-between items-center py-8 px-6">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="text-red-500">PIX</span>EL
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  About
                </a>
              </li>
              <li>
                <a href="https://twitter.com/theanuragdev" className="text-gray-600 hover:text-gray-800">
                  Team
                </a>
              </li>
              <li>
                <Link href="https://github.com/anuragts" className="text-gray-600 hover:text-gray-800">
                  Opensource
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="flex flex-col md:flex-row items-center md:justify-between py-16">
          <section className="text-center md:text-left p-8 md:w-1/2">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Forget about your messy Notes.
            </h2>
            <p className="text-gray-600 mb-8">
              AI-powered note-taking app designed to supercharge <br />
              your note-taking process.
            </p>
            <Link href={'/notes'}>
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
              Try now
            </button>
            </Link>
          </section>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <Image
              src="/image.png"
              alt="Illustration"
              width={500}
              height={300}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
