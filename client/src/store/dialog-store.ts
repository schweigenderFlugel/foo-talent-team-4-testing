

import { Feedstock } from "@/types/objects/feedstock";
import { create } from "zustand"

type DialogState = {
    feedstockDialog: boolean;
    detailFeedstockDialog: boolean;
    feedstock: Feedstock | null
}

type DialogActions = {
    setFeedstockDialog: (open: boolean) => void;
    setDetailFeedstockDialog: (open: boolean) => void;
    setFeedstock: (fs: Feedstock) => void;
}

interface DialogStore extends DialogState, DialogActions { }

const useDialogStore = create<DialogStore>()(
    (set) => ({
        feedstockDialog: false,
        detailFeedstockDialog: false,
        feedstock: null,
        setFeedstockDialog: (open) => set({ feedstockDialog: open }),
        setDetailFeedstockDialog: (open) => set({ detailFeedstockDialog: open }),
        setFeedstock: (fs) => set({ feedstock: fs })
    })
)

export default useDialogStore;