import { NextPage } from "next";
import { useRouter } from "next/router";
import { GlobalConstants } from "../../components/globalc_namespace/global-constants"
import React, { useEffect, useState } from "react";
import { Models } from "../../components/cars/car";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import { CarForm } from "../../components/cars/car_form";

const Car: NextPage = () => {
    
    const router = useRouter();
    const carId = router.query.carId;

    if (carId == null)
        return <div> Loading... </div>

        return (

        <div>
            <NavigationBar/>
            <CarForm/>
        </div>   
    )
}

export default Car;