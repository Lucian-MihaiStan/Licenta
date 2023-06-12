import { NextPage } from "next"
import React, {useEffect, useState} from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {BrowserRouter} from "react-router-dom";
import {ViewParking} from "@/components/parking/view_parking";


const AddParking: NextPage = () => {
    const [render, setRender] = useState<boolean>(false);
    useEffect(() => setRender(true), []);
    return (
        !render ? <div> Loading... </div> :
            <div>
                <NavigationBar/>
                <BrowserRouter>
                    <ViewParking/>
                </BrowserRouter>
            </div>
    )
}

export default AddParking;