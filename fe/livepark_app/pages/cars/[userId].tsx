import React from "react";
import { CarsForm } from "../../components/cars/cars_form";
import { NextPage } from "next";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import { useRouter } from "next/router";
import navigationBarStyle from '../../components/navigation_bar/navigation-bar.module.css'
import Head from "next/head";


const Cars : NextPage = () => {

    const router = useRouter();
    const userId = router.query.userId;

    if (userId == null) {
        return <div> Loading... </div>
    }

    return (
        <>
            <Head>
                <title> Car: LivePark </title>
                <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
            </Head>
            <div>
                <NavigationBar/>
                <section className={navigationBarStyle.home_section}>
                    <CarsForm/>
                </section>
            </div>
        
        </>
    )
}

export default Cars