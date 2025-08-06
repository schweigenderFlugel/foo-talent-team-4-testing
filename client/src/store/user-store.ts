import { ObjUser } from "@/types/auth/user"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserStore {
  user: ObjUser | null,
  setUser: (user: ObjUser | null) => void,
  logout: () => void,
  timestamp: number | null
}

const initialState: Pick<UserStore, "user" | "timestamp"> = {
  user: null,
  timestamp: null
}

const useUserStore = create<UserStore>()(
  persist((set) => ({
    ...initialState,
    setUser: (user) =>
      set({
        user,
        timestamp: user ? Date.now() : null,
      }),
    logout: () => set({ ...initialState })
  }), {
    name: "user-storage"
  })
)

export default useUserStore;