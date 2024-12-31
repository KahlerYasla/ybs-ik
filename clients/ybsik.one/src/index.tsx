import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Layout}>
                    <Route path="/" Component={TodoContainer} />
                    <Route path="/auth" Component={AuthContainer} />
                    <Route path="/me" Component={AuthContainer} />
                    <Route path="*" Component={NotFound} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
