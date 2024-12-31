import React from "react"
import CLogoSection from "../../common/components/CLogoSection"

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t  py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    <CLogoSection isHorizontal />
                    <p className="mt-4 text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} YTU Team. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
