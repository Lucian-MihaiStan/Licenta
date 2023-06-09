import { NextPage } from "next"
import React from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {BrowserRouter} from "react-router-dom";
import {ConfigureParkingSpotsDetails} from "@/components/parking/parkingSpotsDetails";


const ParkingSpotsDetails: NextPage = () => {

    return (
        <div>
            <NavigationBar/>
            <BrowserRouter>
                <ConfigureParkingSpotsDetails/>
            </BrowserRouter>

        </div>
    )
}

export default ParkingSpotsDetails;