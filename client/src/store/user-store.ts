import { User } from "@/types/auth/user"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserStore {
    user: User | null,
    setUser: (user: User | null) => void,
    logout: () => void,
}

const initialState: Pick<UserStore, "user"> = {
    user: null,
}

const useUserStore = create<UserStore>()(
    persist((set) => ({
        ...initialState,
        setUser: (user) => set({ user }),
        logout: () => set({ ...initialState })
    }), {
        name: "user-storage"
    })
)

export default useUserStore;