import { NextPage } from "next"
import React from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {ParkingSpotsForm} from "@/components/parking/configure_parking_spots";


const ParkingAreas: NextPage = () => {

    return (
        <div>
            <NavigationBar/>
            <ParkingSpotsForm/>
        </div>
    )
}

export default ParkingAreas;