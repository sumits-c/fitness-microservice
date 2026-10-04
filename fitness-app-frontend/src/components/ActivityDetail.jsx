import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivity, getActivityRecommendation } from "../services/api";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider
} from "@mui/material";

const ActivityDetail = () => {
    const { id } = useParams();

    const [activity, setActivity] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let ready = false;
        let active = true;
        const loadActivity = async () => {
            const response = await getActivity(id);
            setActivity(response.data);
        };
        const loadRecommendation = async () => {
            try {
                while (!ready && active) {
                    const response = await getActivityRecommendation(id);

                    if (response.status === 200) {
                        setRecommendation(response.data);
                        ready = true;
                    }
                    else if (response.status === 202) {
                        await delay();
                    }
                }
            }
            catch (error) {
                if (active) {
                    setError("Failed to load recommendation.");
                }
            }
        };
        loadActivity();
        loadRecommendation();

        return () => {
            active = false;
        };

    }, [id]);


    const delay = () => {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });

    };
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Activity Details
            </Typography>

            <Card>
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={{ textTransform: "capitalize" }}
                    >
                        {activity?.type?.toLowerCase()}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {activity?.startTime
                            ? new Date(activity.startTime).toLocaleString("en-IN", {
                                timeZone: "Asia/Kolkata",
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true
                            })
                            : ""}
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 2,
                            mt: 3
                        }}
                    >
                        <Box sx={{ bgcolor: "action.hover", p: 2, borderRadius: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Duration
                            </Typography>
                            <Typography variant="h4">
                                {activity?.duration} min
                            </Typography>
                        </Box>

                        <Box sx={{ bgcolor: "action.hover", p: 2, borderRadius: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Calories burned
                            </Typography>
                            <Typography variant="h4">
                                {activity?.caloriesBurned} kcal
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom>
                        Additional metrics
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography color="text.secondary">
                                Distance
                            </Typography>
                            <Typography fontWeight="medium">
                                {activity?.additionalMetrics?.distance} km
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography color="text.secondary">
                                Average speed
                            </Typography>
                            <Typography fontWeight="medium">
                                {activity?.additionalMetrics?.averageSpeed}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography color="text.secondary">
                                Max heart rate
                            </Typography>
                            <Typography fontWeight="medium">
                                {activity?.additionalMetrics?.maxHeartRate}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            <Card sx={{ mt: 3 }}>
                <CardContent>
                    <Typography>
                        {recommendation?.recommendation ||
                            "No recommendation available yet."}
                    </Typography>
                    {recommendation?.improvements?.length > 0 && (
                        <>
                            <Typography variant="h6" sx={{ mt: 3 }}>
                                Areas for Improvement
                            </Typography>

                            {recommendation.improvements.map((item, index) => (
                                <Typography key={index}>
                                    • {item}
                                </Typography>
                            ))}
                        </>
                    )}
                    {!recommendation && <Typography color="text.secondary">
                      Your personalized activity assessment will appear here.
                    </Typography>}
                </CardContent>
            </Card>
        </Box>
    );
};
export default ActivityDetail;