import React, { useContext, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup, Polyline } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { FlightPlanContext } from "../../contexts/FlightPlanContext";

function MainMap() {
    const { polyline, setPolyline } = useContext(FlightPlanContext);
    const featureGroupRef = useRef(null);

    // Handle polyline creation
    const onCreated = (e) => {
        const { layerType, layer } = e;

        if (layerType === "polygon" || layerType === "polyline") {
            // Get coordinates and ensure they are in the correct format
            const newPolyline = layer.getLatLngs().flat(); // Flatten for polygons
            setPolyline(newPolyline); // Update context with new polyline
        }
    };

    // Handle polyline editing
    const onEdited = (e) => {
        const layers = e.layers;
        const updatedPolylines = [];

        layers.eachLayer((layer) => {
            if (layer instanceof L.Polyline || layer instanceof L.Polygon) {
                updatedPolylines.push(layer.getLatLngs().flat()); // Flatten for polygons
            }
        });

        if (updatedPolylines.length > 0) {
            setPolyline(updatedPolylines[0]); // Assume a single polyline for now
        }
    };

    const onDelete = (e) => {
        const layers = e.layers;
        const updatedPolylines = [];

        layers.eachLayer((layer) => {
            if (layer instanceof L.Polyline || layer instanceof L.Polygon) {
                updatedPolylines.push(layer.getLatLngs().flat()); // Flatten for polygons
            }
        });

        if (updatedPolylines.length > 0) {
            setPolyline(updatedPolylines[0]); // Assume a single polyline for now
        }
    }

    return (
        <div className="map-container">
            <MapContainer center={[-12.998782937937342, -38.47331640012775]} zoom={17} style={{ height: "600px" }}>
                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    minZoom={0}
                    maxZoom={20}
                />
                <FeatureGroup ref={featureGroupRef}>
                    <EditControl
                        position="topright"
                        onCreated={onCreated}
                        onEdited={onEdited}
                        draw={{
                            rectangle: false,
                            circle: false,
                            marker: false,
                            circlemarker: false,
                        }}
                    />
                    {/* Render Polyline */}
                    {polyline.length > 0 && (
                        <Polyline positions={polyline} color="blue" />
                    )}
                </FeatureGroup>
            </MapContainer>
        </div>
    );
}

export default MainMap;
