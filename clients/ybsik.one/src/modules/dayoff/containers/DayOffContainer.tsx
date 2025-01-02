import React, { useState } from "react"
import Timeline from "react-calendar-timeline"
import moment from "moment"
import { FaCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa"

const groups = [
    { id: 1, title: "Selin Cirak" },
    { id: 2, title: "Joe Biden" },
    { id: 3, title: "Kamala Harris" },
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

    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Employee Day Off Timeline
                </h1>
                <Timeline
                    canMove={true}
                    canResize={true}
                    groups={groups}
                    items={items}
                    lineHeight={50}
                    stackItems={true}
                    defaultTimeStart={moment().add(-12, "days")}
                    defaultTimeEnd={moment().add(12, "days")}
                />
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
                                    <th className="border p-2">Title</th>
                                    <th className="border p-2">Start Time</th>
                                    <th className="border p-2">End Time</th>
                                    <th className="border p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {group.items.map((item) => (
                                    <tr key={item.id}>
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
                                                className="w-full"
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
                                                className="w-full"
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
                                                className="w-full"
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
                                                className="w-full"
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
