import React, { useContext, useState } from "react";
import { FlightPlanContext } from "../../contexts/FlightPlanContext";

function FlightPlanConfig() {
    const { configuration, setConfiguration } = useContext(FlightPlanContext);


    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (name !== 'flightSpeed'){
            value = parseFloat(value)
        }

        setConfiguration((prev) => ({ ...prev, [name]: value }));
    };


    return (
        <div className="configuration-panel w-100 bg-light p-4 rounded shadow-sm row">
            <h5 className="mb-3 col-12">Flight Plan Configuration</h5>

            {/* Drone Type */}
            {/* <div className="mb-3 col-md-6 col-sm-12">
                <label className="form-label">Drone Type:</label>
                <select className="form-select">
                    <option value="dji-mini-4-pro">DJI Mini 4 Pro</option>
                    <option value="dji-mavic-3">DJI Mavic 3</option>
                    <option value="dji-air-2s">DJI Air 2S</option>
                </select>
            </div> */}

            {/* Height */}
            <div className="mb-3 col-md-6 col-sm-12">
                <label className="form-label">Height (m):</label>
                {/* <input
                    type="number"
                    name="height"
                    className="form-control"
                    placeholder="Enter height (10-120)"
                    value={configuration.height}
                    min="10"
                    max="120"
                    onChange={handleInputChange}
                /> */}

                <select name="height" className="form-select" value={configuration.height} onChange={handleInputChange}>
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                    <option value="70">70</option>
                    <option value="80">80</option>
                    <option value="90">90</option>
                    <option value="100">100</option>
                    <option value="110">110</option>
                    <option value="120">120</option>
                </select>
            </div>

            {/* Camera Angle */}
            <div className="mb-3 col-md-6 col-sm-12">
                <label className="form-label">Camera Angle (º):</label>
                <select 
                    className="form-select"
                    value={configuration.cameraAngle}
                    name="cameraAngle"
                    onChange={handleInputChange}
                    >
                    <option value="0">0º</option>
                    <option value="30">30º</option>
                    <option value="45">45º</option>
                    <option value="60">60º</option>
                    <option value="90">90º</option>
                </select>
            </div>

            {/* Distance Between Shots */}
            <div className="mb-3 col-md-6 col-sm-12">
                <label className="form-label">Distance Between Shots (m):</label>
                <input
                    type="number"
                    className="form-control"
                    value={configuration.distanceBetweenShots}
                    name="distanceBetweenShots"
                    min="1"
                    onChange={handleInputChange}
                />
                <small className="text-muted">
                    Suggested based on height: {configuration.height} meters
                </small>
            </div>

            {/* Flight Speed */}
            <div className="mb-3 col-md-6 col-sm-12">
                <label className="form-label">Flight Speed:</label>
                <select className="form-select" name="flightSpeed" onChange={handleInputChange} value={configuration.flightSpeed}>
                    <option value="slow">Slow</option>
                    <option value="medium">Medium</option>
                    <option value="fast">Fast</option>
                </select>
            </div>

            {/* Save Configurations */}
            {/* <div className="text-center">
                <button className="btn btn-primary">Save Configuration</button>
            </div> */}
        </div>
    );
}

export default FlightPlanConfig;
