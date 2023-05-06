import { MouseEvent, useEffect, useState } from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import { Models } from "../../components/cars/car";

export const CarsForm = () => {

    const routerUtils = useRouter();
    const userId = routerUtils.query.userId;
    const [cars, setCars] = useState<Models.CarModel[]>([]);

    
    if (userId == null) {
        return <div> Loading... </div>
    }

    function routeToPage(e: any, path: string): void {
        e.preventDefault();
        routerUtils.push(path);
    }

    const handleCars = async () => {
        const url = `${GlobalConstants.CARS_LINK}?ownerId=${userId}`;
        const _carsinfo = await fetch(url, {
            method: 'GET',
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
    }, []);


    return (
        <div>

            <ul>
                { 
                    Array.isArray(cars) 
                    ? cars.map((car) => {
                        return (
                            <div>
                                <button onClick={(e) => routeToPage(e, `${GlobalConstants.OWNER}/${userId}${GlobalConstants.CAR}/${car.carId}`)}> {car.plate} </button>
                            </div>
                        )
                    }) : null
                }
            </ul>

            <button onClick={(e) => routeToPage(e, GlobalConstants.ADD_CAR_PAGE)}> Add car </button>

        </div>
    );

}