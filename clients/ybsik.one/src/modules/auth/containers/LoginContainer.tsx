import React from "react"

// Components
import CButton from "../../common/components/CButton"
import { CInputField, CLogoSection } from "../../common"

// Stores
import { useLayout } from "../../layout/hooks/useLayout"

// Types
import Alert from "../../common/types/alert"

interface LoginContainerProps {
    className?: string
}

const LoginContainer: React.FC<LoginContainerProps> = ({ className }) => {
    // States
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    // Stores
    const addAlert = useLayout((state) => state.addAlert)

    const handleLogin = () => {
        if (username === "" || password === "") {
            addAlert({
                id: new Date().getTime(),
                message: "Please fill in all fields",
                onClose: (id: number) => {},
                type: "error",
            })
            return
        }

        if (username !== "admin" || password !== "admin") {
            return addAlert({
                id: new Date().getTime(),
                message: "Invalid username or password",
                onClose: (id: number) => {},
                type: "error",
            })
        }

        window.location.replace("/dash")

        addAlert({
            id: new Date().getTime(),
            message: "Login successful",
            onClose: (id: number) => {},
            type: "success",
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen relative">
            <div className="flex flex-row md:grid md:grid-cols-2 w-screen h-screen z-10">
                <div className="flex flex-col w-full min-w-96 px-10 pt-10 justify-center gap-16 items-center pb-32">
                    <div className="flex items-center">
                        <CLogoSection />
                    </div>
                    <p className="text-gray-600">HR's best friend</p>
                    <h1 className="text-4xl font-bold text-gray-800">
                        Welcome back!
                    </h1>
                    <div className="flex flex-col gap-6 w-full max-w-96">
                        <div>
                            <CInputField
                                label="username"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <CInputField
                                label="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 w-full max-w-96">
                        <CButton onClick={handleLogin} className="w-full">
                            login
                        </CButton>
                        <CButton
                            onClick={() => window.location.replace("/register")}
                            className="w-full"
                            secondary
                        >
                            register
                        </CButton>
                    </div>
                </div>
                <img
                    className="md:flex bg-center grayscale-[.7] object-cover hidden bg-blue-500 w-full h-full"
                    src="/images/login2.jpeg"
                    alt="Login Background"
                />
            </div>
        </div>
    )
}

export default LoginContainer
