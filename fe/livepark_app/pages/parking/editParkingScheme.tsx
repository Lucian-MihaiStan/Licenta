import { NextPage } from "next"
import React, {useEffect, useState} from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {BrowserRouter} from "react-router-dom";
import navigationBarStyle from "@/components/navigation_bar/navigation-bar.module.css";
import {EditParkingSpotsForm} from "@/components/parking/edit_parking_spots";


const EditParkingScheme: NextPage = () => {
    const [render, setRender] = useState<boolean>(false);
    useEffect(() => setRender(true), []);
    return (
        !render ? <div> Loading... </div> :
        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <BrowserRouter>
                    <EditParkingSpotsForm/>
                </BrowserRouter>
            </section>

        </div>
    )
}

export default EditParkingScheme;