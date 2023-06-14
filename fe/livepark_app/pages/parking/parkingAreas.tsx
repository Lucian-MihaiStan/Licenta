import { NextPage } from "next"
import React, {useEffect, useState} from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {ParkingPage} from "@/components/parking/parking_areas";
import navigationBarStyle from "@/components/navigation_bar/navigation-bar.module.css";
import {BrowserRouter} from "react-router-dom";


const ParkingAreas: NextPage = () => {
    const [render, setRender] = useState<boolean>(false);
    useEffect(() => setRender(true), []);
    return (
        !render ? <div> Loading... </div> :
        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <BrowserRouter>
                    <ParkingPage/>
                </BrowserRouter>
            </section>
        </div>
    )
}

export default ParkingAreas;