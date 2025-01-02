export default interface Alert {
    id: number
    message: string
    onClose: (id: number) => void
    type: "success" | "error" | "warning"
    className?: string
}
