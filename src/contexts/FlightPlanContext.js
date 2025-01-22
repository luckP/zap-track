import React, { createContext, useState } from "react";

// Create the context
export const FlightPlanContext = createContext();

// Create the provider component
export const FlightPlanProvider = ({ children }) => {
    const [polyline, setPolyline] = useState([]);
    const [configuration, setConfiguration] = useState({
        height: 80,
        distanceBetweenShots: 10,
        cameraAngle: 45,
        flightSpeed: "medium",
    });
    const [pathType, setPathType] = useState(null);

    return (
        <FlightPlanContext.Provider
            value={{
                polyline,
                setPolyline,
                configuration,
                setConfiguration,
                pathType,
                setPathType,
            }}
        >
            {children}
        </FlightPlanContext.Provider>
    );
};
