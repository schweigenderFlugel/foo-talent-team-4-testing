import DataTable from "@/components/dashboard/feedstocks/data-table"
import { DetailsFeedstockDialog } from "@/components/dashboard/feedstocks/details-feedstock-dialog"
import UpdateFeedstockForm from "@/components/dashboard/feedstocks/update-feedstock-form"
import { getFeedstocks } from "@/services/api/feedstock"
import { Feedstock } from "@/types/objects/feedstock"

export const metadata = { title: "Dashboard" }

const DashboardPage = async () => {
    const res = await getFeedstocks()
    if ("message" in res && !res.success) return <div>Error: {res.message}</div>

    const initialData = "data" in res ? res.data : []

    return (<>

        <section className="max-w-[calc(100%-4rem)] mx-auto w-4xl">
            <DataTable initialData={initialData as Feedstock[]} />
            <DetailsFeedstockDialog />
            <UpdateFeedstockForm />
        </section>
    </>)
}

export default DashboardPage