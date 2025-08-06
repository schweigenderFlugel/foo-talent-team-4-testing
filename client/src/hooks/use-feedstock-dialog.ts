import useDialogStore from '@/store/dialog-store'
import { useShallow } from 'zustand/react/shallow'

const useDialog = () => {
    const isOpen = useDialogStore((state) => state.feedstockDialog)
    const setIsOpen = useDialogStore((state) => state.setFeedstockDialog)

    return {
        isOpen,
        setIsOpen,
        close: () => setIsOpen(false)
    }
}


export const useDetailDialog = () => {
    const { isOpen, setIsOpen, feedstock, setFeedstock } = useDialogStore(useShallow((state) => ({
        isOpen: state.detailFeedstockDialog,
        setIsOpen: state.setDetailFeedstockDialog,
        feedstock: state.feedstock,
        setFeedstock: state.setFeedstock

    })))

    return {
        isOpen,
        setIsOpen,
        feedstock,
        setFeedstock
    }
}

export default useDialog