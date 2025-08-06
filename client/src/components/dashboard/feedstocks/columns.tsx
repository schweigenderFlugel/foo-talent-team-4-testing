import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDetailDialog, useUpdateDialog } from "@/hooks/use-feedstock-dialog"
import { deleteFeedstock, getFeedstockById, putFeedstock } from "@/services/api/feedstock"
import { Feedstock } from "@/types/objects/feedstock"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const columns: ColumnDef<Feedstock>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div>{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "measure_unit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Measure Unit
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("measure_unit")}</div>,
  },
  {
    accessorKey: "unit_cost",
    header: () => <div className="text-right">Unit Cost</div>,
    cell: ({ row }) => {
      const unit_cost = parseFloat(row.getValue("unit_cost"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(unit_cost)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter()
      const { setIsOpen, setFeedstock } = useDetailDialog()
      const { setIsOpen: setIsOpenUpdate, setUpdateFeedstock } = useUpdateDialog()
      const feedstock = row.original
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
        } else if ("message" in res) (
          toast(res.message)
        )
      }

      const onEdit = () => {
        // const res = await putFeedstock({ id: feedstock.id, feedstock });
        // console.log(res);
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(feedstock.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDetail}>Details</DropdownMenuItem>
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


export default columns