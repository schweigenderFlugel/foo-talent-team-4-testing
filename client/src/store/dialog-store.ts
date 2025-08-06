

import { create } from "zustand"

type DialogState = {
    feedstockDialog: boolean;
}

type DialogActions = {
    setFeedstockDialog: (open: boolean) => void;
}

interface DialogStore extends DialogState, DialogActions {}

const useDialogStore = create<DialogStore>()(
    (set) => ({
        feedstockDialog: false,
        setFeedstockDialog: (open) => set({ feedstockDialog: open }),
    })
)

export default useDialogStore;