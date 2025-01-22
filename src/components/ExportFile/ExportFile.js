import React, { useContext } from "react";
import { FlightPlanContext } from "../../contexts/FlightPlanContext";
import JSZip from "jszip";

function ExportFile() {
    const { polyline, configuration, pathType } = useContext(FlightPlanContext);

    const closePath = (path) => {
        if (path.length > 1 && path[0] !== path[path.length - 1]) {
            return [...path, path[0]]; // Close the path by appending the first point to the end
        }
        return path;
    };

    const transformToZigZag = (path) => {
        if (pathType !== "Zig Zag" || path.length < 2) return path;

        const zigZagPath = [];
        for (let i = 0; i < path.length - 1; i++) {
            const start = path[i];
            const end = path[i + 1];

            const dx = end.lng - start.lng;
            const dy = end.lat - start.lat;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);
            const steps = Math.max(2, Math.floor(distance / configuration.distanceBetweenShots));

            for (let j = 0; j <= steps; j++) {
                const t = j / steps;
                const x = start.lng + t * dx;
                const y = start.lat + t * dy;

                // Zig-zag offset alternates every step
                const offset = (j % 2 === 0 ? 1 : -1) * configuration.distanceBetweenShots * 0.0001;
                zigZagPath.push({ lat: y + offset, lng: x });
            }
        }

        return closePath(zigZagPath); // Ensure the zig-zag path is closed
    };

    const generateKML = () => {
        const closedPolyline = closePath(polyline);
        const finalPath = pathType === "Zig Zag" ? transformToZigZag(closedPolyline) : closedPolyline;

        const kmlContent = `
            <?xml version="1.0" encoding="UTF-8"?>
            <kml xmlns="http://www.opengis.net/kml/2.2">
                <Document>
                    <name>DJI Flight Plan</name>
                    <description>Generated Flight Plan for DJI Drone</description>
                    <Placemark>
                        <name>Flight Path</name>
                        <LineString>
                            <altitudeMode>absolute</altitudeMode>
                            <coordinates>
                                ${finalPath
                .map((point) => `${point.lng},${point.lat},${configuration.height}`)
                .join(" ")}
                            </coordinates>
                        </LineString>
                    </Placemark>
                    <ExtendedData>
                        <Data name="pathType">
                            <value>${pathType || "unknown"}</value>
                        </Data>
                        <Data name="height">
                            <value>${configuration.height}</value>
                        </Data>
                        <Data name="distanceBetweenShots">
                            <value>${configuration.distanceBetweenShots}</value>
                        </Data>
                        <Data name="cameraAngle">
                            <value>${configuration.cameraAngle}</value>
                        </Data>
                        <Data name="flightSpeed">
                            <value>${configuration.flightSpeed}</value>
                        </Data>
                    </ExtendedData>
                </Document>
            </kml>
        `;
        return kmlContent.trim();
    };

    const handleExport = async () => {
        const zip = new JSZip();
        const kmlContent = generateKML();

        zip.file("doc.kml", kmlContent);

        const kmzBlob = await zip.generateAsync({ type: "blob" });

        const url = URL.createObjectURL(kmzBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "dji_flight_plan.kmz";
        link.click();
    };

    return (
        <div className="export-section">
            <button className="btn btn-primary" onClick={handleExport}>
                Export Flight Plan
            </button>
        </div>
    );
}

export default ExportFile;
