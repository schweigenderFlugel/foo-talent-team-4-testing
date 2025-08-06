
import { Button } from "@/components/ui/button";

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
        {/* Contenido principal */}
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight text-white mb-4">
            Bienvenido a TestingApp
          </h1>
          <p className="leading-7 max-w-xl text-gray-200 mb-8">
            Una plataforma simple para manejar tu emprendimiento de manera sencilla.
          </p>
          <Button variant="outline" size="lg" className="bg-black border-white text-white hover:bg-white hover:text-black transition">
            Empezar ahora
          </Button>
        </div>
      </section>

      {/* Cards */}
      <section className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-6 text-left shadow-sm hover:shadow-md transition"
          >
            <h3 className="scroll-m-20 text-xl font-semibold mb-2">
              Feature {i}
            </h3>
            <p className="text-muted-foreground text-sm">
              Breve descripción de algo que eventualmente va a estar disponible en la app.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}