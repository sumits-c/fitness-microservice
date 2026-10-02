import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router";
import ActivityDetail from "./components/ActivityDetail";
import Box from "@mui/material/Box";
import { useState } from "react";

import ActivityList from "./components/ActivityList";
import ActivityForm from "./components/ActivityForm";

const ActivitiesPage = () => {

    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleActivityAdded = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <Box
            component="section"
            sx={{
                p: 2,
                border: "1px dashed grey"
            }}
        >

            <ActivityForm
                onActivityAdded={handleActivityAdded}
            />

            <ActivityList
                refreshTrigger={refreshTrigger}
            />

        </Box>
    );
};

function App() {

    return (
        <Router>

            <Box
                component="section"
                sx={{ p: 2 }}
            >

                <Routes>

                    <Route
                        path="/activities"
                        element={<ActivitiesPage />}
                    />
                    <Route
                        path="/activities/:id"
                        element={<ActivityDetail />} />

                </Routes>

            </Box>

        </Router>
    );
}

export default App;