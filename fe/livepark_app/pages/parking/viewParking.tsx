import { NextPage } from "next"
import React, {useEffect, useState} from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {BrowserRouter} from "react-router-dom";
import {ViewParking} from "@/components/parking/view_parking";
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
                        <ViewParking/>
                    </BrowserRouter>
                </section>
            </div>
    )
}

export default AddParking;