import { NextPage } from "next"
import React, {useEffect, useState} from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {ParkingSpotsForm} from "@/components/parking/configure_parking_spots";
import {BrowserRouter} from "react-router-dom";


const ConfigureParkingScheme: NextPage = () => {
    const [render, setRender] = useState<boolean>(false);
    useEffect(() => setRender(true), []);
    return (
        !render ? <div> Loading... </div> :
        <div>
            <NavigationBar/>
            <BrowserRouter>
                <ParkingSpotsForm/>
            </BrowserRouter>
        </div>
    )
}

export default ConfigureParkingScheme;