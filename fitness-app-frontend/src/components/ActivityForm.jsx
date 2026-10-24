import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    FormControl,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    TextField,
    Typography,
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
        additionalMetrics: {},
    });

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetch("http://localhost:9090/api/users/all");
                if (!response.ok) throw new Error("Failed to fetch users");

                const data = await response.json();
                setUsers(data);
                if (data.length > 0) {
                    setActivity((prev) => ({ ...prev, userId: data[0].id }));
                }
            } catch (error) {
                console.error("Error loading users:", error);
            } finally {
                setLoadingUsers(false);
            }
        };
        loadUsers();
    }, []);

    useEffect(() => {
        if (!showToast) return;
        setProgress(100);
        const interval = setInterval(() => {
            setProgress((prev) => Math.max(0, prev - 1));
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
                additionalMetrics: {},
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Card sx={{ mb: 4, overflow: "hidden" }}>
                <Box sx={{ px: { xs: 2.25, sm: 2.75 }, py: 2.25 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 750, letterSpacing: "0.08em" }}>
                        NEW SESSION
                    </Typography>
                    <Typography variant="h3" sx={{ mt: 0.25, mb: 0.5 }}>
                        Log an activity
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Add the details of your workout.
                    </Typography>
                </Box>
                <Divider />
                <CardContent sx={{ p: { xs: 2.25, sm: 2.75 }, "&:last-child": { pb: { xs: 2.25, sm: 2.75 } } }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <FormControl fullWidth>
                                <InputLabel id="activity-user-label">User</InputLabel>
                                <Select
                                    labelId="activity-user-label"
                                    value={activity.userId}
                                    label="User"
                                    disabled={loadingUsers || users.length === 0}
                                    onChange={(e) => setActivity((prev) => ({ ...prev, userId: e.target.value }))}
                                >
                                    {users.map((user) => (
                                        <MenuItem key={user.id} value={user.id}>
                                            {user.firstName} {user.lastName} - {user.email}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="activity-type-label">Activity type</InputLabel>
                                <Select
                                    labelId="activity-type-label"
                                    value={activity.type}
                                    label="Activity type"
                                    onChange={(e) => setActivity((prev) => ({ ...prev, type: e.target.value }))}
                                >
                                    <MenuItem value="RUNNING">Running</MenuItem>
                                    <MenuItem value="WALKING">Walking</MenuItem>
                                    <MenuItem value="CYCLING">Cycling</MenuItem>
                                </Select>
                            </FormControl>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Duration (min)"
                                    type="number"
                                    inputProps={{ min: 1 }}
                                    value={activity.duration}
                                    onChange={(e) => setActivity((prev) => ({ ...prev, duration: e.target.value }))}
                                />
                                <TextField
                                    fullWidth
                                    label="Calories burned (kcal)"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    value={activity.caloriesBurned}
                                    onChange={(e) => setActivity((prev) => ({ ...prev, caloriesBurned: e.target.value }))}
                                />
                            </Stack>

                            <Typography variant="caption" color="text.secondary">
                                You can add optional activity metrics later where supported.
                            </Typography>

                            <Box>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!activity.userId || !activity.duration || !activity.caloriesBurned}
                                >
                                    Add activity
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>

            <Snackbar
                open={showToast}
                autoHideDuration={4000}
                onClose={() => setShowToast(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="success" sx={{ width: "fit-content", alignItems: "flex-start" }}>
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
                                "& .MuiLinearProgress-bar": { backgroundColor: "#2e7d32" },
                            }}
                        />
                    </Box>
                </Alert>
            </Snackbar>
        </>
    );
};

export default ActivityForm;
