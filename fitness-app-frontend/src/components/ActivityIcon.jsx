import { Box } from "@mui/material";

/** Small, consistent outline pictograms for workout types. */
export default function ActivityIcon({ type, color = "currentColor", size = 24 }) {
    const kind = (type || "").toUpperCase();
    const common = { fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

    let artwork;
    if (kind.startsWith("WALK")) {
        // Compact walking pictogram: upright torso, natural opposing arm/leg stride.
        artwork = <g {...common}>
            <circle cx="12.2" cy="4.2" r="1.8" />
            <path d="m11.4 6.5-1.2 4.7 3.1 2.1" />
            <path d="m11.1 7.3-3.2 2.2-2.1-.2" />
            <path d="m11.5 7.1 3.1 2.1 2.8-.6" />
            <path d="m10.2 11.2-2.4 4.1-2.5 2.2" />
            <path d="m13.3 13.3 2.1 3.2.5 3" />
        </g>;
    } else if (kind.startsWith("RUN")) {
        artwork = <g {...common}>
            <circle cx="15.5" cy="4.5" r="2" />
            <path d="m13.5 7.5-3.1 3.6 3.7 2.1 2.2 5.2" />
            <path d="m13.5 8 4.2 1.2 2.2-1.1" />
            <path d="m10.4 11.1-4.2 1.1-2.1-.5" />
            <path d="m14.1 13.2-4.2 3.1-4.1 1.2" />
        </g>;
    } else if (kind.startsWith("CYCL")) {
        artwork = <g {...common}>
            <circle cx="5.5" cy="16.5" r="3.5" /><circle cx="18.5" cy="16.5" r="3.5" />
            <circle cx="12.5" cy="4.5" r="1.8" />
            <path d="m11.5 7-3 5.1 4.5 1.1 2.5-4.1 2.5 1.2" />
            <path d="m8.5 12.1-3 4.4m7.5-2.3 5.5 2.3m-5.5-2.3 1.5-4.1" />
        </g>;
    } else {
        artwork = <g {...common}><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" /></g>;
    }

    return <Box component="svg" viewBox="0 0 24 24" aria-hidden="true" sx={{ width: size, height: size, display: "block" }}>{artwork}</Box>;
}
