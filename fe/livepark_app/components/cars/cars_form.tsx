import { MouseEvent, useEffect, useState } from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import { Models } from "../../components/cars/car";
import Image from "next/image";
import Head from "next/head";
import cars_style from "@/components/cars/cars_styles/cars_style.module.css";
import classNames from "classnames";

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
            <title> Cars: LivePark </title>
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
                            <div className={classNames("row", cars_style.ul_list)}>
                                <div className={classNames("card mb-3", cars_style.mwidth)}>
                                    <div className={classNames("row no-gutters")}>
                                        <div className={classNames("col-md-4", cars_style.wrapper_img)}>

                                        <Image
                                            src='/audi_ParkLive.png'
                                            className={classNames(cars_style.img_position)}
                                            alt={car.brand}
                                            width={100}
                                            height={100}
                                        />

                                        </div>

                                        <div className={classNames("col-md-8")}>
                                            <div className={classNames("card-body")}>
                                                <h5 className={classNames("card-title")}>{car.plate}</h5>
                                                <div className={classNames("card-text")}>{car.brand} {car.model}</div>
                                                <div className={classNames("card-text")}>VIN: {car.vin}</div>
                                                <div className={classNames("card-text")}>Fabrication Date: {car.fabricationDate.toString()}</div>
                                                <div className={classNames("card-text", cars_style.last_text)}><small className={classNames("text-muted")}>Last updated 3 mins ago</small></div>
                                            <button className={classNames("btn btn-secondary")} onClick={(e) => routeToPage(e, `${GlobalConstants.OWNER}/${userId}${GlobalConstants.CAR}/${car.carId}`)}> View Documents </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    }) : null
                }
            </div>
        </div>
        </>
    );

}