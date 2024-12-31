import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

interface LayoutProps {
    className?: string
}

const Layout: React.FC<LayoutProps> = ({ className }) => {
    return (
        <div className={` ${className}`}>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout
