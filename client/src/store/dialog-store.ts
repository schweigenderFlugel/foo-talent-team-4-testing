

import { Feedstock } from "@/types/objects/feedstock";
import { create } from "zustand"

type DialogState = {
    feedstockDialog: boolean;
    detailFeedstockDialog: boolean;
    feedstock: Feedstock | null;
    updateFeedstock: Feedstock | null;
    updateFeedstockDialog: boolean;
}

type DialogActions = {
    setFeedstockDialog: (open: boolean) => void;
    setDetailFeedstockDialog: (open: boolean) => void;
    setFeedstock: (fs: Feedstock) => void;
    setUpdateFeedstock: (fs: Feedstock) => void;
    setUpdateFeedstockDialog: (open: boolean) => void;
}

interface DialogStore extends DialogState, DialogActions { }

const useDialogStore = create<DialogStore>()(
    (set) => ({
        feedstockDialog: false,
        detailFeedstockDialog: false,
        feedstock: null,
        updateFeedstockDialog: false,
        updateFeedstock: null,
        setFeedstockDialog: (open) => set({ feedstockDialog: open }),
        setDetailFeedstockDialog: (open) => set({ detailFeedstockDialog: open }),
        setFeedstock: (fs) => set({ feedstock: fs }),
        setUpdateFeedstock: (fs) => set({ updateFeedstock: fs }),
        setUpdateFeedstockDialog: (open) => set({ updateFeedstockDialog: open }),

    })
)

export default useDialogStore;