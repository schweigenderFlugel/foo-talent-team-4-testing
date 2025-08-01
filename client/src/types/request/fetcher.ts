
export interface FetcherProps extends RequestInit {
    url: string | URL;
    tags?: string[];
    revalidate?: number;
    successMessage?: string | null;
    errorMessage?: string | null;
}
