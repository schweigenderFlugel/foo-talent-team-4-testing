"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDetailDialog } from "@/hooks/use-feedstock-dialog"


export function DetailsFeedstockDialog() {
    const { isOpen, setIsOpen, feedstock } = useDetailDialog()
    if (!feedstock) return null
    const formatDate = (dateString: Date) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Feedstock Details</DialogTitle>
                    <DialogDescription>
                        Complete information about the feedstock item.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <span className="font-semibold">ID:</span>
                            <span className="col-span-2 font-mono text-sm">{feedstock.id}</span>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <span className="font-semibold">Name:</span>
                            <span className="col-span-2">{feedstock.name}</span>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <span className="font-semibold">Description:</span>
                            <span className="col-span-2">{feedstock.description}</span>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <span className="font-semibold">Measure Unit:</span>
                            <span className="col-span-2">{feedstock.measure_unit}</span>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <span className="font-semibold">Unit Cost:</span>
                            <span className="col-span-2">{formatCurrency(feedstock.unit_cost)}</span>
                        </div>
                        {feedstock.provider && (
                            <div className="grid grid-cols-3 items-center gap-4">
                                <span className="font-semibold">Provider:</span>
                                <span className="col-span-2">{feedstock.provider}</span>
                            </div>
                        )}
                        <div className="grid grid-cols-3 items-center gap-4">
                            <span className="font-semibold">Created At:</span>
                            <span className="col-span-2">{formatDate(feedstock.created_at)}</span>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <span className="font-semibold">Updated At:</span>
                            <span className="col-span-2">{formatDate(feedstock.updated_at)}</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
