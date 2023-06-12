import { NextPage } from "next"
import React, {useEffect, useState} from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {BrowserRouter} from "react-router-dom";
import {ConfigureParkingSpotsDetails} from "@/components/parking/parkingSpotsDetails";


const ParkingSpotsDetails: NextPage = () => {
    const [render, setRender] = useState<boolean>(false);
    useEffect(() => setRender(true), []);
    return (
        !render ? <div> Loading... </div> :
        <div>
            <NavigationBar/>
            <BrowserRouter>
                <ConfigureParkingSpotsDetails/>
            </BrowserRouter>

        </div>
    )
}

export default ParkingSpotsDetails;