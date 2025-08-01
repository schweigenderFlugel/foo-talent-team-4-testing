import { Button, ButtonProps } from "../ui/button"
import { cn } from "@/lib/utils"

interface PropsSubmitButton extends ButtonProps {
    text: string
    pendingText: string
    isPending: boolean
}

const SubmitButton = ({
    text, pendingText, isPending, ...props
}: PropsSubmitButton) => {

    return (
        <Button type="submit" disabled={isPending} className={cn("w-full", props.className)} {...props}>
            {
                isPending ? pendingText : text
            }
        </Button>
    )
}

export default SubmitButton