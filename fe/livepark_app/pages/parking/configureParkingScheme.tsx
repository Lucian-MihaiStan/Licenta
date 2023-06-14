import { NextPage } from "next"
import React, {useEffect, useState} from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {ParkingSpotsForm} from "@/components/parking/configure_parking_spots";
import {BrowserRouter} from "react-router-dom";
import navigationBarStyle from "@/components/navigation_bar/navigation-bar.module.css";


const ConfigureParkingScheme: NextPage = () => {
    const [render, setRender] = useState<boolean>(false);
    useEffect(() => setRender(true), []);
    return (
        !render ? <div> Loading... </div> :
        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <BrowserRouter>
                    <ParkingSpotsForm/>
                </BrowserRouter>
            </section>

        </div>
    )
}

export default ConfigureParkingScheme;