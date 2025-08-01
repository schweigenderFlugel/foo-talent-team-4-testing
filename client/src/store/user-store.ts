import { User } from "@/types/auth/user"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserStore {
    user: User | null,
    isLogged: boolean,
    setUser: (user: User | null) => void,
    setIsLogged: (state: boolean) => void,
    logout: () => void,
}

const initialState: Pick<UserStore, "user" | "isLogged"> = {
    user: null,
    isLogged: false
}

const useUserStore = create<UserStore>()(
    persist((set) => ({
        ...initialState,
        setUser: (user) => set({ user }),
        setIsLogged: (state) => set({ isLogged: state }),
        logout: () => set({ ...initialState })
    }), {
        name: "user-storage"
    })
)

export default useUserStore;