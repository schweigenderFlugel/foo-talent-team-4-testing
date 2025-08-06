// hooks/use-user.ts
import { useEffect } from "react"
import useUserStore from "@/store/user-store"

const THIRTY_MINUTES = 30 * 60 * 1000

const useUser = () => {
    const { user, timestamp, logout, setUser } = useUserStore()

    useEffect(() => {
        if (!user || !timestamp) return // Si no hay user o timestamp, no hacemos nada

        const now = Date.now()
        const expired = now - timestamp > THIRTY_MINUTES

        if (expired) {
            logout()
            try {
                localStorage.removeItem("user-storage")
            } catch (e) {
                console.error("Error clearing localStorage:", e)
            }
        }
    }, [timestamp, user, logout])

    return { user, setUser, logout }
}

export default useUser
