import React, {MouseEvent, useEffect, useMemo, useState} from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import styles from "./adminReservations.module.css";
import {Reservation} from "@/components/parking/reservation";
import Head from "next/head";


export const AdminReservations = () => {
    const router = useRouter();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [parkingList, setParkingList] = useState<string[]>([]);
    const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
    const [searchText, setSearchText] = useState("");
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
        const url = `${GlobalConstants.RESERVATIONS_LINK}/allForAdmin`;
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
            alert("ERROR: You may not have access for this page or there may have been a server error.");
            await router.push(GlobalConstants.DASHBOARD);
            return;
        }

        const resList = await response.json();
        resList.map((r:Reservation) => {
            r.createdTime = getParsedDate(r.createdTime);
            r.expirationTime = getParsedDate(r.expirationTime);
        })
        let parkings : string[] = [];
        let p = '';
        resList.forEach(r => {
            p = r.parking_name + ", " + r.parking_address;
            console.log(parkings.includes(p));
            if (!parkings.includes(p)) {
                console.log(p);
                parkings.push(p);
            }
        });
        setReservations(resList);
        setFilteredReservations(resList);
        setParkingList(parkings);

    }
    useEffect(() => {
        handleReservations();
    }, []);

    function handleSearchTextChange(e : any) : void {
        setSearchText(e.target.value);
    }

    function handleSearch() : void {
        if (searchText === '') {
            setFilteredReservations(reservations);
            return;
        }

        const filteredData = reservations.filter((r) => {
            return (r.parking_name + ", " + r.parking_address === searchText);
        });
        setFilteredReservations(filteredData);
    }

    return (
        <>
            <Head>
                <title> Parkings reservations </title>
            </Head>
        <div>
            <div className={styles.titleBox}>Reservations for your parkings</div>
            <div>
                <input type="text" className={styles.searchBar} placeholder="Filter by parking..." onChange={handleSearchTextChange} list="parkingList"/>
                <button className={styles.searchButton} onClick={handleSearch}>Filter</button>
                <datalist id="parkingList">
                    {parkingList.map((p) =>
                        <option key={parkingList.indexOf(p)} value={p} />
                    )}
                </datalist>
            </div>
            <ul className={styles.reservationList}>
                {
                    filteredReservations.length != 0
                        ? filteredReservations.map((r) => {
                            return (
                                <div key={r.id} className={styles.reservationSlot}>
                                    <div>
                                        <span className={styles.carPlate}>Car plate: <span className={styles.bold}>{r.carPlate}</span></span>
                                        <span className={styles.spotNumber}>Parking spot number: <span className={styles.bold}>{r.parkingSpot_number}</span></span>
                                        <div className={`${styles.availability} ${styles.bold}`}> {r.createdTime} - {r.expirationTime}</div>
                                        <div className={styles.parkingName}>{r.parking_name}</div>
                                        <div className={styles.parkingAddress}>{r.parking_address}</div>
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