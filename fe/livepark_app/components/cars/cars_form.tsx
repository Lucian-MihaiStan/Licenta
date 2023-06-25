import { MouseEvent, useEffect, useState } from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import { Models } from "../../components/cars/car";
import Head from "next/head";
import cars_style from "@/components/cars/cars_styles/cars_style.module.css";
import classNames from "classnames";
import { CarCard } from "./car_component";
import Car from "@/pages/owner/[owner]/car/[carId]";

export const CarsForm = () => {

    const routerUtils = useRouter();
    const userId = routerUtils.query.userId;
    const [cars, setCars] = useState<Models.CarModel[]>([]);

    function routeToPage(e: any, path: string): void {
        e.preventDefault();
        routerUtils.push(path);
    }

    const handleCars = async () => {
        const url = `${GlobalConstants.CARS_LINK}?userId=${userId}`;
        const _carsinfo = await fetch(url, {
            method: GlobalConstants.GET_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            }
        });

        const _cars = await _carsinfo.json();
        setCars(_cars);
    }

    useEffect(() => {
        handleCars();
    }, [userId]);

        
    if (userId == null) {
        return <div> Loading... </div>
    }

    return (
        <>
        <Head>
            <title> Cars: ParkLive </title>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
	        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </Head>

        <div className={classNames(cars_style.cars_div_position)}>
            <div className={classNames(cars_style.title)}>MY CARS</div>

            <div className={classNames(cars_style.subtitle)}>Got a new car?</div>

            <button className={classNames("btn btn-dark", cars_style.add_button)} onClick={(e) => routeToPage(e, GlobalConstants.ADD_CAR_PAGE)}> Add here </button>

            <div className={classNames("container-fluid", cars_style.ul_list)}>
                { 
                    Array.isArray(cars) 
                    ? cars.map((car) => {
                        return (
                            <CarCard car={car} userId={userId} view_documents={true}/>
                        )
                    }) : null
                }
            </div>
        </div>
        </>
    );

}