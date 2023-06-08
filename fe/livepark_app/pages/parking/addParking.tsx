import { NextPage } from "next"
import React from "react";
import { NavigationBar } from "@/components/navigation_bar/navigation-bar";
import {AddParkingForm} from "@/components/parking/add_parking_form";
import navigationBarStyle from "@/components/navigation_bar/navigation-bar.module.css";


const AddParking: NextPage = () => {

    return (
        <div>
            <NavigationBar/>

            <section className={navigationBarStyle.home_section}>
                <AddParkingForm/>
            </section>
        </div>
    )
}

export default AddParking;