import { NextPage } from "next"
import React from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {ParkingPage} from "@/components/parking/parking_areas";


const ParkingAreas: NextPage = () => {

    return (
        <div>
            <NavigationBar/>
            <ParkingPage/>
        </div>
    )
}

export default ParkingAreas;