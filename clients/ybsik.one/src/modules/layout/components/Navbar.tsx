import React from "react"
import CLogoSection from "../../common/components/CLogoSection"
import {
    FaTachometerAlt,
    FaFileAlt,
    FaBook,
    FaCalendarAlt,
} from "react-icons/fa"
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white text-black p-1 fixed w-full z-40 shadow-sm">
            <div className="container mx-auto flex justify-between items-center text-sm font-bold">
                <CLogoSection isHorizontal />
                <div className="flex space-x-12">
                    <Link
                        to="/dash"
                        className="flex items-center hover:text-gray-400"
                    >
                        <FaTachometerAlt className="mr-2" />
                        dashboard
                    </Link>
                    <Link
                        to="/application"
                        className="flex items-center hover:text-gray-400"
                    >
                        <FaFileAlt className="mr-2" />
                        applications
                    </Link>
                    <Link
                        to="/day-off"
                        className="flex items-center hover:text-gray-400"
                    >
                        <FaCalendarAlt className="mr-2" />
                        day-offs
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
