import React, {useEffect, useMemo, useState} from "react";
import styles from "@/components/parking/configure_parking_slots.module.css";
import {Models} from "@/components/parking/parkingSpot";
import {GlobalConstants} from "@/components/globalc_namespace/global-constants";
import {useRouter} from "next/router";
import {useLocation, useNavigate} from "react-router-dom";
import styles2 from "@/components/parking/parkingSpotsDetails.module.css";
import ParkingSpotModel = Models.ParkingSpotModel;
import ParkingSpotStatus = Models.ParkingSpotStatus;
import {GoogleMap, MarkerF} from "@react-google-maps/api";

export const ViewParking = () => {
    const router = useRouter();
    const location = useLocation();
    const parking_data = location.state;
    const mapCenter = { lat: parking_data.lat, lng: parking_data.lng };
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [carPlate, setCarPlate] = useState("");

    const [slots, setSlots] = useState<Models.ParkingSpotModel[][]>([]);
    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: true,
        }),
        []
    );

    const handleParkingSpots = async () => {
        const url = GlobalConstants.PARKING_SPOTS_LINK + "?parkingId=" + parking_data?.id;
        const parking_spots_info = await fetch(url, {
            method: GlobalConstants.GET_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            }
        });

        const _parking_spots = await parking_spots_info.json();
        let arr : ParkingSpotModel[][] = []
        let i = -1;
        let prev_i = -1;
        for (let p of _parking_spots) {
            prev_i = i;
            i = p.position.i;
            if (i !== prev_i)
                arr[i] = [];
            arr[i][p.position.j] = p;
        }
        setHeight(arr.length);
        setWidth(arr[0].length);
        setSlots(arr);
    }
    useEffect(() => {
        handleParkingSpots();
    }, []);

    const goToPreviousPage = async () => {
        await router.push(GlobalConstants.PARKING_AREAS_PAGE);
    }

    const handleSave = async (s : ParkingSpotModel) => {
        const val = (document.getElementById('carPlate' + s.key) as HTMLInputElement).value;
        if (val !== "") {
            document.getElementById('modal' + s.key)!.style.display = "none";
            // send the reservation
            const reservation_data = {
                parkingSpot_id: s.id,
                carPlate: val
            };
            let response = await fetch(GlobalConstants.RESERVATIONS_LINK, {
                method: GlobalConstants.POST_REQUEST,
                headers: {
                    "Content-Type": GlobalConstants.APPLICATION_JSON,
                    "Access-Control-Allow-Origin": GlobalConstants.STAR,
                    "Origin": GlobalConstants.FRONTEND_API_LINK,
                    "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN)
                },
                body: JSON.stringify(reservation_data)
            });
            if (!response.ok) {
                alert("Could not make the reservation. You may already have a reservation for " + val + ".");
                // await router.push(GlobalConstants.PARKING_AREAS_PAGE);
                setCarPlate(val);
                return;
            }
            alert("The reservation was made. You can find it in the 'Reservations' tab.");
            router.push(GlobalConstants.PARKING_AREAS_PAGE);
        }
    }

    function applyMap(arr: ParkingSpotModel[]): any {
        return (
            <>
                <div className={styles.line} style={{width: (70 + width * 80) + 'px'}}>
                    {
                        Array.isArray(arr)
                            ? arr.map((s) => {
                                return (
                                    <div key={s.key}>
                                        <div className={`${styles.slot} ${s.isRotated && !s.isAutoCreated && styles.rotatedFirstSlot} 
                                             ${s.isRotated && s.isAutoCreated && styles.rotatedSecondSlot} ${s.isDeleted && styles.transparentSlot} 
                                             ${s.isAutoCreated && styles.autocreatedSlot} ${s.status == ParkingSpotStatus.OCCUPIED && styles.occupiedSlot}
                                             ${s.status == ParkingSpotStatus.EMPTY && styles.emptySlot} ${s.status == ParkingSpotStatus.RESERVED && styles.reservedSlot}`}>
                                            {
                                                !s.isDeleted && s.status == ParkingSpotStatus.EMPTY ?
                                                    <button className={`${styles2.reserveButton} ${styles.pointerCursor}`} onClick={() => document.getElementById('modal' + s.key)!.style.display = "block"}>
                                                    </button> : null
                                            }
                                        </div>
                                        <div id={"modal" + s.key} className={styles2.modal}>
                                            <div className={styles2.modalContent}>
                                                <button className={styles2.close} onClick={() =>document.getElementById('modal' + s.key)!.style.display = "none"}>&times;</button>
                                                <div className={styles2.modalText}>
                                                    Please mention the vehicle registration plate for the reservation:
                                                </div>
                                                <div>
                                                    <label className={styles2.carPlateLabel}>Car plate: <input id={"carPlate" + s.key} type="text" className={styles2.carPlate} defaultValue={carPlate}/> </label>
                                                </div>
                                                <button className={styles2.reserveNow} onClick={() => handleSave(s)}>Reserve now</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : null
                    }
                </div>
            </>
        )
    }

    return (
        <div>
        <div>
            <button className={styles2.backButton} onClick={goToPreviousPage}>Back</button>
        </div>
        <div className={styles2.titleBox}>
            <div className={styles2.parkingTitle}>{parking_data?.name}</div>
            <span className={styles2.parkingAddress}>{parking_data?.address} &#9679;</span>
            <span className={styles2.parkingFee}>{parking_data?.parkingFee}</span>
        </div>
        <GoogleMap
            options={mapOptions}
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: '250px', height: '250px', position: 'relative', top: '-200px', left: '800px', outline: 'transparent 1px', borderRadius: '25px'}}
            onLoad={() => console.log('Map Component Loaded...')}
        >
            <MarkerF position={mapCenter}/>
        </GoogleMap>
        <a href={"https://www.google.com/maps/dir//" + parking_data.lat + "," + parking_data.lng + "/@" + parking_data.lat + "," + parking_data.lng + ",14z"} target="_blank" className={styles2.mapsButton}>Open with Google Maps</a>
        <div className={styles2.descriptionText}>If you want to make a reservation for a parking spot, click on an empty one:</div>
        <div className={`${styles2.legend} ${styles2.descriptionText}`}>
            <div className={styles2.emptyRectangle}></div> <div className={styles2.legendLabel}>Empty </div>
            <div className={styles2.occupiedRectangle}></div> <div className={styles2.legendLabel}>Occupied </div>
            <div className={styles2.reservedRectangle}></div> <div className={styles2.legendLabel}>Reserved </div>
            <div className={styles2.unknownRectangle}></div> <div className={styles2.legendLabel}>Unknown </div>
        </div>
        <div className={styles2.grid} style={{width: (width * 48 + 10) + 'px', height: (5 + height * 86) + 'px'}}>
            {
                slots.map(applyMap)
            }
        </div>
    </div>
    );
}