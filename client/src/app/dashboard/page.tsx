"use client"
import SubmitButton from "@/components/auth/submit-button"
import useUser from "@/hooks/use-user"
import { useRouter } from "next/navigation"
import { useTransition, useEffect } from "react"


const Dashboard = () => {
    const router = useRouter()
    const [pending, startTransition] = useTransition()
    const { isLogged, user, logout } = useUser()

    useEffect(() => {
        if (!isLogged) {
            router.push("/login")
        }
    }, [isLogged, router]);

    const handleClick = () => {
        startTransition(async () => {
            // Simular una llamada a la API para logout
            await new Promise(resolve => setTimeout(resolve, 2000));
            logout();
            router.push('/login');
        });
    }

    return (
        <main className="min-h-screen text-white text-center content-center">
            <div className="bg-black rounded-xl my-auto max-w-lg mx-auto p-3">
                <h1 className="text-4xl my-2 p-2">Usuario conectado</h1>
                <h2 className="text-2xl font-bold p-2">
                    {user?.email}
                </h2>

                <SubmitButton pendingText="Cerrando" text="Cerrar Sesión" isPending={pending} variant={"destructive"} className="my-3 cursor-pointer" type="button" onClick={handleClick} />
            </div>
        </main>
    )
}

export default Dashboard