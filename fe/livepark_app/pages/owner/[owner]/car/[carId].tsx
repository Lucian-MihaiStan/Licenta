import { NextPage } from "next";
import { useRouter } from "next/router";
import { GlobalConstants } from "@/components/globalc_namespace/global-constants"
import React, { useEffect, useState } from "react";
import { Models } from "@/components/cars/car";
import { NavigationBar } from "@/components/navigation_bar/navigation-bar";
import { CarForm } from "@/components/cars/car_form";
import navigationBarStyle from '@/components/navigation_bar/navigation-bar.module.css'

const Car: NextPage = () => {
    
    const router = useRouter();
    const carId = router.query.carId;

    useEffect(() => {
        if (carId == null)
            router.push(GlobalConstants.LOGIN);
    }, [carId]);

    return (

        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <CarForm/>
            </section>
        </div>   
    )
}

export default Car;