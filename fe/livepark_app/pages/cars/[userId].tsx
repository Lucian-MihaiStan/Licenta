import React from "react";
import { CarsForm } from "../../components/cars/cars_form";
import { NextPage } from "next";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import { useRouter } from "next/router";
import navigationBarStyle from '../../components/navigation_bar/navigation-bar.module.css'


const Cars : NextPage = () => {

    const router = useRouter();
    const userId = router.query.userId;

    if (userId == null) {
        return <div> Loading... </div>
    }

    return (
        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <CarsForm/>
            </section>
        </div>
    )
}

export default Cars