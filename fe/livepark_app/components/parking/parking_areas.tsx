import React, {MouseEvent, useEffect, useMemo, useState} from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import { Models } from "../../components/parking/parking";
import styles from "./parking_areas.module.css"
import {GoogleMap, MarkerF, useLoadScript} from '@react-google-maps/api';
import ParkingModel = Models.ParkingModel;


export const ParkingPage = () => {

    const routerUtils = useRouter();
    const userId = routerUtils.query.userId;
    const [parkings, setParkings] = useState<Models.ParkingModel[]>([]);

    function routeToPage(e: any, path: string): void {
        e.preventDefault();
        routerUtils.push(path);
    }

    const handleParkings = async () => {
        const url = `${GlobalConstants.PARKING_LINK}`;
        const _parkings_info = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            }
        });

        const _parkings = await _parkings_info.json();
        setParkings(_parkings);
    }

    useEffect(() => {
        handleParkings();
    }, []);

    const libraries = useMemo(() => ['places'], []);
    const [mapCenter, setMapCenter] = useState({ lat: 44.46, lng: 26.17 });

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: true,
        }),
        []
    );

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCmrP0BzhEJfj3LH8o2DwwCm2GfujyRcUs",
        libraries: libraries as any,
    });
    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    function handleHover(p : ParkingModel): void {
        if (typeof window !== 'undefined')
            setMapCenter({ lat: p.lat, lng: p.lng });
    }

    return (
        <div>
            <div className={styles.titleBox}>Parking areas</div>

            <div className={styles.content}>

            <ul className={styles.parkingList}>
                {
                    Array.isArray(parkings)
                        ? parkings.map((p) => {
                            return (
                                <div className={styles.parkingSlot}
                                     onMouseEnter={() => handleHover(p)}>
                                    <div>
                                        <div className={styles.parkingName}>{p.name}</div>
                                        <div className={styles.parkingAddress}>{p.address}</div>
                                        <span className={styles.parkingSpots}>{p.hasSensors ?
                                            <span><span className={styles.emptySpotsText}>{p.emptySpots} empty</span><span className={styles.totalSpotsText}> | {p.totalSpots}</span></span> :
                                            <span className={styles.totalSpotsText}>{p.totalSpots} parking spots</span>}
                                        </span>
                                        <span className={styles.parkingFee}>{p.parkingFee}</span>
                                    </div>
                                </div>
                            )
                        }) : null
                }
            </ul>

            <GoogleMap
                options={mapOptions}
                zoom={14}
                center={mapCenter}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: '700px', height: '700px', position: 'absolute', right: '150px', top: '25px', outline: 'transparent 1px', borderRadius: '25px'}}
                onLoad={() => console.log('Map Component Loaded...')}
            >
                <MarkerF position={mapCenter}/>
            </GoogleMap>
            </div>

            <button onClick={(e) => routeToPage(e, GlobalConstants.ADD_PARKING_PAGE)}> Add a new parking area </button>

        </div>
    );

}