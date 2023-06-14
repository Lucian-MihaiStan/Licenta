import { NextPage } from "next"
import React, {useEffect, useState} from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {AddParkingForm} from "../../components/parking/add_parking_form";
import {BrowserRouter} from "react-router-dom";
import navigationBarStyle from "@/components/navigation_bar/navigation-bar.module.css";


const AddParking: NextPage = () => {
    const [render, setRender] = useState<boolean>(false);
    useEffect(() => setRender(true), []);
    return (
        !render ? <div> Loading... </div> :
        <div>
            <NavigationBar/>

            <section className={navigationBarStyle.home_section}>
                <BrowserRouter>
                    <AddParkingForm/>
                </BrowserRouter>
            </section>
        </div>
    )
}

export default AddParking;