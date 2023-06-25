import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { Models } from "./car";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { CarBackendConnectUtils } from "./car_get";
import classNames from "classnames";
import { CarCard } from "./car_component";
import Head from "next/head";
import cars_style from "@/components/cars/cars_styles/cars_style.module.css";


export const CarForm = () => {

    const router = useRouter();
    const carId = router.query.carId;
    const userId = router.query.owner;

    const [car, setCar] = useState<Models.CarModel>();

    const carInfo = async () => {
        setCar(await CarBackendConnectUtils.requestCar(carId as string));
    }

    useEffect(() => {
        carInfo();
    }, [carId, userId]);

    if (car == null)
        return <div> Loading... </div>

    function removeVehicle(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        CarBackendConnectUtils.removeVehicle(carId as string);
        router.push(GlobalConstants.CARS + "/" + userId);
    }

    function routeToCarDocument(e: any, document_type: string): void {
        e.preventDefault();
        router.push(`${GlobalConstants.OWNER}/${userId}${GlobalConstants.CAR}/${carId}${GlobalConstants.DOCUMENT}/${document_type}`);
    }

    function routeToEquipment(e: any, equipment_type: any): void {
        router.push(`${GlobalConstants.OWNER}/${userId}${GlobalConstants.CAR}/${carId}${GlobalConstants.EQUIPMENT}/${equipment_type}`);
    }

    function routeToPage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, path: string): void {
        e.preventDefault();
        router.push(path);
    }   

    return (
        <>
            <Head>
                <title> Car: LivePark </title>
                <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
            </Head>
            <div className={classNames(cars_style.cars_div_position)}>
                
                <div className={classNames(cars_style.title, cars_style.individual_car_title)}>{car.plate}</div>
                <div className={classNames(cars_style.back_to_cars_div)}>
                    <button className={classNames("btn btn-dark", cars_style.add_button)} onClick={(e) => routeToPage(e, GlobalConstants.CARS + "/" + userId)}> Back to cars list</button>
                </div>

                <div className={classNames("container-fluid", cars_style.ul_list)}>
                    <CarCard car={car} userId={userId as string} view_documents={false}/>
                </div>

                <div className={classNames("row")}>
                    <div className={classNames("col")}>
                        <div className={classNames("card text-white bg-primary mb-3", cars_style.max_width)} onClick={(e) => routeToCarDocument(e, GlobalConstants.RCA)}>
                            <div className={classNames("card-header")}>RCA</div>
                            <div className={classNames("card-body")}>
                                <h5 className={classNames("card-title")}>Răspundere Civilă Auto</h5>
                            </div>
                        </div>
                    </div>
                    <div className={classNames("col")}>
                        <div className={classNames("card text-white bg-secondary mb-3", cars_style.max_width)} onClick={(e) => routeToCarDocument(e, GlobalConstants.ITP)}>
                            <div className={classNames("card-header")}>ITP</div>
                            <div className={classNames("card-body")}>
                                <h5 className={classNames("card-title")}>Inspecția Tehnică Periodică</h5>
                            </div>
                        </div>
                    </div>
                    <div className={classNames("col")}>
                        <div className={classNames("card text-white bg-success mb-3", cars_style.max_width)} onClick={(e) => routeToCarDocument(e, GlobalConstants.ROVINIETA)}>
                            <div className={classNames("card-header")}>Rovinieta</div>
                            <div className={classNames("card-body")}>
                                <h5 className={classNames("card-title")}>Taxă de Circulație</h5>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={classNames("row")}>
                    <div className={classNames("col")}>
                        <div className={classNames("card bg-light mb-3", cars_style.max_width)} onClick={(e) => routeToCarDocument(e, GlobalConstants.CASCO)}>
                            <div className={classNames("card-header")}>Casco</div>
                            <div className={classNames("card-body")}>
                                <h5 className={classNames("card-title")}>Casualty and Collision</h5>
                            </div>
                        </div>
                    </div>
                    <div className={classNames("col")}>
                        <div className={classNames("card text-white bg-dark mb-3", cars_style.max_width)} onClick={(e) => routeToEquipment(e, GlobalConstants.FIRE_EXTINGUISHER)}>
                            <div className={classNames("card-header")}>Fire Extinguisher </div>
                            <div className={classNames("card-body")}>
                                <h5 className={classNames("card-title")}>Extintor</h5>
                            </div>
                        </div>
                    </div>
                    <div className={classNames("col")}>
                        <div className={classNames("card text-white bg-info mb-3", cars_style.max_width)} onClick={(e) => routeToEquipment(e, GlobalConstants.FIRST_AID_KIT)}>
                            <div className={classNames("card-header")}>First Aid Kit</div>
                            <div className={classNames("card-body")}>
                                <h5 className={classNames("card-title")}>Trusa prim-ajutor</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classNames("row", cars_style.button_remove_div)}> <button className={classNames("btn btn-danger", cars_style.remove_vehicle_btn)} onClick={(e) => removeVehicle(e)}> Remove Vehicle </button> </div>

            </div>
        </>
    )
}