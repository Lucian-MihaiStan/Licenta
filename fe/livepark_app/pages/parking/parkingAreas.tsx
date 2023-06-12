import { NextPage } from "next"
import React, {useEffect, useState} from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {ParkingPage} from "@/components/parking/parking_areas";
import {BrowserRouter} from "react-router-dom";


const ParkingAreas: NextPage = () => {
    const [render, setRender] = useState<boolean>(false);
    useEffect(() => setRender(true), []);
    return (
        !render ? <div> Loading... </div> :
        <div>
            <NavigationBar/>
            <BrowserRouter>
                <ParkingPage/>
            </BrowserRouter>
        </div>
    )
}

export default ParkingAreas;