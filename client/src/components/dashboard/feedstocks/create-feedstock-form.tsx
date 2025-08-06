"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MeasureUnit } from "@/types/objects/feedstock"
import { Plus } from "lucide-react"
import { postFeedstock } from "@/services/api/feedstock"
import { feedstockSchema, FormDataFeedstock } from "@/lib/zod/objects/feedstock-schema"
import useDialog from "@/hooks/use-feedstock-dialog"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface CreateFeedstockFormProps {
}
const defaultValues = {
    name: "",
    description: "",
    measure_unit: MeasureUnit.KILOGRAMMS,
    unit_cost: 0,
    provider: "",
}
export function CreateFeedstockForm({ }: CreateFeedstockFormProps) {
    const router = useRouter()
    const { isOpen, setIsOpen } = useDialog()
    const [message, setMessage] = useState<string>("")
    const form = useForm<FormDataFeedstock>({
        resolver: zodResolver(feedstockSchema),
        defaultValues
    })

    const onSubmit = async (values: FormDataFeedstock) => {
        setMessage("")
        const response = await postFeedstock({ feedstock: values })
        if (!('error' in response) && response.success) {
            form.reset()
            setIsOpen(false)
            router.refresh()
            toast(response.message)
        } else {
            const msg = () => {
                if ("message" in response && response.message) return response.message;
                else if ("error" in response) return response.error;
                return "Ocurrio un error"
            }
            setMessage(msg())
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feedstock
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Feedstock</DialogTitle>
                    <DialogDescription>
                        Add the details for the new feedstock item.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="measure_unit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Measure Unit</FormLabel>
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a unit" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(MeasureUnit).map((unit) => (
                                                <SelectItem key={unit} value={unit}>
                                                    {unit}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="unit_cost"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unit Cost</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter unit cost"
                                            {...field}
                                            onChange={e => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="provider"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Provider (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter provider" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="sm:justify-between items-center">
                            <p className="text-sm w-fit text-red-500">{message}</p>
                            <Button type="submit">Create Feedstock</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
