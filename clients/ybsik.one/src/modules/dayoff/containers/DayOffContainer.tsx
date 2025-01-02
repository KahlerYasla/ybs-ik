import React, { useState } from "react"
import Timeline, { CustomHeader, DateHeader } from "react-calendar-timeline"
import moment from "moment"
import { FaCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa"

const groups = [
    { id: 1, title: "Selin Cirak" },
    { id: 2, title: "Mehmet Yilmaz" },
    { id: 3, title: "Ayse Yilmaz" },
    { id: 4, title: "Ahmet Yilmaz" },
]

const DayOffContainer: React.FC = () => {
    const [items, setItems] = useState<any[]>([
        {
            id: 1,
            group: 1,
            title: "Vacation",
            start_time: moment().subtract(1, "days").valueOf(),
            end_time: moment().add(1, "days").valueOf(),
            status: "Pending",
        },
        {
            id: 2,
            group: 1,
            title: "Sick Leave",
            start_time: moment().add(2, "days").valueOf(),
            end_time: moment().add(3, "days").valueOf(),
            status: "Approved",
        },
        {
            id: 3,
            group: 2,
            title: "Vacation",
            start_time: moment().add(1, "days").valueOf(),
            end_time: moment().add(2, "days").valueOf(),
            status: "Pending",
        },
        {
            id: 4,
            group: 3,
            title: "Vacation",
            start_time: moment().add(2, "days").valueOf(),
            end_time: moment().add(5, "days").valueOf(),
            status: "Rejected",
        },
        {
            id: 5,
            group: 4,
            title: "Vacation",
            start_time: moment().add(3, "days").valueOf(),
            end_time: moment().add(4, "days").valueOf(),
            status: "Pending",
        },
        {
            id: 6,
            group: 4,
            title: "Sick Leave",
            start_time: moment().add(5, "days").valueOf(),
            end_time: moment().add(7, "days").valueOf(),
            status: "Approved",
        },
    ])

    const handleEdit = (id: number, field: string, value: any) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        )
    }

    const groupedItems = groups.map((group) => ({
        ...group,
        items: items.filter((item) => item.group === group.id),
    }))

    const getRowColor = (status: string) => {
        switch (status) {
            case "Pending":
                return "bg-5" // Light gray background for pending
            case "Approved":
                return "bg-1" // Light green background for approved
            case "Rejected":
                return "bg-4" // Light red background for rejected
            default:
                return "" // No background for unknown status
        }
    }

    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Employee Day Off Timeline
                </h1>
                <Timeline
                    groupRenderer={({ group }) => {
                        return (
                            <div className="bg-white px-4">{group.title}</div>
                        )
                    }}
                    className="bg-white text-black"
                    canMove={true}
                    canResize={true}
                    groups={groups}
                    items={items}
                    lineHeight={50}
                    stackItems={true}
                    defaultTimeStart={moment().add(-12, "days")}
                    defaultTimeEnd={moment().add(12, "days")}
                >
                    <DateHeader unit="primaryHeader" />
                    <DateHeader />
                    <CustomHeader
                        height={0}
                        headerData={{ someData: "data" }}
                        unit="year"
                    >
                        {() => {
                            return (
                                <div className="bg-white text-black px-4">
                                    Custom header
                                </div>
                            )
                        }}
                    </CustomHeader>
                </Timeline>
            </div>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Employee Day Off List
                </h1>
                {groupedItems.map((group) => (
                    <div key={group.id} className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            {group.title}
                        </h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border p-2 bg-white text-black">
                                        Title
                                    </th>
                                    <th className="border p-2 bg-white text-black">
                                        Start Time
                                    </th>
                                    <th className="border p-2 bg-white text-black">
                                        End Time
                                    </th>
                                    <th className="border p-2 bg-white text-black">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {group.items.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={`border p-2 ${getRowColor(
                                            item.status
                                        )}`}
                                    >
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) =>
                                                    handleEdit(
                                                        item.id,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full text-white bg-transparent font-bold"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="date"
                                                value={moment(
                                                    item.start_time
                                                ).format("YYYY-MM-DD")}
                                                onChange={(e) =>
                                                    handleEdit(
                                                        item.id,
                                                        "start_time",
                                                        moment(
                                                            e.target.value
                                                        ).valueOf()
                                                    )
                                                }
                                                className="w-full text-white bg-transparent font-bold"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="date"
                                                value={moment(
                                                    item.end_time
                                                ).format("YYYY-MM-DD")}
                                                onChange={(e) =>
                                                    handleEdit(
                                                        item.id,
                                                        "end_time",
                                                        moment(
                                                            e.target.value
                                                        ).valueOf()
                                                    )
                                                }
                                                className="w-full text-white bg-transparent font-bold"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <select
                                                value={item.status}
                                                onChange={(e) =>
                                                    handleEdit(
                                                        item.id,
                                                        "status",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full text-white bg-transparent font-bold"
                                            >
                                                <option value="Pending">
                                                    <FaCircle className="text-gray-400" />{" "}
                                                    Pending
                                                </option>
                                                <option value="Approved">
                                                    <FaCheckCircle className="text-green-500" />{" "}
                                                    Approved
                                                </option>
                                                <option value="Rejected">
                                                    <FaTimesCircle className="text-red-500" />{" "}
                                                    Rejected
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </>
    )
}

export default DayOffContainer
