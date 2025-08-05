import { CreateFeedStock, Feedstock, ResponseFeedstock } from "@/types/objects/feedstock"
import fetcher from "@/utils/fetcher"
import { cookies } from "next/headers"


// GET

class FeedstockService {
    _URL = process.env.SERVER_URL + "/feedstocks"

    _token = async () => {
        const useCookie = await cookies()
        return useCookie.get("access_token")?.value
    }

    _fetcher = async <T>({ method, path, body }: { method?: string, path?: string, body?: BodyInit }) => {
        const token = await this._token()

        if (!token) return { error: "No esta autorizado para continuar con la acción." }
        const res = await fetcher<T>({
            method,
            url: this._URL + (path ?? ""),
            headers: { "Authorization": `Bearer ${token}` },
            body,
        })
        return res;
    }

    getFeedstocks = async () => {
        const res = await this._fetcher<Feedstock[] | { error: string }>({})
        return res
    }

    getFeedstockById = async ({ id }: { id: string }) => {
        const res = await this._fetcher<Feedstock | { error: string }>({ path: id })
        return res;
    }

    // POST
    postFeedstock = async ({ feedstock }: { feedstock: CreateFeedStock }) => {
        const res = await this._fetcher<ResponseFeedstock>({ body: JSON.stringify(feedstock) })
        return res;
    }

    // PUT
    putFeedstock = async ({ id, feedstock }: { id: string, feedstock: Partial<CreateFeedStock> }) => {
        const res = await this._fetcher<ResponseFeedstock>({
            path: id,
            body: JSON.stringify(feedstock),
        })

        return res;
    }

    // DELETE
    deleteFeedstock = async ({ id }: { id: string }) => {
        const res = await this._fetcher<ResponseFeedstock>({ path: id })

        return res;
    }
}



const feedstockService = new FeedstockService()

export default feedstockService;