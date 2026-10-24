import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { getActivities } from "../services/api";

const activityAccent = {
    RUNNING: "#176B4D",
    WALKING: "#477A9B",
    CYCLING: "#A66B32",
    WORKOUT: "#8062A8",
};

const ActivityList = ({ refreshTrigger }) => {
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await getActivities();
                setActivities(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Unable to load activities", error);
            }
        };

        fetchActivities();
    }, [refreshTrigger]);

    const formatDate = (value) => {
        if (!value) return "Date not recorded";
        const date = new Date(value);
        return Number.isNaN(date.getTime())
            ? "Date not recorded"
            : date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
    };

    if (activities.length === 0) {
        return (
            <Card sx={{ mt: 2, borderStyle: "dashed", bgcolor: "rgba(255,255,255,0.72)" }}>
                <CardContent sx={{ py: { xs: 4, sm: 5 }, textAlign: "center" }}>
                    <Box
                        sx={{
                            width: 52,
                            height: 52,
                            mx: "auto",
                            mb: 2,
                            display: "grid",
                            placeItems: "center",
                            borderRadius: "16px",
                            bgcolor: "primary.light",
                            color: "primary.dark",
                            fontSize: 24,
                        }}
                    >
                        +
                    </Box>
                    <Typography variant="h3" sx={{ mb: 1 }}>Your activity story starts here</Typography>
                    <Typography color="text.secondary" sx={{ maxWidth: 420, mx: "auto" }}>
                        Log a walk, run, ride, or workout. Your recent activities will show up here so you can revisit the details and recommendations.
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Box>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
                spacing={1}
                sx={{ mb: 2 }}
            >
                <Box>
                    <Typography variant="h2">Activity history</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {activities.length} {activities.length === 1 ? "session" : "sessions"} logged
                    </Typography>
                </Box>
                <Chip
                    label="Latest first"
                    size="small"
                    sx={{ bgcolor: "#E8EEE9", color: "#52685B", fontWeight: 600 }}
                />
            </Stack>

            <Grid container spacing={2}>
                {activities.map((activity) => {
                    const type = (activity.type || "Activity").toString();
                    const accent = activityAccent[type.toUpperCase()] || "#176B4D";

                    return (
                        <Grid item xs={12} sm={6} lg={4} key={activity.id}>
                            <Card
                                sx={{
                                    height: "100%",
                                    overflow: "hidden",
                                    transition: "transform 160ms ease, box-shadow 160ms ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 8px 24px rgba(24,53,43,0.08)",
                                    },
                                }}
                            >
                                <CardActionArea
                                    onClick={() => navigate(`/activities/${activity.id}`)}
                                    sx={{ height: "100%", alignItems: "stretch" }}
                                >
                                    <CardContent sx={{ p: 2.25, "&:last-child": { pb: 2.25 } }}>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                                            <Box
                                                sx={{
                                                    width: 42,
                                                    height: 42,
                                                    display: "grid",
                                                    placeItems: "center",
                                                    borderRadius: "13px",
                                                    bgcolor: `${accent}14`,
                                                    color: accent,
                                                    fontSize: 19,
                                                    fontWeight: 800,
                                                }}
                                            >
                                                {type.toUpperCase().startsWith("RUN") ? "↗" : type.toUpperCase().startsWith("WALK") ? "⌁" : type.toUpperCase().startsWith("CYCL") ? "⌁" : "✦"}
                                            </Box>
                                            <Chip
                                                label={type}
                                                size="small"
                                                sx={{
                                                    bgcolor: "#F3F6F3",
                                                    color: "text.secondary",
                                                    fontWeight: 650,
                                                    textTransform: "capitalize",
                                                }}
                                            />
                                        </Stack>

                                        <Typography variant="h3" sx={{ mb: 0.5 }}>
                                            {formatDate(activity.startTime)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.25 }}>
                                            Activity details <Box component="span" sx={{ ml: 0.5, color: accent }}>↗</Box>
                                        </Typography>

                                        <Stack direction="row" spacing={1} sx={{ pt: 1.75, borderTop: "1px solid", borderColor: "divider" }}>
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography variant="caption" color="text.secondary">Duration</Typography>
                                                <Typography sx={{ fontSize: "1.1rem", fontWeight: 750, letterSpacing: "-0.03em" }}>
                                                    {activity.duration ?? "—"} <Typography component="span" variant="caption" color="text.secondary">min</Typography>
                                                </Typography>
                                            </Box>
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography variant="caption" color="text.secondary">Calories</Typography>
                                                <Typography sx={{ fontSize: "1.1rem", fontWeight: 750, letterSpacing: "-0.03em" }}>
                                                    {activity.caloriesBurned ?? "—"} <Typography component="span" variant="caption" color="text.secondary">kcal</Typography>
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default ActivityList;
