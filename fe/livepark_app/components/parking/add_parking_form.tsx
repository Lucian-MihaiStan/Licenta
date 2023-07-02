import React, {useMemo, useRef, useState} from "react";
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
    const [usingSensors, setUsingSensors] = useState<boolean>(true);
    const host = useRef<any>(null);
    const port = useRef<any>(null);
    const username = useRef<any>(null);
    const password = useRef<any>(null);
    const topic = useRef<any>(null);
    const [withTLS, setWithTLS] = useState<boolean>(true);
    const routerUtils = useRouter();
    const navigate = useNavigate();
    const libraries = useMemo(() => ['places'], []);
    const [mapCenter, setMapCenter] = React.useState({ lat: 44.4251541, lng: 26.1078153 });
    const [mapRef, setMapRef] = React.useState<google.maps.Map>();
    const [location, setLocation] = React.useState<any>(null);

    const toNextPage = () => {
        if (location == null || name.current?.getData() == '' || address.current?.getData() == '' || parkingFee.current?.getData() == '' ||
            (usingSensors && (expiration_minutes.current?.getData() == '' || expiration_hours.current?.getData() == '' ||
                                host.current?.getData() == '' || port.current?.getData() == '' || username.current?.getData() == '' ||
                                password.current?.getData() == '' || topic.current?.getData() == ''))) {
            alert("Please fill every field and mark the parking location on the map.");
            return;
        }
        const sensorConfig = usingSensors ? {
            host: host.current?.getData(),
            port: port.current?.getData(),
            withTLS: withTLS,
            username: username.current?.getData(),
            password: password.current?.getData(),
            topic: topic.current?.getData()
        } : null;
        const data = {
            name: name.current?.getData(),
            address: address.current?.getData(),
            lat: location!.lat,
            lng: location!.lng,
            parkingFee: parkingFee.current?.getData(),
            expiration_hours: expiration_hours.current?.getData(),
            expiration_minutes: expiration_minutes.current?.getData(),
            sensorConfig: sensorConfig
        };
        navigate(GlobalConstants.CONFIGURE_PARKING_SCHEME, { state: data});
        routerUtils.push(GlobalConstants.CONFIGURE_PARKING_SCHEME);
    }
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
            <div className={styles.title}>Add a new parking</div>
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


                <div className={styles.text}> Sensors
                    <label className={styles.switch}>
                        <input type="checkbox" onChange={() => setUsingSensors(!usingSensors)} checked={usingSensors}/>
                        <span className={styles.slider}></span>
                    </label>
                </div>
                {
                    usingSensors &&
                    <>
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
                    </>
                }
                <button className={styles.nextButton} onClick={() => toNextPage()}> Next </button>
            </div>
            <div className={styles.form2}>
                {
                    usingSensors &&
                    <>
                    <div className={styles.mqttText}> MQTT Connection details:</div>
                    <TextBoxDivForm
                        type={InputConstants.TEXT_TYPE}
                        name="host"
                        placeholder="Host"
                        ref={host}
                    />
                    <TextBoxDivForm
                    type="number"
                    name="port"
                    placeholder="Port"
                    ref={port}
                    />
                    <TextBoxDivForm
                        type={InputConstants.TEXT_TYPE}
                        name="username"
                        placeholder="Username"
                        ref={username}
                    />
                    <TextBoxDivForm
                        type={InputConstants.PASSWORD_TYPE}
                        name="password"
                        placeholder="Password"
                        ref={password}
                    />
                    <TextBoxDivForm
                        type={InputConstants.TEXT_TYPE}
                        name="topic"
                        placeholder="Topic"
                        ref={topic}
                    />
                    <div className={styles.text}> TLS
                        <label className={styles.switch}>
                            <input type="checkbox" onChange={() => setWithTLS(!withTLS)} checked={withTLS}/>
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    </>
                }

                <div className={styles.mapTitle}> Please mark the location of the parking on the map:</div>
                <GoogleMap
                    options={mapOptions}
                    zoom={13}
                    center={mapCenter}
                    mapTypeId={google.maps.MapTypeId.ROADMAP}
                    mapContainerStyle={{ width: '400px', height: '400px', position: 'absolute', left: '550px', top: '25px', outline: 'transparent 1px', borderRadius: '25px'}}
                    onClick={ev => {
                        setLocation({lat: ev.latLng!.lat(), lng: ev.latLng!.lng()});
                        if (mapRef) {
                            setMapCenter(mapRef.getCenter());
                        }
                        console.log(location);
                    }}
                    onLoad={handleOnLoad}
                >
                    {
                        location !== null ?
                        <MarkerF position={location}/> : null
                    }
                </GoogleMap>
            </div>
        </div>

    )

}

