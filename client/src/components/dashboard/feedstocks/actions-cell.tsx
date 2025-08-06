"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDetailDialog, useUpdateDialog } from "@/hooks/use-feedstock-dialog"
import { deleteFeedstock, getFeedstockById } from "@/services/api/feedstock"
import { Feedstock } from "@/types/objects/feedstock"
import { useRouter } from "next/navigation"
import { MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

interface Props {
    feedstock: Feedstock
}

const ActionsCell = ({ feedstock }: Props) => {
    const router = useRouter()
    const { setIsOpen, setFeedstock } = useDetailDialog()
    const { setIsOpen: setIsOpenUpdate, setUpdateFeedstock } = useUpdateDialog()

    const onDelete = async () => {
        const res = await deleteFeedstock({ id: feedstock.id });
        if (!('error' in res) && res.success) {
            router.refresh()
            toast(res.message)
        }
    }

    const onDetail = async () => {
        const res = await getFeedstockById({ id: feedstock.id });
        if (!('error' in res) && res.success && res.data && "name" in res.data) {
            setIsOpen(true)
            setFeedstock(res.data)
        } else if ("message" in res) {
            toast(res.message)
        }
    }

    const onEdit = () => {
        setIsOpenUpdate(true)
        setUpdateFeedstock(feedstock)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(feedstock.id)}>
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDetail}>Details</DropdownMenuItem>
                <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ActionsCell
