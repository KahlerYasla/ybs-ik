import React, { useState } from "react"
import {
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaTrash,
    FaEdit,
} from "react-icons/fa"
import { CButton } from "../../common"

interface Application {
    id: number
    name: string
    status: "approved" | "rejected" | "pending"
}

const sampleApplications: Application[] = [
    { id: 1, name: "John Doe", status: "pending" },
    { id: 2, name: "Jane Smith", status: "rejected" },
    { id: 3, name: "Alice Johnson", status: "pending" },
    { id: 4, name: "Bob Brown", status: "approved" },
    { id: 5, name: "Charlie Davis", status: "pending" },
    { id: 6, name: "Diana Evans", status: "pending" },
    { id: 7, name: "Eve White", status: "approved" },
    { id: 8, name: "Frank Green", status: "rejected" },
    { id: 9, name: "Grace Lee", status: "pending" },
    { id: 10, name: "Hank Miller", status: "approved" },
    { id: 11, name: "Ivy Wilson", status: "rejected" },
    { id: 12, name: "Jack Taylor", status: "pending" },
    { id: 13, name: "Kelly Young", status: "approved" },
    { id: 14, name: "Larry Harris", status: "pending" },
    { id: 15, name: "Mona Allen", status: "pending" },
    { id: 16, name: "Nina King", status: "pending" },
]

const ApplicationContainer: React.FC = () => {
    const [applications, setApplications] = useState(sampleApplications)
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
                return <FaCheckCircle className="text-green-800" />
            case "rejected":
                return <FaTimesCircle className="text-red-800" />
            case "pending":
                return <FaClock className="text-yellow-800" />
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
        const temporaryLink = `https://www.orimi.com/pdf-test.pdf` // Replace with your actual file link
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
        <div className="p-4 container py-24">
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
                                className={`flex items-center p-4 rounded border-b border-gray-300 bg-yellow-100`}
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
                                        className={`flex items-center p-4 rounded border-b border-gray-300`}
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
