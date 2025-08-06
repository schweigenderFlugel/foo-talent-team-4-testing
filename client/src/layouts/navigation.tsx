"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import useUser from "@/hooks/use-user"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import LogoutButton from "./logout-button"

const Navigation = () => {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(prev => !prev)

  const navItems = (
    <>
      <Link
        href="/dashboard"
        className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Dashboard
      </Link>
      <p
        className="block cursor-not-allowed opacity-75 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Costs
      </p>
      <p
        className="block cursor-not-allowed opacity-75 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Reports
      </p>
      <LogoutButton />
    </>
  )

  if (user != null) {
    return (
      <div className="flex items-center">
        {/* Mobile */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={toggleMenu} size="icon">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Desktop */}
        <nav className="hidden md:flex items-center space-x-4">
          {navItems}
        </nav>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-50">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems}
            </nav>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div className="flex items-center gap-3">
        <Link href={"/login"}>
          <Button>
            Iniciar Sesión
          </Button>
        </Link>
        <Link href={"/register"} className="md:block hidden">
          <Button variant="outline">
            Registrarme
          </Button>
        </Link>
      </div>
    )
  }
}

export default Navigation