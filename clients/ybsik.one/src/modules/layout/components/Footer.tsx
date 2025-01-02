import React from "react"
import CLogoSection from "../../common/components/CLogoSection"

const Footer: React.FC = () => {
    return (
        <footer className="bg-black py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    <CLogoSection isHorizontal lightMode />
                    <p className="mt-4 text-sm text-white">
                        &copy; {new Date().getFullYear()} YTU Team. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
