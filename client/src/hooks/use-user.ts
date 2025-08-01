
import useUserStore from "@/store/user-store";

const useUser = () => {
    const useUser = useUserStore()

    return useUser
}

export default useUser