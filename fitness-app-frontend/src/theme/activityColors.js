export const activityColors = {
    RUNNING: { color: "#176B4D", tint: "#E8F3ED", symbol: "↗" },
    WALKING: { color: "#287A68", tint: "#E8F3EF", symbol: "🚶" },
    CYCLING: { color: "#176B4D", tint: "#E8F3ED", symbol: "⌁" },
    WORKOUT: { color: "#8062A8", tint: "#F0EBF7", symbol: "✦" },
};

export const getActivityColor = (type) => activityColors[(type || "").toUpperCase()] || activityColors.WORKOUT;
