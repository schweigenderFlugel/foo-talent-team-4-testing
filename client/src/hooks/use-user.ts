"use client"
import { useEffect } from "react"
import useUserStore from "@/store/user-store"

const THIRTY_MINUTES = 30 * 60 * 1000 // 30 minutos en milisegundos por el valor de la cookie del token

const useUser = () => {
    const { user, timestamp, logout, setUser } = useUserStore()

    useEffect(() => {
        const now = Date.now()

        const expired = timestamp && now - timestamp > THIRTY_MINUTES

        if (!user || expired) {
            logout()
            try {
                localStorage.removeItem("user-storage") // limpieza manual por si acaso
            } catch (e) {
                console.error("Error clearing localStorage:", e)
            }
        }
    }, [timestamp, user, logout])

    return { user, setUser, logout }
}

export default useUser