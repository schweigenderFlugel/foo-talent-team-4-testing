
import { MarvelApiResponse, MarvelCharacter } from "@/types/marvel";
import fetcher from "@/utils/fetcher";
import { generateMarvelHash } from "@/utils/marvel";
import { Suspense } from "react";

async function getMarvelCharacters(page: number = 1) {
  const limit = 9;
  const offset = (page - 1) * limit;
  const timestamp = Date.now().toString();
  const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    throw new Error('Marvel API keys are required');
  }

  const hash = generateMarvelHash(timestamp, privateKey, publicKey);

  return fetcher<MarvelApiResponse>({
    url: `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}&orderBy=-modified`,
    errorMessage: "Failed to fetch Marvel characters",
    tags: ["marvel-characters", `page-${page}`],
    revalidate: 3600 // Revalidate every hour
  });
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const response = await getMarvelCharacters(currentPage);

  const characters = response.data?.data.results || [];
  const total = response.data?.data.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / 9));

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CostManager
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Manage your business costs efficiently while enjoying some of Marvel's finest characters
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {response.success ? characters?.map((character: MarvelCharacter) => (
          <Suspense>
            <div
              key={character.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl  group"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {character.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                  {character.description || "No description available"}
                </p>
              </div>
            </div>
          </Suspense>
        ))
          : response.message || 'Failed to fetch characters'
        }
      </div>

      {!response.success ? (
        <div className="text-center mt-8 p-4 bg-red-50 text-red-600 rounded-lg">
          {response.message}
        </div>
      ) : (
        <div className="flex justify-center mt-8">
          <form className="flex items-center space-x-2">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <a
                  key={i}
                  href={`?page=${pageNumber}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg ${currentPage === pageNumber
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    } transition-colors`}
                >
                  {pageNumber}
                </a>
              );
            })}
          </form>
        </div>
      )}
    </div>
  );
}
