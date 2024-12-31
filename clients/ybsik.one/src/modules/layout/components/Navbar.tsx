import React from "react"
import CLogoSection from "../../common/components/CLogoSection"

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white text-black p-1 fixed w-full border-b shadow-md">
            <div className="container mx-auto flex justify-between items-center text-sm font-bold">
                <CLogoSection isHorizontal />
                <div className="flex space-x-12">
                    <a href="#" className=" hover:text-gray-400">
                        Dashboard
                    </a>
                    <a href="#" className=" hover:text-gray-400">
                        Applications
                    </a>
                    <a href="#" className=" hover:text-gray-400">
                        Docs
                    </a>
                    <a href="#" className=" hover:text-gray-400">
                        Day Offs
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
