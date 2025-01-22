import React from "react";
import TopBar from "../components/TopBar/TopBar";
import MainMap from "../components/MainMap/MainMap";
import FlightPlanConfig from "../components/FlightPlanConfig/FlightPlanConfig";
import FlightPlanType from "../components/FlightPlanType/FlightPlanType";
import ExportFile from "../components/ExportFile/ExportFile";
import Footer from "../components/Footer/Footer";
import { FlightPlanProvider } from "../contexts/FlightPlanContext";

function MainPage() {
    return (
        <FlightPlanProvider>
            <div className="main-page">
                <TopBar />
                <MainMap />
                <FlightPlanConfig />
                <FlightPlanType />
                <ExportFile />
                <Footer />
            </div>
        </FlightPlanProvider>
    );
}

export default MainPage;
