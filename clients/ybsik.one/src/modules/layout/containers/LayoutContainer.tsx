import { Outlet } from "react-router-dom"
import React from "react"

// Components
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AlertSection from "../../common/sections/AlertSection"

interface LayoutContainerProps {
    className?: string
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ className }) => {
    return (
        <>
            <div className={`${className}`}>
                {!window.location.pathname.endsWith("/") && <Navbar />}

                <div
                    className={`
                    mx-auto z-10
                    ${
                        !window.location.pathname.endsWith("/")
                            ? "py-24 container"
                            : ""
                    }
                `}
                >
                    <Outlet />
                </div>
                <Footer />
            </div>
            <AlertSection />
        </>
    )
}

export default LayoutContainer
