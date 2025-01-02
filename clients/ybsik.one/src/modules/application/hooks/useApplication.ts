import { create } from "zustand"
import { Application } from "../containers/ApplicationContainer"

const sampleApplications: Application[] = [
    {
        id: 1,
        name: "Oscar Martinez",
        status: "approved",
        age: 35,
        appliedProject: "Project A",
        gender: "Male",
        experience: 10,
        field: "Engineering",
        salaryExpectation: 70000,
    },
    {
        id: 2,
        name: "Pam Beesly",
        status: "pending",
        age: 28,
        appliedProject: "Project A",
        gender: "Female",
        experience: 5,
        field: "Design",
        salaryExpectation: 50000,
    },
    {
        id: 3,
        name: "Ryan Howard",
        status: "rejected",
        age: 30,
        appliedProject: "Project A",
        gender: "Male",
        experience: 7,
        field: "Marketing",
        salaryExpectation: 60000,
    },
    {
        id: 4,
        name: "Stanley Hudson",
        status: "approved",
        age: 45,
        appliedProject: "Project D",
        gender: "Male",
        experience: 20,
        field: "Sales",
        salaryExpectation: 80000,
    },
    {
        id: 5,
        name: "Phyllis Vance",
        status: "pending",
        age: 50,
        appliedProject: "Project G",
        gender: "Female",
        experience: 25,
        field: "Sales",
        salaryExpectation: 75000,
    },
    {
        id: 6,
        name: "Angela Martin",
        status: "approved",
        age: 38,
        appliedProject: "Project F",
        gender: "Female",
        experience: 15,
        field: "Accounting",
        salaryExpectation: 65000,
    },
    {
        id: 7,
        name: "Kevin Malone",
        status: "rejected",
        age: 40,
        appliedProject: "Project G",
        gender: "Male",
        experience: 18,
        field: "Accounting",
        salaryExpectation: 60000,
    },
    {
        id: 8,
        name: "Toby Flenderson",
        status: "pending",
        age: 42,
        appliedProject: "Project H",
        gender: "Male",
        experience: 20,
        field: "HR",
        salaryExpectation: 70000,
    },
]

interface ApplicationState {
    applications: Application[]
    setApplications: (applications: Application[]) => void
    addApplication: (application: Application) => void
    updateApplication: (
        id: number,
        updatedApplication: Partial<Application>
    ) => void
    removeApplication: (id: number) => void
}

const useApplicationStore = create<ApplicationState>((set) => ({
    applications: sampleApplications,
    setApplications: (applications) => set({ applications }),
    addApplication: (application) =>
        set((state) => ({
            applications: [...state.applications, application],
        })),
    updateApplication: (id, updatedApplication) =>
        set((state) => ({
            applications: state.applications.map((app) =>
                app.id === id ? { ...app, ...updatedApplication } : app
            ),
        })),
    removeApplication: (id) =>
        set((state) => ({
            applications: state.applications.filter((app) => app.id !== id),
        })),
}))

export default useApplicationStore
