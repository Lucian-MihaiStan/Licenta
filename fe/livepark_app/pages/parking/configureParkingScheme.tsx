import { NextPage } from "next"
import React from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {ParkingSpotsForm} from "@/components/parking/configure_parking_spots";
import {BrowserRouter} from "react-router-dom";


const ConfigureParkingScheme: NextPage = () => {

    return (
        <div>
            <NavigationBar/>
            <BrowserRouter>
                <ParkingSpotsForm/>
            </BrowserRouter>
        </div>
    )
}

export default ConfigureParkingScheme;