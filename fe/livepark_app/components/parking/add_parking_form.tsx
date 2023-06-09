import React, {useMemo, useRef} from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { InputConstants } from '../globalc_namespace/inputc/input-constants';
import { TextBoxDivForm } from '../html_components/textbox/textbox-register-login';
import styles from '../parking/add_parking_form.module.css'
import { useRouter } from "next/router";
import {GoogleMap, MarkerF, useLoadScript} from '@react-google-maps/api';
import {useNavigate} from 'react-router-dom';

export const AddParkingForm = () => {

    const name = useRef<any>(null);
    const address = useRef<any>(null);
    const parkingFee = useRef<any>(null);
    const expiration_hours = useRef<any>(null);
    const expiration_minutes = useRef<any>(null);

    const userId = localStorage.getItem(GlobalConstants.USER_ID) as string;
    const routerUtils = useRouter();
    const navigate = useNavigate();

    const postParking = async (event: any) => {
        event.preventDefault();
        const url = GlobalConstants.PARKING_LINK + "?userId=" + userId;
        const response = await fetch(url, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN)
            },
            body: JSON.stringify({
                name: name.current?.getData(),
                address: address.current?.getData(),
                lat: location.lat,
                lng: location.lng,
                parkingFee: parkingFee.current?.getData(),
                expiration_hours: expiration_hours.current?.getData(),
                expiration_minutes: expiration_minutes.current?.getData()
            })
        });

        if (response.ok) {
            routerUtils.push(GlobalConstants.PARKING_AREAS_PAGE);
        }
    }

    const toNextPage = () => {
        const data = {
            name: name.current?.getData(),
            address: address.current?.getData(),
            lat: location.lat,
            lng: location.lng,
            parkingFee: parkingFee.current?.getData(),
            expiration_hours: expiration_hours.current?.getData(),
            expiration_minutes: expiration_minutes.current?.getData(),
        };
        navigate('/parking/configureParkingScheme', { state: data});
        routerUtils.push(GlobalConstants.CONFIGURE_PARKING_SCHEME);
    }

    const libraries = useMemo(() => ['places'], []);
    const [mapCenter, setMapCenter] = React.useState({ lat: 44.4251541, lng: 26.1078153 });
    const [mapref, setMapRef] = React.useState<google.maps.Map>();
    const [location, setLocation] = React.useState({ lat: 44.4251541, lng: 26.1078153 });
    const handleOnLoad = (map: any) => {
        setMapRef(map);
    };

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

    return (
        <div>
            <div className={styles.titleBox}>Add a new parking</div>
            <div className={styles.content}>
            <div className={styles.form}>

                <TextBoxDivForm
                    type={InputConstants.TEXT_TYPE}
                    name={InputConstants.PARKING_NAME}
                    placeholder={InputConstants.PARKING_NAME_PLACEHOLDER}
                    ref={name}
                />

                <TextBoxDivForm
                    type={InputConstants.TEXT_TYPE}
                    name={InputConstants.PARKING_ADDRESS}
                    placeholder={InputConstants.PARKING_ADDRESS_PLACEHOLDER}
                    ref={address}
                />

                <TextBoxDivForm
                    type={InputConstants.TEXT_TYPE}
                    name={InputConstants.PARKING_FEE}
                    placeholder={InputConstants.PARKING_FEE_PLACEHOLDER}
                    ref={parkingFee}
                />

                <TextBoxDivForm
                    type={InputConstants.TEXT_TYPE}
                    name={InputConstants.PARKING_EXPIRATION_HOURS}
                    placeholder={InputConstants.PARKING_EXPIRATION_HOURS_PLACEHOLDER}
                    ref={expiration_hours}
                />

                <TextBoxDivForm
                    type={InputConstants.TEXT_TYPE}
                    name={InputConstants.PARKING_EXPIRATION_MINUTES}
                    placeholder={InputConstants.PARKING_EXPIRATION_MINUTES_PLACEHOLDER}
                    ref={expiration_minutes}
                />

                <div className={styles.mapTitle}> Please mark the position on the map:</div>
                <GoogleMap
                    options={mapOptions}
                    zoom={13}
                    center={mapCenter}
                    mapTypeId={google.maps.MapTypeId.ROADMAP}
                    mapContainerStyle={{ width: '400px', height: '400px', position: 'absolute', left: '350px', top: '35px', outline: 'transparent 1px', borderRadius: '25px'}}
                    onClick={ev => {
                        setLocation({lat: ev.latLng.lat(), lng: ev.latLng.lng()});
                        if (mapref) {
                            setMapCenter(mapref.getCenter());
                        }
                        console.log(location);
                    }}
                    onLoad={handleOnLoad}
                >
                    <MarkerF position={location}/>
                </GoogleMap>
            </div>

                <button className={styles.button} onClick={() => toNextPage()}> Add parking </button>
            </div>
        </div>

    )

}

