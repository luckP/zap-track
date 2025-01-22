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

    /**
     * Finds intersections between a slicing line and the polygon's edges.
     * @param {Array} polygon - Array of vertices defining the polygon [{lat, lng}, ...].
     * @param {number} slicingLat - Latitude of the slicing line.
     * @returns {Array} - Intersection points [{lat, lng}, ...].
     */
    const findIntersections = (polygon, slicingLat) => {
        const intersections = [];

        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const vertex1 = polygon[i];
            const vertex2 = polygon[j];

            // Check if the edge crosses the slicing line
            if ((vertex1.lat > slicingLat) !== (vertex2.lat > slicingLat)) {
                // Calculate the intersection point's longitude
                const lng =
                    vertex1.lng +
                    ((slicingLat - vertex1.lat) * (vertex2.lng - vertex1.lng)) /
                    (vertex2.lat - vertex1.lat);

                intersections.push({ lat: slicingLat, lng });
            }
        }

        // Return sorted intersections by longitude for consistency
        return intersections.sort((a, b) => a.lng - b.lng);
    };

    /**
 * Runs the intersection algorithm and creates slicing lines in a zig-zag pattern.
 */
    const runExperiment = (polygon, distanceBetweenShots) => {
        if (polygon.length < 3) return; // Ensure valid polygon

        const minLat = Math.min(...polygon.map((p) => p.lat));
        const maxLat = Math.max(...polygon.map((p) => p.lat));
        const step = distanceBetweenShots * 0.00000899; // Approx. meters to degrees (adjust for precision)

        let currentLat = minLat;
        const slicingResults = [];
        let isLeftToRight = true; // Start zig-zag direction from left to right

        while (currentLat <= maxLat) {
            const intersections = findIntersections(polygon, currentLat);

            if (intersections.length >= 2) {
                // Sort intersections for consistency
                const sortedIntersections = isLeftToRight
                    ? intersections
                    : intersections.reverse(); // Reverse order for zig-zag

                slicingResults.push(...sortedIntersections);
            }

            // Move to the next slicing line
            currentLat += step;
            isLeftToRight = !isLeftToRight; // Alternate direction
        }

        setPolyline(slicingResults); // Update the polyline to show results
    };


    const handleClick = (type) => {
        setPathType(type);

        if (type === "Zig Zag" && polyline.length > 0) {
            const zigZagPath = transformToZigZag(polyline, configuration.distanceBetweenShots);
            setPolyline(zigZagPath);
        }

        else if (type === "Test" && polyline.length > 0) {
            const zigZagPath = runExperiment(polyline, configuration.distanceBetweenShots);
            // setPolyline(zigZagPath);
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
                    onClick={() => handleClick("Test")}
                >
                    Test
                </button>
            </div>
        </div>
    );
}

export default FlightPlanType;
