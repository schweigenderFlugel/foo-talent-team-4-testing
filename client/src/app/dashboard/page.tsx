import DataTable from "@/components/dashboard/feedstocks/data-table"
import { DetailsFeedstockDialog } from "@/components/dashboard/feedstocks/details-feedstock-dialog"
import { getFeedstocks } from "@/services/api/feedstock"
import { Feedstock } from "@/types/objects/feedstock"



const DashboardPage = async () => {
    const res = await getFeedstocks()
    const initialData = "data" in res ? res.data : []
    console.log(initialData);

    return (<>

        <section className="max-w-[calc(100%-4rem)] mx-auto w-4xl">
            <DataTable initialData={initialData as Feedstock[]} />
            <DetailsFeedstockDialog />
        </section>
    </>)
}

export default DashboardPage