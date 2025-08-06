"use server"
import { CreateFeedStock, Feedstock, ResponseFeedstock } from "@/types/objects/feedstock"
import fetcher from "@/utils/fetcher"
import { cookies } from "next/headers"

// GET
const URL = process.env.SERVER_URL + "/feedstocks"
const getToken = async () => {
    const useCookie = await cookies()
    return useCookie.get("access_token")?.value
}

const fetch = async <T>({ method, path, body }: { method?: string, path?: string, body?: BodyInit }) => {
    const token = await getToken()

    if (!token) return { error: "No esta autorizado para continuar con la acción." }
    const res = await fetcher<T>({
        method,
        url: URL + (path ?? ""),
        headers: { "Authorization": `Bearer ${token}` },
        body,
        next: { tags: ["feedstocks"] }
    })
    return res;
}

export const getFeedstocks = async ({
    page = 1,
    limit = 100,
}: { page?: number; limit?: number } = {}) => {
    const res = await fetch<Feedstock[] | { error: string }>({ path: `?limit=${limit}&page=${page}` })
    return res
}

export const getFeedstockById = async ({ id }: { id: string }) => {
    const res = await fetch<Feedstock | { error: string }>({ path: "/" + id })
    return res;
}

// POST
export const postFeedstock = async ({ feedstock }: { feedstock: CreateFeedStock }) => {
    const res = await fetch<ResponseFeedstock>({ body: JSON.stringify(feedstock), method: "POST", })
    return res;
}

// PUT
export const putFeedstock = async ({ id, feedstock }: { id: string, feedstock: Partial<CreateFeedStock> }) => {
    const res = await fetch<ResponseFeedstock>({
        path: "/" + id, method: "PUT",
        body: JSON.stringify(feedstock),
    })

    return res;
}

// DELETE
export const deleteFeedstock = async ({ id }: { id: string }) => {
    const res = await fetch<ResponseFeedstock>({ path: "/" + id, method: "DELETE", })

    return res;
}