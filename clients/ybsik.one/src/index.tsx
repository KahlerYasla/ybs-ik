// React essentials
import React from "react"
import ReactDOM from "react-dom/client"

// Styling
import "./index.css"

// Client routing
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components
import { LayoutContainer, NotFoundContainer } from "./modules/layout"
import { LoginContainer } from "./modules/auth"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={LayoutContainer}>
                    <Route path="/" Component={LoginContainer} />
                    {/* <Route path="/dash" Component={DashboardContainer} /> */}
                    {/* <Route
                        path="/application"
                        Component={ApplicationContainer}
                    /> */}
                    <Route path="*" Component={NotFoundContainer} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
