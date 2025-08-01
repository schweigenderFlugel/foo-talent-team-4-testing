"use client"

import { Button } from "@/components/ui/button";
import useUser from "@/hooks/use-user";
import Link from "next/link";


const Navigation = () => {
  const { isLogged } = useUser()

  if (isLogged) {
    return (
      <nav className="hidden md:flex items-center space-x-4">
        < Link
          href="/dashboard"
          className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          Dashboard
        </Link >
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
    )
  }
  else {
    return (
      <div className="flex items-center gap-3">
        <Link href={"/login"}>
          <Button>
            Iniciar Sesión
          </Button>
        </Link>
        <Link href={"/register"} className="hidden md:block">
          <Button variant="outline">
            Registrarme
          </Button>
        </Link>
      </div>
    )
  }

}

export default Navigation