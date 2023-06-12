import { NextPage } from "next"
import React, {useEffect, useState} from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {AddParkingForm} from "../../components/parking/add_parking_form";
import {BrowserRouter} from "react-router-dom";


const AddParking: NextPage = () => {
    const [render, setRender] = useState<boolean>(false);
    useEffect(() => setRender(true), []);
    return (
        !render ? <div> Loading... </div> :
        <div>
            <NavigationBar/>
            <BrowserRouter>
                <AddParkingForm/>
            </BrowserRouter>
        </div>
    )
}

export default AddParking;