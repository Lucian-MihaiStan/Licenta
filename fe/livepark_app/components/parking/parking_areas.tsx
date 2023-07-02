import React, {MouseEvent, useEffect, useMemo, useState} from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { useRouter } from "next/router";
import { Models } from "../../components/parking/parking";
import styles from "./parking_areas.module.css"
import {GoogleMap, MarkerF, useLoadScript} from '@react-google-maps/api';
import ParkingModel = Models.ParkingModel;
import {useNavigate} from "react-router-dom";
import {DeleteIcon} from "@/components/parking/images/delete-icon";
import USER_ROLE_MASTER = GlobalConstants.USER_ROLE_MASTER;
import {EditIcon} from "@/components/parking/images/edit-icon";


export const ParkingPage = () => {

    const router = useRouter();
    const navigate = useNavigate();
    const [parkings, setParkings] = useState<Models.ParkingModel[]>([]);
    const [filteredParkings, setFilteredParkings] = useState<Models.ParkingModel[]>([]);
    const [searchText, setSearchText] = useState("");
    const [zoom, setZoom] = useState(12);

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
        setFilteredParkings(_parkings);
    }
    useEffect(() => {
        handleParkings();
    }, []);

    const [userRole, setUserRole] = useState<any>(null);
    const [userId, setUserId] = useState<any>(null);
    useEffect(() => {
        setUserRole(localStorage.getItem(GlobalConstants.USER_ROLE));
        setUserId(localStorage.getItem(GlobalConstants.USER_ID));
    }, [])

    const libraries = useMemo(() => ['places'], []);
    const [mapCenter, setMapCenter] = useState({ lat: 44.4251541, lng: 26.1078153 });

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

    function routeToPage(e: any, path: string): void {
        e.preventDefault();
        router.push(path);
    }


    function handleHover(p : ParkingModel): void {
        if (typeof window !== 'undefined') {
            setMapCenter({lat: p.lat, lng: p.lng});
            setZoom(15);
        }
    }

    function handleClick(p : ParkingModel): void {
        navigate(GlobalConstants.VIEW_PARKING_PAGE, { state: p});
        router.push(GlobalConstants.VIEW_PARKING_PAGE);
    }

    function handleSearchTextChange(e : any) : void {
        let lowercase = e.target.value.toLowerCase();
        setSearchText(lowercase);
    }

    function handleSearch() : void {
        if (searchText === '') {
            setFilteredParkings(parkings);
            return;
        }

        const filteredData = parkings.filter((p) => {
            return p.name.toLowerCase().includes(searchText) || p.address.toLowerCase().includes(searchText);
        });
        setFilteredParkings(filteredData);
    }

    async function handleDelete(p : ParkingModel){
        const url = GlobalConstants.PARKING_LINK + "/" + p.id;
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

    const handleEdit = async (p: ParkingModel) => {
        const data = {
            id: p.id
        };
        navigate(GlobalConstants.EDIT_PARKING_PAGE, { state: data});
        router.push(GlobalConstants.EDIT_PARKING_PAGE);
    }

    return (
        userRole == null || !isLoaded ? <div> Loading... </div> :
        <div>
            <div className={styles.titleBox}>Parking areas</div>
            <div>
                <input type="text" className={styles.searchBar} placeholder="Search for parking name or address..." onChange={handleSearchTextChange}/>
                <button className={styles.searchButton} onClick={handleSearch}>Search</button>
            </div>
            {
                userRole == GlobalConstants.USER_ROLE_MASTER || userRole == GlobalConstants.USER_ROLE_ADMIN ?
                    <button className={styles.addParkingButton} onClick={(e) => routeToPage(e, GlobalConstants.ADD_PARKING_PAGE)}> + Add a new parking area </button> : null
            }

            <div className={styles.content}>

            <ul className={styles.parkingList}>
                {
                    filteredParkings.length != 0
                        ? filteredParkings.map((p) => {
                            return (
                                <div key={p.id} className={styles.parkingSlot}
                                     onMouseEnter={() => handleHover(p)}
                                     onMouseLeave={() => setZoom(12)}>
                                    <div>
                                        <button className={styles.transparentBtn}  onClick={() => handleClick(p)}></button>
                                        <div className={styles.parkingName}>{p.name}</div>
                                        <div className={styles.parkingAddress}>{p.address}</div>
                                        {
                                            (userRole == USER_ROLE_MASTER || p.adminId == userId) &&
                                            <div>
                                                <button className={styles.deleteBtn} onClick={() => document.getElementById('modal' + p.id)!.style.display = "block"}>
                                                    <DeleteIcon/>
                                                </button>
                                                <button className={styles.editBtn} onClick={() => handleEdit(p)}>
                                                    <EditIcon/>
                                                </button>
                                            </div>
                                        }
                                        <span className={styles.parkingSpots}>{p.hasSensors ?
                                            <span><span className={styles.emptySpotsText}>{p.emptySpots} empty</span><span className={styles.totalSpotsText}> | {p.totalSpots} parking spots</span></span> :
                                            <span className={styles.totalSpotsText}>{p.totalSpots} parking spots</span>}
                                        </span>
                                        <span className={styles.parkingFee}>{p.parkingFee}</span>
                                    </div>
                                    <div id={"modal" + p.id} className={styles.modal}>
                                        <div className={styles.modalContent}>
                                            <div className={styles.modalText}> Are you sure that you want to delete the parking? </div>
                                            <button className={styles.cancelButton} onClick={() => document.getElementById('modal' + p.id)!.style.display = "none"}>Cancel</button>
                                            <button className={styles.deleteButton} onClick={() => handleDelete(p)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <div style={{position: "relative", left: "70px"}}>No parkings found.</div>
                }
            </ul>

            <GoogleMap
                options={mapOptions}
                zoom={zoom}
                center={mapCenter}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: '600px', height: '600px', position: 'absolute', right: '100px', top: '0px', outline: 'transparent 1px', borderRadius: '25px'}}
                onLoad={() => console.log('Map Component Loaded...')}
            >
                {
                    // centerChanged ? <MarkerF position={mapCenter}/> : null
                    filteredParkings.map((p) => {
                        return (<MarkerF key={p.id} position={{lat: p.lat, lng: p.lng}}/>)
                    })
                }
            </GoogleMap>
            </div>

        </div>
    );

}