import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router";
import Box from "@mui/material/Box";
import ActivityList from "./components/ActivityList";
import ActivityForm from "./components/ActivityForm";

const ActivitiesPage = () => {
  return (
    <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
      <ActivityForm />
      <ActivityList />
    </Box>
  );
};

function App() {
  return (
    <Router>
      <Box component="section" sx={{ p: 2 }}>
        <Routes>
          <Route path="/activities" element={<ActivitiesPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;