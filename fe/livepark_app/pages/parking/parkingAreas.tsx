import { NextPage } from "next"
import React from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {ParkingPage} from "@/components/parking/parking_areas";
import navigationBarStyle from "@/components/navigation_bar/navigation-bar.module.css";

const ParkingAreas: NextPage = () => {

    return (
        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <ParkingPage/>
            </section>
        </div>
    )
}

export default ParkingAreas;