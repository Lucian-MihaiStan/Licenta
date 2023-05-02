import React from "react";
import { CarsForm } from "../../components/cars/cars_form";
import { NextPage } from "next";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import { useRouter } from "next/router";

const Cars : NextPage = () => {

    const router = useRouter();
    const userId = router.query.userId;

    if (userId == null) {
        return <div> Loading... </div>
    }

    return (
        <div>
            <h1> {userId} </h1>

            <NavigationBar/>
            <CarsForm/>
        </div>
    )
}

export default Cars