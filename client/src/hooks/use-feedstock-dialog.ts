import useDialogStore from '@/store/dialog-store'

const useDialog = () => {
    const isOpen = useDialogStore((state) => state.feedstockDialog)
    const setIsOpen = useDialogStore((state) => state.setFeedstockDialog)

    return {
        isOpen,
        setIsOpen,
        close: () => setIsOpen(false)
    }
}

export default useDialog