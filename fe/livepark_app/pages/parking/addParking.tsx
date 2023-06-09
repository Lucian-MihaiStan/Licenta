import { NextPage } from "next"
import React from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {AddParkingForm} from "../../components/parking/add_parking_form";
import {BrowserRouter} from "react-router-dom";


const AddParking: NextPage = () => {

    return (
        <div>
            <NavigationBar/>
            <BrowserRouter>
                <AddParkingForm/>
            </BrowserRouter>
        </div>
    )
}

export default AddParking;