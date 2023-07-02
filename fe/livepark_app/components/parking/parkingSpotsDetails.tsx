import React, {ChangeEvent, useState} from "react";
import {Models} from "@/components/parking/parkingSpot";
import ParkingSpotModel = Models.ParkingSpotModel;
import {GlobalConstants} from "@/components/globalc_namespace/global-constants";
import {useRouter} from "next/router";
import {useLocation} from "react-router-dom";
import styles from '../parking/configure_parking_slots.module.css'
import styles2 from '../parking/parkingSpotsDetails.module.css'
import {EditIcon} from "@/components/parking/images/edit-icon";

export const ConfigureParkingSpotsDetails = () => {
    const [renderSwitch, setRenderSwitch] = React.useState<boolean>(false);
    const router = useRouter();
    const location = useLocation();
    const parking_data = location.state.parking_data;
    let slots = location.state.slots;
    const width = location.state.width;
    const height = location.state.height;

    const goToNextPage = async () => {
        // add the parking
        let url = GlobalConstants.PARKING_LINK;
        let response = await fetch(url, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN)
            },
            body: JSON.stringify(parking_data)
        });
        if (!response.ok) {
            alert("Could not add the parking.");
            return;
        }

        let parkingId = await response.json();
        // add the parking spots
        console.log(parkingId);
        let parkingSpots_data = [].concat(...slots);
        url = GlobalConstants.PARKING_SPOTS_LINK + "?parkingId=" + parkingId;
        response = await fetch(url, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN)
            },
            body: JSON.stringify(parkingSpots_data)
        });
        if (!response.ok) {
            alert("Could not add the parking spots.");
            return;
        }

        alert("The parking was added successfully.");
        router.push(GlobalConstants.PARKING_AREAS_PAGE);
    }

    const handleSave = (s : ParkingSpotModel) => {
        s.number = (document.getElementById('number' + s.key) as HTMLInputElement).value;
        slots[s.position.i][s.position.j].sensorDeviceName = (document.getElementById('deviceName' + s.key) as HTMLInputElement).value;
        document.getElementById('modal' + s.key)!.style.display = "none";
        setRenderSwitch(!renderSwitch);
    }

    function applyMap(arr: ParkingSpotModel[]): any {
        return (
                <div className={styles.line} style={{width: (70 + width * 80) + 'px'}}>
                    {
                        Array.isArray(arr)
                            ? arr.map((s) => {
                                return (
                                    <div key={s.key}>
                                        <div className={`${styles.slot} ${s.isRotated && !s.isAutoCreated && styles.rotatedFirstSlot}
                                                        ${s.isRotated && s.isAutoCreated && styles.rotatedSecondSlot}
                                                        ${s.isDeleted && styles2.deletedSlot} ${s.isAutoCreated && styles.autocreatedSlot}
                                                        ${(s.number && slots[s.position.i][s.position.j].sensorDeviceName) && styles2.configuredSlot}`}>
                                            {
                                                !s.isDeleted ?
                                                <button className={`${styles2.editButton}`} onClick={() => document.getElementById('modal' + s.key)!.style.display = "block"}>
                                                    <div className={`${s.isRotated &&  styles.rotatedBackwards}`}>
                                                        <EditIcon/>
                                                    </div>
                                                </button> : null
                                            }
                                        </div>
                                        <div id={"modal" + s.key} className={styles2.modal}>
                                            <div className={styles2.modalContent}>
                                                <button className={styles2.close} onClick={() => document.getElementById('modal' + s.key)!.style.display = "none"}>&times;</button>
                                                <div>
                                                    <label className={styles2.label}>Identifying number: <input id={"number" + s.key} type="text" className={styles2.spotNumber} defaultValue={s.number}/> </label>
                                                </div>
                                                <div>
                                                    <label className={styles2.sensorLabel}>Sensor device_Id: </label><textarea id={"deviceName" + s.key} className={styles2.deviceName} defaultValue={slots[s.position.i][s.position.j].sensorDeviceName}/>
                                                </div>
                                                <button className={styles2.saveButton} onClick={() => handleSave(s)}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : null
                    }
                </div>
        )
    }

    return (
        <div className={styles.mainArea}>
            <div className={styles2.title}>Configure the identifying number and the device_id of the sensor for each parking spot:</div>
            <div className={styles.grid} style={{width: (10 + width * 48) + 'px', height: (5 + height * 86) + 'px'}}>
                {
                    slots.map(applyMap)
                }
            </div>
            <button className={styles2.nextButton} onClick={goToNextPage}> Create parking </button>
        </div>
    );
}