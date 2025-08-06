import { FetcherProps } from "@/types/request/fetcher";


interface Response<T> { message?: string, success: boolean, data?: T }

const fetcher = async<T>({ url, tags = [], revalidate, errorMessage, ...options }: FetcherProps): Promise<Response<T>> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            },
            next: { tags, revalidate }
        });
        clearTimeout(timeout);

        // if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);

        const data = await response.json();
        return { data, success: response.ok, message: data.detail ?? data.message ?? "Success" };

    } catch (error) {
        clearTimeout(timeout);
        return {
            message: error instanceof Error ? error.message : errorMessage || 'Internal Server Error',
            success: false
        };
    }
};

export default fetcher;