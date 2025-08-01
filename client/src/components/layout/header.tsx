import Link from "next/link";
import { Button } from "../ui/button";

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

          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/#"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Costs
            </Link>
            <Link
              href="/#"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Reports
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href={"/login"}>
              <Button>
                Iniciar Sesión
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button variant="outline">
                Registrarme
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
