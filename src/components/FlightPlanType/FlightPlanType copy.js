import React, { useContext } from "react";
import { FlightPlanContext } from "../../contexts/FlightPlanContext";
import { latLngBounds } from "leaflet";

function FlightPlanType() {
    const { polyline, setPathType, configuration, setPolyline } = useContext(FlightPlanContext);

    const calculateBoundingBox = (path) => {
        const lats = path.map((p) => p.lat);
        const lngs = path.map((p) => p.lng);
        return {
            minLat: Math.min(...lats),
            maxLat: Math.max(...lats),
            minLng: Math.min(...lngs),
            maxLng: Math.max(...lngs),
        };
    };

    const transformToZigZag = (polygon, distanceBetweenShots) => {
        if (polygon.length < 3) return []; // Not enough points for a valid polygon

        const boundingBox = calculateBoundingBox(polygon);
        const { minLat, maxLat, minLng, maxLng } = boundingBox;

        const zigZagPath = [];
        let currentLat = minLat;
        let isZig = true;

        const bounds = latLngBounds(polygon);

        while (currentLat <= maxLat) {
            let currentLng = isZig ? minLng : maxLng;
            const lngStep = distanceBetweenShots * 0.00000899; // Approx conversion of meters to degrees longitude
            let isOutOfBounds = false;

            while (!isOutOfBounds) {
                const point = { lat: currentLat, lng: currentLng };
                if (bounds.contains(point)) {
                    zigZagPath.push(point); // Add point if it's inside the polygon
                } else {
                    zigZagPath.push(point); // Add boundary point even if it's outside
                    break;
                }

                // Move along the zigzag line
                currentLng = isZig ? currentLng + lngStep : currentLng - lngStep;

                // Check if we've reached the boundary
                if ((isZig && currentLng >= maxLng) || (!isZig && currentLng <= minLng)) {
                    const boundaryPoint = { lat: currentLat, lng: isZig ? maxLng : minLng };
                    zigZagPath.push(boundaryPoint); // Add boundary point
                    isOutOfBounds = true;
                }
            }

            // Move to the next latitude and invert direction
            currentLat += distanceBetweenShots * 0.00000899; // Move by shot distance in latitude
            isZig = !isZig;
        }

        // Close the path if needed
        if (zigZagPath.length > 0 && zigZagPath[0] !== zigZagPath[zigZagPath.length - 1]) {
            zigZagPath.push(zigZagPath[0]);
        }

        return zigZagPath;
    };

    const handleClick = (type) => {
        setPathType(type);

        if (type === "Zig Zag" && polyline.length > 0) {
            const zigZagPath = transformToZigZag(polyline, configuration.distanceBetweenShots);
            setPolyline(zigZagPath);
        }
    };

    return (
        <div className="fly-plan-options container bg-light p-4 rounded shadow-sm text-center">
            <h5 className="mb-4">Flight Plan Options</h5>
            <div className="d-flex justify-content-center gap-3">
                <button
                    className="btn btn-outline-primary"
                    onClick={() => handleClick("Circular")}
                >
                    Circular
                </button>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => handleClick("Zig Zag")}
                >
                    Zig Zag
                </button>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => handleClick("Helical")}
                >
                    Helical
                </button>
            </div>
        </div>
    );
}

export default FlightPlanType;
