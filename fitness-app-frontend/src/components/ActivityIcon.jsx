import { Box } from "@mui/material";
import runningImage from "../assets/running.png";
import walkingImage from "../assets/walking-icon-4.png";
import cyclingImage from "../assets/cycling.png";

/** Workout pictograms, kept in a shared 24px viewBox. */
export default function ActivityIcon({ type, color = "currentColor", size = 24 }) {
    const kind = (type || "").toUpperCase();
    const common = { fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
    const imageFilter = "brightness(0) saturate(100%) invert(29%) sepia(24%) saturate(1034%) hue-rotate(104deg) brightness(91%) contrast(91%)";

    if (kind.startsWith("WALK")) {
        return <Box component="img" src={walkingImage} alt="" aria-hidden="true" sx={{ width: size, height: size, objectFit: "contain", display: "block", filter: imageFilter }} />;
    } else if (kind.startsWith("RUN")) {
        return <Box component="img" src={runningImage} alt="" aria-hidden="true" sx={{ width: size, height: size, objectFit: "contain", display: "block", filter: imageFilter }} />;
    } else if (kind.startsWith("CYCL")) {
        return <Box component="img" src={cyclingImage} alt="" aria-hidden="true" sx={{ width: size, height: size, objectFit: "contain", display: "block", filter: imageFilter }} />;
    }

    const artwork = <g {...common}><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" /></g>;
    return <Box component="svg" viewBox="0 0 24 24" aria-hidden="true" sx={{ width: size, height: size, display: "block" }}>{artwork}</Box>;
}
