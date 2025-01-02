import React, { useState } from "react"

// Types
import Alert from "../types/alert"

// Components
import CAlert from "../components/CAlert"
import { useLayout } from "../../layout/hooks/useLayout"

interface AlertSectionProps {}

const AlertSection: React.FC<AlertSectionProps> = () => {
    // Stores
    const alertStack = useLayout((state) => state.alertStack)
    const removeAlert = useLayout((state) => state.removeAlert)

    return (
        <div className="flex flex-col fixed top-10 left-0 right-0 z-50 gap-8">
            {alertStack.map((alert: Alert) => (
                <CAlert
                    key={alert.id}
                    message={alert.message}
                    onClose={() => {
                        // Remove alert from stack
                        removeAlert(alert.id)
                    }}
                    type={alert.type}
                    id={alert.id}
                />
            ))}
        </div>
    )
}

export default AlertSection
