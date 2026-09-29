
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Snackbar,
    Alert,
    LinearProgress
} from "@mui/material";
import { useEffect, useState } from "react";
import { addActivity } from "../services/api.js";

const ActivityForm = ({ onActivityAdded }) => {
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [progress, setProgress] = useState(100);

    const [activity, setActivity] = useState({
        userId: "",
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
        startTime: new Date().toISOString(),
        additionalMetrics: {}
    });

    // Load users when the component first renders
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetch(
                    "http://localhost:9090/api/users/all"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();
                setUsers(data);

                if (data.length > 0) {
                    setActivity(prev => ({
                        ...prev,
                        userId: data[0].id
                    }));
                }
            } catch (error) {
                console.error("Error loading users:", error);
            } finally {
                setLoadingUsers(false);
            }
        };

        loadUsers();
    }, []);

    // Count down the progress while the toast is open
    useEffect(() => {
        if (!showToast) return;

        setProgress(100);

        const interval = setInterval(() => {
            setProgress(prev => Math.max(0, prev - 1));
        }, 40);

        return () => clearInterval(interval);
    }, [showToast]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addActivity(activity);

            setProgress(100);
            setShowToast(true);
            onActivityAdded();

            setActivity({
                userId: users.length > 0 ? users[0].id : "",
                type: "RUNNING",
                duration: "",
                caloriesBurned: "",
                startTime: new Date().toISOString(),
                additionalMetrics: {}
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                {/* User dropdown */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="user-label">User</InputLabel>

                    <Select
                        labelId="user-label"
                        value={activity.userId}
                        label="User"
                        disabled={loadingUsers || users.length === 0}
                        onChange={(e) => {
                            setActivity(prev => ({
                                ...prev,
                                userId: e.target.value
                            }));
                        }}
                    >
                        {users.map(user => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.firstName} {user.lastName} - {user.email}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Activity type */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Activity Type</InputLabel>

                    <Select
                        value={activity.type}
                        label="Activity Type"
                        onChange={(e) => {
                            setActivity(prev => ({
                                ...prev,
                                type: e.target.value
                            }));
                        }}
                    >
                        <MenuItem value="RUNNING">Running</MenuItem>
                        <MenuItem value="WALKING">Walking</MenuItem>
                        <MenuItem value="CYCLING">Cycling</MenuItem>
                    </Select>
                </FormControl>

                {/* Duration */}
                <TextField
                    fullWidth
                    label="Duration (Minutes)"
                    type="number"
                    sx={{ mb: 2 }}
                    value={activity.duration}
                    onChange={(e) => {
                        setActivity(prev => ({
                            ...prev,
                            duration: e.target.value
                        }));
                    }}
                />

                {/* Calories */}
                <TextField
                    fullWidth
                    label="Calories Burned"
                    type="number"
                    sx={{ mb: 2 }}
                    value={activity.caloriesBurned}
                    onChange={(e) => {
                        setActivity(prev => ({
                            ...prev,
                            caloriesBurned: e.target.value
                        }));
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={!activity.userId}
                >
                    Add Activity
                </Button>
            </Box>

            {/* Success toast */}
            <Snackbar
                open={showToast}
                autoHideDuration={4000}
                onClose={() => setShowToast(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
            >
                <Alert
                    severity="success"
                    sx={{
                            width: "fit-content",
                            alignItems: "flex-start"
                        }}
                >
                    <Box>
                        Activity added

                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                mt: 0.5,
                                height: 4,
                                borderRadius: 2,
                                backgroundColor: "rgba(0, 0, 0, 0.15)",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: "#2e7d32"
                                }
                            }}
                        />
                    </Box>
                </Alert>
            </Snackbar>
        </>
    );
};

export default ActivityForm;