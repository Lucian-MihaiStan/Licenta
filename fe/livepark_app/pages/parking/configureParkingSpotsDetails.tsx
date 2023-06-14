import { NextPage } from "next"
import React, {useEffect, useState} from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {BrowserRouter} from "react-router-dom";
import {ConfigureParkingSpotsDetails} from "@/components/parking/parkingSpotsDetails";
import navigationBarStyle from "@/components/navigation_bar/navigation-bar.module.css";


const ParkingSpotsDetails: NextPage = () => {
    const [render, setRender] = useState<boolean>(false);
    useEffect(() => setRender(true), []);
    return (
        !render ? <div> Loading... </div> :
        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <BrowserRouter>
                    <ConfigureParkingSpotsDetails/>
                </BrowserRouter>
            </section>

        </div>
    )
}

export default ParkingSpotsDetails;