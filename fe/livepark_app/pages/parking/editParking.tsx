import { NextPage } from "next"
import React, {useEffect, useState} from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {BrowserRouter} from "react-router-dom";
import navigationBarStyle from "@/components/navigation_bar/navigation-bar.module.css";
import {EditParkingForm} from "@/components/parking/edit_parking_form";


const EditParking: NextPage = () => {
    const [render, setRender] = useState<boolean>(false);
    useEffect(() => setRender(true), []);
    return (
        !render ? <div> Loading... </div> :
        <div>
            <NavigationBar/>

            <section className={navigationBarStyle.home_section}>
                <BrowserRouter>
                    <EditParkingForm/>
                </BrowserRouter>
            </section>
        </div>
    )
}

export default EditParking;