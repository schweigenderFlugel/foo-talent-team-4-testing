"use client"

import { Button } from "@/components/ui/button"
import useUser from "@/hooks/use-user"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

const LogoutButton = () => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const { user, logout } = useUser()

    const handleLogout = () => {
        startTransition(async () => {
            try {
                const response = await fetch('/api/auth/logout')

                if (response.ok) {
                    toast("Sesión cerrada correctamente")
                    logout()
                    router.push('/login')
                } else {
                    toast.error("Error al cerrar sesión")
                }
            } catch (error) {
                console.error('Error al cerrar sesión:', error)
                toast.error("Ocurrió un error inesperado")
            }
        })
    }

    if (!user) return null;
    return (<>
        <p className="text-gray-600  flex flex-col px-3 py-2">
            <span className="text-[0.7rem] text-muted-foreground">{user.role}</span>
            <span className="text-[0.8rem] font-medium">{user.email}</span>
        </p>
        <Button onClick={handleLogout} type="button" disabled={isPending}>
            {isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
        </Button>
    </>
    )
}

export default LogoutButton
