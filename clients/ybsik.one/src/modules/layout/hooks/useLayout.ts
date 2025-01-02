import { create } from "zustand"

// Types
import { Alert } from "../../common"

interface useLayoutState {
    alertStack: Alert[]
    addAlert: (alert: Alert) => void
    removeAlert: (id: number) => void
    clearAlerts: () => void
}

export const useLayout = create<useLayoutState>((set) => ({
    alertStack: [],
    addAlert: (alert: Alert) =>
        set((state) => ({ alertStack: [...state.alertStack, alert] })),
    removeAlert: (id: number) =>
        set((state) => ({
            alertStack: state.alertStack.filter((alert) => alert.id !== id),
        })),
    clearAlerts: () => set({ alertStack: [] }),
}))
