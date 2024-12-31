import { Outlet } from "react-router-dom"
import React from "react"

// Components
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

interface LayoutContainerProps {
    className?: string
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ className }) => {
    return (
        <div className={` ${className}`}>
            {!window.location.pathname.endsWith("/") && <Navbar />}
            <Outlet />
            <Footer />
        </div>
    )
}

export default LayoutContainer