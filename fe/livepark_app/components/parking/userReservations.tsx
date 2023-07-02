import React, {MouseEvent, useEffect, useMemo, useState} from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import styles from "./userReservations.module.css";
import {Reservation} from "@/components/parking/reservation";
import {DeleteIcon} from "@/components/parking/images/delete-icon";
import Head from "next/head";


export const UserReservations = () => {
    const router = useRouter();
    const [reservations, setReservations] = useState<Reservation[]>([]);

    function getParsedDate(dateStr: string): string{
        let date = new Date(dateStr);
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        let hours = date.getHours();
        let min = date.getMinutes();

        let d, m, h, mins = "";
        if (dd < 10)
            d = '0' + dd;
        else
            d = dd.toString();
        if (mm < 10)
            m = '0' + mm;
        else
            m = mm.toString();
        if (hours < 10)
            h = '0' + hours;
        else
            h = hours.toString();
        if (min < 10)
            mins = '0' + min;
        else
            mins = min.toString();
        return d + "/" + m + "/" + yyyy + " at " + h + ":" + mins;
    }

    const handleReservations = async () => {
        const url = `${GlobalConstants.RESERVATIONS_LINK}`;
        const response = await fetch(url, {
            method: GlobalConstants.GET_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            }
        });
        if (!response.ok) {
            alert("ERROR: There was an error encountered while trying to get the reservations from the server. Please try again.");
            await router.push(GlobalConstants.DASHBOARD);
            return;
        }

        const resList = await response.json();
        resList.map((r:Reservation) => {
            r.createdTime = getParsedDate(r.createdTime);
            r.expirationTime = getParsedDate(r.expirationTime);
        })
        setReservations(resList);
    }
    useEffect(() => {
        handleReservations();
    }, []);

    async function handleDelete(r : Reservation){
        const url = GlobalConstants.RESERVATIONS_LINK + "/" + r.id;
        const response = await fetch(url, {
            method: GlobalConstants.DELETE_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            }
        });
        if (response.ok) {
            location.reload();
        }
    }

    return (
        <>
            <Head>
                <title> Reservations </title>
            </Head>
        <div>
            <div className={styles.titleBox}>Your reservations</div>
            <ul className={styles.reservationList}>
                {
                    reservations.length != 0
                        ? reservations.map((r) => {
                            return (
                                <div key={r.id} className={styles.reservationSlot}>
                                    <div>
                                        <span className={styles.carPlate}>Car plate: <span className={styles.bold}>{r.carPlate}</span></span>
                                        <span className={styles.spotNumber}>Parking spot number: <span className={styles.bold}>{r.parkingSpot_number}</span></span>
                                        <div className={`${styles.availability} ${styles.bold}`}> {r.createdTime} - {r.expirationTime}</div>
                                        <button className={styles.deleteBtn} onClick={() => document.getElementById('modal' + r.id)!.style.display = "block"}>
                                            <DeleteIcon/>
                                        </button>
                                        <div className={styles.parkingName}>{r.parking_name}</div>
                                        <div className={styles.parkingAddress}>{r.parking_address}</div>
                                    </div>
                                    <div id={"modal" + r.id} className={styles.modal}>
                                        <div className={styles.modalContent}>
                                            <div className={styles.modalText}> Are you sure that you want to delete the reservation? </div>
                                            <button className={styles.cancelButton} onClick={() => document.getElementById('modal' + r.id)!.style.display = "none"}>Cancel</button>
                                            <button className={styles.deleteButton} onClick={() => handleDelete(r)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <div style={{position: "relative", left: "70px"}}> No reservations found. </div>
                }
            </ul>
        </div>
        </>
    );

}