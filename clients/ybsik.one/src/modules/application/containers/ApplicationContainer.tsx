import React, { useState } from "react"
import {
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaTrash,
    FaEdit,
} from "react-icons/fa"
import { CButton } from "../../common"
import useApplicationStore from "../hooks/useApplication"

export interface Application {
    id: number
    name: string
    status: "approved" | "rejected" | "pending"
    age: number
    appliedProject: string
    gender: "Male" | "Female"
    experience: number
    field: string
    salaryExpectation: number
}

const ApplicationContainer: React.FC = () => {
    // Stores
    const applications = useApplicationStore((state) => state.applications)
    const setApplications = useApplicationStore(
        (state) => state.setApplications
    )

    // States
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    const groupedApplications = applications.reduce((acc, application) => {
        if (!acc[application.status]) {
            acc[application.status] = []
        }
        acc[application.status].push(application)
        return acc
    }, {} as Record<string, Application[]>)

    const renderIcon = (status: string) => {
        switch (status) {
            case "approved":
                return <FaCheckCircle className="text-1" />
            case "rejected":
                return <FaTimesCircle className="text-4" />
            case "pending":
                return <FaClock className="text-5" />
            default:
                return null
        }
    }

    // Handlers
    const handleDelete = (id: number) => {
        setApplications(applications.filter((app) => app.id !== id))
    }

    const handleChangeStatus = (
        id: number,
        newStatus: Application["status"]
    ) => {
        setApplications(
            applications.map((app) =>
                app.id === id ? { ...app, status: newStatus } : app
            )
        )
    }

    const handleShowFile = (type: string, name: string) => {
        const temporaryLink = `https://www.orimi.com/pdf-test.pdf` // Replace later :D
        window.open(temporaryLink, "_blank")
    }

    const handleSort = () => {
        const sortedApplications = [...applications].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.name.localeCompare(b.name)
            } else {
                return b.name.localeCompare(a.name)
            }
        })
        setApplications(sortedApplications)
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    }

    return (
        <div className="p-4 container">
            <CButton onClick={handleSort} className="mb-16">
                Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"}
                )
            </CButton>
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">
                    Pending ({groupedApplications["pending"]?.length || 0})
                </h2>
                <div className="space-y-2">
                    {[...(groupedApplications["pending"] || [])]
                        .sort((a, b) => {
                            if (sortOrder === "asc") {
                                return a.name.localeCompare(b.name)
                            } else {
                                return b.name.localeCompare(a.name)
                            }
                        })
                        .map((application) => (
                            <div
                                key={application.id}
                                className={`flex items-center p-4 border-gray-300 border-b`}
                            >
                                <div className="mr-4">
                                    {renderIcon(application.status)}
                                </div>
                                <div className="flex-1">{application.name}</div>
                                <CButton
                                    onClick={() =>
                                        handleChangeStatus(
                                            application.id,
                                            "approved"
                                        )
                                    }
                                    secondary
                                    className={`mr-2 ${
                                        application.status === "approved"
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                    disabled={application.status === "approved"}
                                >
                                    Approve
                                </CButton>
                                <CButton
                                    onClick={() =>
                                        handleChangeStatus(
                                            application.id,
                                            "rejected"
                                        )
                                    }
                                    secondary
                                    className={`mr-2 ${
                                        application.status === "rejected"
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                    disabled={application.status === "rejected"}
                                >
                                    Reject
                                </CButton>
                                <CButton
                                    onClick={() =>
                                        handleChangeStatus(
                                            application.id,
                                            "pending"
                                        )
                                    }
                                    secondary
                                    className={`mr-2 ${
                                        application.status === "pending"
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                    disabled={application.status === "pending"}
                                >
                                    Pending
                                </CButton>
                                <CButton
                                    onClick={() => handleDelete(application.id)}
                                    secondary
                                >
                                    <FaTrash />
                                </CButton>
                                <div className="ml-4 flex space-x-2">
                                    <CButton
                                        onClick={() =>
                                            handleShowFile(
                                                "resume",
                                                application.name
                                            )
                                        }
                                        secondary
                                    >
                                        Inspectate Resume/CV
                                    </CButton>
                                    <CButton
                                        onClick={() =>
                                            handleShowFile(
                                                "cover-letter",
                                                application.name
                                            )
                                        }
                                        secondary
                                    >
                                        Inspectate Cover Letter
                                    </CButton>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {Object.keys(groupedApplications)
                .filter((status) => status !== "pending")
                .map((status) => (
                    <div key={status} className="mb-6">
                        <h2 className="text-xl font-bold mb-2">
                            {status} ({groupedApplications[status].length})
                        </h2>
                        <div className="space-y-2">
                            {[...groupedApplications[status]]
                                .sort((a, b) => {
                                    if (sortOrder === "asc") {
                                        return a.name.localeCompare(b.name)
                                    } else {
                                        return b.name.localeCompare(a.name)
                                    }
                                })
                                .map((application) => (
                                    <div
                                        key={application.id}
                                        className={`flex items-center p-4 border-b border-gray-300 
                                            bg-${
                                                status === "approved"
                                                    ? "green"
                                                    : "red"
                                            }-50
                                        `}
                                    >
                                        <div className="mr-4">
                                            {renderIcon(application.status)}
                                        </div>
                                        <div className="flex-1">
                                            {application.name}
                                        </div>
                                        <CButton
                                            onClick={() =>
                                                handleChangeStatus(
                                                    application.id,
                                                    "approved"
                                                )
                                            }
                                            secondary
                                            className={`mr-2 ${
                                                application.status ===
                                                "approved"
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            disabled={
                                                application.status ===
                                                "approved"
                                            }
                                        >
                                            Approve
                                        </CButton>
                                        <CButton
                                            onClick={() =>
                                                handleChangeStatus(
                                                    application.id,
                                                    "rejected"
                                                )
                                            }
                                            secondary
                                            className={`mr-2 ${
                                                application.status ===
                                                "rejected"
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            disabled={
                                                application.status ===
                                                "rejected"
                                            }
                                        >
                                            Reject
                                        </CButton>
                                        <CButton
                                            onClick={() =>
                                                handleChangeStatus(
                                                    application.id,
                                                    "pending"
                                                )
                                            }
                                            secondary
                                            className={`mr-2 ${
                                                application.status === "pending"
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            disabled={
                                                application.status === "pending"
                                            }
                                        >
                                            Pending
                                        </CButton>
                                        <CButton
                                            onClick={() =>
                                                handleDelete(application.id)
                                            }
                                            secondary
                                        >
                                            <FaTrash />
                                        </CButton>
                                        <div className="ml-4 flex space-x-2">
                                            <CButton
                                                onClick={() =>
                                                    handleShowFile(
                                                        "resume",
                                                        application.name
                                                    )
                                                }
                                                secondary
                                            >
                                                Inspectate Resume/CV
                                            </CButton>
                                            <CButton
                                                onClick={() =>
                                                    handleShowFile(
                                                        "cover-letter",
                                                        application.name
                                                    )
                                                }
                                                secondary
                                            >
                                                Inspectate Cover Letter
                                            </CButton>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default ApplicationContainer
