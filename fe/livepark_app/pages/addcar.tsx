import { NextPage } from "next"
import React from "react";
import { NavigationBar } from "../components/navigation_bar/navigation-bar";
import { AddCarForm } from "../components/cars/add_car_form";
import navigationBarStyle from '@/components/navigation_bar/navigation-bar.module.css'


const AddCar: NextPage = () => {
    
    return (
        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <AddCarForm/>
            </section>
        </div>
    )
}

export default AddCar;