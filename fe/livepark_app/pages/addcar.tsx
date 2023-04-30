import { NextPage } from "next"
import React from "react";
import { NavigationBar } from "../components/navigation_bar/navigation-bar";
import { AddCarForm } from "../components/cars_page/add_car_form";


const AddCar: NextPage = () => {
    
    return (
        <div>
            <NavigationBar/>
            <AddCarForm/>
        </div>
    )
}

export default AddCar;