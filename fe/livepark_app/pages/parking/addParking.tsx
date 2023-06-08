import { NextPage } from "next"
import React from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import {AddParkingForm} from "../../components/parking/add_parking_form";


const AddParking: NextPage = () => {

    return (
        <div>
            <NavigationBar/>
            <AddParkingForm/>
        </div>
    )
}

export default AddParking;