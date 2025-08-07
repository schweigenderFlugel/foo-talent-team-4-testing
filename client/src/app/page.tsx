import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle, PackagePlus, Settings, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative w-full h-[400px]">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/405/151/750/light-wall-background-hd-wallpaper-preview.jpg"
          alt="Landing hero"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight text-white mb-4">
            Bienvenido a TestingApp
          </h1>
          <p className="leading-7 max-w-xl text-gray-200 mb-8">
            Una plataforma moderna para administrar insumos y controlar tu
            negocio con eficiencia.
          </p>
          <Link href="/#features">
            <Button
              variant="outline"
              size="lg"
              className="bg-black border-white text-white hover:bg-white hover:text-black transition"
            >
              Empezar ahora
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container max-w-[calc(100vw-4rem))] mx-auto px-4 py-16" id="features">
        <h2 className="text-3xl font-bold text-center mb-12">
          ¿Qué podés hacer con TestingApp?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <PackagePlus className="mx-auto h-10 w-10 text-blue-500" />
              <CardTitle className="text-xl mt-2">Crear Insumos</CardTitle>
            </CardHeader>
            <CardContent>
              Agregá fácilmente nuevos productos con sus datos como unidad de
              medida y costo.
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Settings className="mx-auto h-10 w-10 text-green-500" />
              <CardTitle className="text-xl mt-2">Editar Registros</CardTitle>
            </CardHeader>
            <CardContent>
              Actualizá información en tiempo real desde el dashboard.
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="mx-auto h-10 w-10 text-yellow-500" />
              <CardTitle className="text-xl mt-2">Visualización Clara</CardTitle>
            </CardHeader>
            <CardContent>
              Tabla moderna con filtros y control por columnas para encontrar
              todo fácilmente.
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <ShieldCheck className="mx-auto h-10 w-10 text-purple-500" />
              <CardTitle className="text-xl mt-2">Seguridad por Rol</CardTitle>
            </CardHeader>
            <CardContent>
              Acceso restringido: solo administradores pueden modificar los
              datos.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-muted py-16 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Listo para organizar tu gestión de insumos</h2>
        <p className="max-w-xl mx-auto mb-6 text-muted-foreground">
          Unite a TestingApp y llevá el control de tu emprendimiento al
          siguiente nivel.
        </p>
        <Link className="text-white text-lg px-6 py-2 bg-black rounded-md hover:bg-white hover:text-black transition border border-black font-medium" href={"/login"}>
          Comenzar ahora
        </Link>
      </section>
    </div>
  )
}
