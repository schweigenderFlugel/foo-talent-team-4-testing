"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeedstocks } from "@/services/api/feedstock";
import { Feedstock } from "@/types/objects/feedstock";

export default function Home() {
  const [feedstocks, setFeedstocks] = useState<Feedstock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeedstocks() {
      const res = await getFeedstocks();

      if ("message" in res && !res.success) {
        setError(res.message ?? null);
      } else if ("data" in res && Array.isArray(res.data)) {
        setFeedstocks(res.data);
      }
      setLoading(false);
    }
    fetchFeedstocks();
  }, []);

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
            Una plataforma simple para manejar tu emprendimiento de manera
            sencilla.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="bg-black border-white text-white hover:bg-white hover:text-black transition"
          >
            Empezar ahora
          </Button>
        </div>
      </section>

      {/* Productos */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Productos</h2>

        {loading && <p className="text-center">Cargando productos...</p>}

        {error && (
          <p className="text-center text-destructive">Error: {error}</p>
        )}

        {!loading && !error && feedstocks.length === 0 && (
          <p className="text-center">No hay productos disponibles.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {!loading &&
            !error &&
            feedstocks.map((prod) => (
              <Card
                key={prod.id}
                className="shadow-sm hover:shadow-md transition"
              >
                <CardHeader>
                  <CardTitle>{prod.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Precio: ${prod.unit_cost}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>
    </div>
  );
}