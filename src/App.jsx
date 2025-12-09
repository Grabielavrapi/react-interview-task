// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobsitesPage from "./pages/JobsitesPage";
import InventoryPage from "./pages/InventoryPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<JobsitesPage />} />
                <Route path="/inventory/:jobsiteId" element={<InventoryPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;