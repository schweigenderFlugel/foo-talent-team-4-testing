import Link from "next/link";
import dynamic from "next/dynamic";

const Navigation = dynamic(
  () => import("./navigation"), {
  loading: () => (<div className="flex items-center gap-3">
    <div className="border bg-black rounded-xl  h-9 w-20">
    </div>

    <div className="border border-mutted-foreground rounded-xl h-9 w-20">
    </div>

  </div >)
})

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              TestingApp
            </Link>
          </div>

          <Navigation />

        </div>
      </div>
    </header>
  );
}
