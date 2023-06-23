import React from "react";
import { forwardRef } from "react";
import { CarCardProps } from "./car_card_props";
import classNames from "classnames";
import Image from "next/image";
import cars_style from "@/components/cars/cars_styles/cars_style.module.css";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import Head from "next/head";


export const CarCard = forwardRef((carProps: CarCardProps) => {

    const car = carProps.car;
    const userId = carProps.userId;
    const view_documents = carProps.view_documents;
    const routerUtils = useRouter();

    function routeToPage(e: any, path: string): void {
        e.preventDefault();
        routerUtils.push(path);
    }


    return (

        <>

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
                        { 
                            view_documents ? <button className={classNames("btn btn-secondary")} onClick={(e) => routeToPage(e, `${GlobalConstants.OWNER}/${userId}${GlobalConstants.CAR}/${car.carId}`)}> View Documents </button> : <></>
                        }
                    </div>
                </div>

            </div>
        </div>

        </div>
        </>
    )

});