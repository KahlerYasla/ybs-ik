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
import DashboardContainer from "./modules/dashboard"
import ApplicationContainer from "./modules/application"
import DayOffContainer from "./modules/dayoff/containers/DayOffContainer"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={LayoutContainer}>
                    <Route path="/" Component={LoginContainer} />
                    <Route path="/dash" Component={DashboardContainer} />
                    <Route
                        path="/application"
                        Component={ApplicationContainer}
                    />
                    <Route path="/day-off" Component={DayOffContainer} />
                    <Route path="*" Component={NotFoundContainer} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
