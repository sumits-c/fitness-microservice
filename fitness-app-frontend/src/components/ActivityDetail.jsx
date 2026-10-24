import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import { getActivity, getActivityRecommendation } from "../services/api";
import ActivityIcon from "./ActivityIcon";

const activityColors = {
    RUNNING: { color: "#176B4D", tint: "#E8F3ED", symbol: "↗" },
    WALKING: { color: "#287A68", tint: "#E8F3EF", symbol: "🚶" },
    CYCLING: { color: "#A66B32", tint: "#FBF0E6", symbol: "⌁" },
    WORKOUT: { color: "#8062A8", tint: "#F0EBF7", symbol: "✦" },
};

const metricRows = [
    { key: "distance", label: "Distance", unit: "km" },
    { key: "averageSpeed", label: "Average speed", unit: "km/h" },
    { key: "maxHeartRate", label: "Max heart rate", unit: "bpm" },
];

function formatDate(value) {
    if (!value) return "Date not recorded";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Date not recorded";
    return date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

function MetricCard({ label, value, unit, tint, symbol }) {
    return (
        <Card sx={{ height: "100%" }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Box sx={{ width: 48, height: 48, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: "15px", bgcolor: tint, color: "primary.dark", fontSize: 22 }}>
                    {symbol}
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary">{label}</Typography>
                    <Typography sx={{ fontSize: "1.65rem", fontWeight: 750, letterSpacing: "-0.045em", lineHeight: 1.25 }}>
                        {value ?? "—"} <Typography component="span" variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>{unit}</Typography>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

const ActivityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        const loadActivity = async () => {
            try {
                const response = await getActivity(id);
                if (active) setActivity(response.data);
            } catch {
                if (active) setError("Unable to load this activity.");
            }
        };
        const loadRecommendation = async () => {
            try {
                while (active) {
                    const response = await getActivityRecommendation(id);
                    if (response.status === 200) {
                        if (active) setRecommendation(response.data);
                        break;
                    }
                    if (response.status === 202) await new Promise((resolve) => setTimeout(resolve, 2000));
                    else break;
                }
            } catch {
                if (active) setError("Recommendation is temporarily unavailable.");
            }
        };
        loadActivity();
        loadRecommendation();
        return () => { active = false; };
    }, [id]);

    const type = (activity?.type || "Activity").toUpperCase();
    const palette = activityColors[type] || { color: "#176B4D", tint: "#E8F3ED", symbol: "✦" };
    const metrics = activity?.additionalMetrics || {};

    return (
        <Box sx={{ maxWidth: 1180, mx: "auto", width: "100%" }}>
            <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
                <Button startIcon={<span aria-hidden="true">←</span>} onClick={() => navigate("/activities")} variant="text" sx={{ color: "text.secondary", px: 0 }}>
                    Back to activities
                </Button>
                <Chip label={formatDate(activity?.startTime)} variant="outlined" sx={{ bgcolor: "#FFFFFF", borderColor: "divider", color: "text.secondary" }} />
            </Stack>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h1" sx={{ mb: 0.75 }}>Activity details</Typography>
                <Typography color="text.secondary">A closer look at this workout and your AI-generated insights.</Typography>
            </Box>

            <Card sx={{ mb: 2.5 }}>
                <CardContent sx={{ p: { xs: 2.25, sm: 3 }, "&:last-child": { pb: { xs: 2.25, sm: 3 } } }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Box sx={{ width: 60, height: 60, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: "18px", bgcolor: palette.tint, color: palette.color, fontSize: 27 }}>
                            <ActivityIcon type={type} size={32} color={palette.color} />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                            <Typography variant="h2" sx={{ textTransform: "capitalize" }}>{activity?.type?.toLowerCase() || "Activity"}</Typography>
                            <Typography variant="body2" color="text.secondary">Workout session · Activity summary</Typography>
                        </Box>
                        <Box sx={{ flex: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", md: "block" }, maxWidth: 190, textAlign: "right" }}>
                            Your recorded activity, with personalized analysis below.
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 2, mb: 2.5 }}>
                <MetricCard label="Duration" value={activity?.duration} unit="min" tint="#E8F3ED" symbol="◷" />
                <MetricCard label="Calories burned" value={activity?.caloriesBurned} unit="kcal" tint="#FBF0E6" symbol="♨" />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 0.9fr) minmax(0, 1.3fr)" }, gap: 2 }}>
                <Card>
                    <CardContent sx={{ p: 0 }}>
                        <Box sx={{ px: 2.5, py: 2 }}>
                            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 750, letterSpacing: "0.08em" }}>WORKOUT DATA</Typography>
                            <Typography variant="h3">Additional metrics</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ px: 2.5 }}>
                            {metricRows.map((metric) => {
                                const value = metrics[metric.key];
                                return (
                                    <Box key={metric.key} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                                        <Typography color="text.secondary">{metric.label}</Typography>
                                        <Typography fontWeight={650}>{value ?? "—"} <Typography component="span" variant="caption" color="text.secondary">{metric.unit}</Typography></Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", px: 2.5, py: 2 }}>
                            {Object.values(metrics).some((value) => value !== null && value !== undefined && value !== "") ? "Recorded metrics for this activity." : "No optional metrics were recorded for this activity."}
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ bgcolor: "#FFFFFF" }}>
                    <Box sx={{ px: 2.5, py: 2, bgcolor: "#F5F8F5", borderBottom: "1px solid", borderColor: "divider" }}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Box sx={{ width: 38, height: 38, display: "grid", placeItems: "center", borderRadius: "12px", bgcolor: "#E5F1EA", color: "primary.main", fontSize: 20 }}>✳</Box>
                            <Box>
                                <Typography variant="h3">AI activity analysis</Typography>
                                <Typography variant="body2" color="text.secondary">Insights based on this workout's recorded data</Typography>
                            </Box>
                        </Stack>
                    </Box>
                    <CardContent sx={{ p: 2.25 }}>
                        {recommendation?.recommendation ? (
                            <Box sx={{ p: 2, mb: 2, borderRadius: 2.5, bgcolor: "#F4F8F5", border: "1px solid #E1ECE5" }}>
                                <Typography variant="subtitle1" sx={{ color: "primary.dark", mb: 0.75 }}>● Overall</Typography>
                                <Typography color="text.secondary">{recommendation.recommendation}</Typography>
                            </Box>
                        ) : (
                            <Box sx={{ p: 2, mb: 2, borderRadius: 2.5, bgcolor: "#F4F8F5", border: "1px solid #E1ECE5" }}>
                                <Typography variant="subtitle1" sx={{ color: "primary.dark", mb: 0.75 }}>● Overall</Typography>
                                <Typography color="text.secondary">{error || "Your personalized activity assessment will appear here once the recommendation is ready."}</Typography>
                            </Box>
                        )}
                        {recommendation?.improvements?.length > 0 && (
                            <Box sx={{ p: 2, borderRadius: 2.5, border: "1px solid", borderColor: "divider" }}>
                                <Typography variant="subtitle1" sx={{ mb: 1, color: "primary.dark" }}>Areas for improvement</Typography>
                                <Stack spacing={1}>
                                    {recommendation.improvements.map((item, index) => (
                                        <Stack key={index} direction="row" spacing={1.25} alignItems="flex-start">
                                            <Typography color="primary.main">•</Typography>
                                            <Typography color="text.secondary">{item}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default ActivityDetail;
