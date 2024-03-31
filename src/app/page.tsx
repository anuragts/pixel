import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="bg-background min-h-screen px-12">
      <div className="w-full">
        <header className="flex justify-between items-center py-8 px-6">
          <h1 className="text-3xl font-bold text-foreground">
            <span className="text-primary">PIX</span>EL
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/notes" className="text-foreground hover:text-primary-foreground">
                  My Notes
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-foreground hover:text-primary-foreground">
                  Login
                </Link>
              </li>
              {/* <li>
                <Link href="" className="text-foreground hover:text-primary-foreground">
                  github
                </Link>
              </li> */}
            </ul>
          </nav>
        </header>
        <div className="flex flex-col md:flex-row items-center md:justify-between py-16">
          <section className="text-center md:text-left p-8 md:w-1/2">
            <h2 className="text-5xl font-bold text-secondary-foreground mb-4">
              Forget about your messy Notes.
            </h2>
            <p className="text-primary mb-8">
              AI-powered note-taking app designed to supercharge <br />
              your note-taking process.
            </p>
            <Link href={'/notes'}>
            <button className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-foreground hover:text-primary">
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
