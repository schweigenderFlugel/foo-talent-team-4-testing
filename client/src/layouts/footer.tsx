import { Toaster } from "@/components/ui/sonner"

export function Footer() {
  return (
    <>
      <Toaster />
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} TestingApp
              </p>
            </div>

            <nav className="flex items-center space-x-4">
              <p
                className="text-sm text-gray-500 hover:text-gray-900 w-fit cursor-not-allowed opacity-75"
              >
                Privacy Policy
              </p>
              <p
                className="text-sm text-gray-500 hover:text-gray-900 w-fit cursor-not-allowed opacity-75"
              >
                Terms of Service
              </p>
              <p
                className="text-sm text-gray-500 hover:text-gray-900 w-fit cursor-not-allowed opacity-75"
              >
                Contact
              </p>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
