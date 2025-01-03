import React from "react"
import { useNavigate } from "react-router-dom"

// Components
import CButton from "../../common/components/CButton"
import { CInputField, CLogoSection } from "../../common"

// Stores
import { useLayout } from "../../layout/hooks/useLayout"

interface LoginContainerProps {
    className?: string
}

const LoginContainer: React.FC<LoginContainerProps> = ({ className }) => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const addAlert = useLayout((state) => state.addAlert)
    const navigate = useNavigate() // Use navigate for redirection

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
            addAlert({
                id: new Date().getTime(),
                message: "Invalid username or password",
                onClose: (id: number) => {},
                type: "error",
            })
            return
        }

        // Redirect to dashboard using navigate
        addAlert({
            id: new Date().getTime(),
            message: "Login successful",
            onClose: (id: number) => {},
            type: "success",
        })
        navigate("/dash") // Redirect to dashboard
    }

    return (
        <div className="flex items-center justify-center min-h-screen relative">
            <div className="flex md:grid md:grid-cols-2 w-screen h-screen z-10">
                <div className="flex flex-col w-full min-w-96 px-10 pt-10 justify-center gap-16 items-center pb-32 z-20">
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
                            onClick={() => navigate("/register")}
                            className="w-full"
                            secondary
                        >
                            register
                        </CButton>
                    </div>
                </div>
                <img
                    className="hidden top-0 md:static md:flex bg-center grayscale-[0] object-cover bg-blue-500 w-full h-full"
                    src="/images/login2.jpeg"
                    alt="Login Background"
                />
            </div>
        </div>
    )
}

export default LoginContainer
