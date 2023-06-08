import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NavigationBar } from "@/components/navigation_bar/navigation-bar";
import { GlobalConstants } from "@/components/globalc_namespace/global-constants";
import { CarBackendConnectUtils } from "@/components/cars/car_get";
import navigationBarStyle from '@/components/navigation_bar/navigation-bar.module.css'


const EquipmentType: NextPage = () => {
    
    const router = useRouter();
    const carId = router.query.carId;
    const equipment_type = router.query.equipment_type;
    const [equipmentExpirationDate, setEquipmentExpirationDate] = useState('');
    const [oldEquipmentExpirationDate, setOldEquipmentExpirationDate] = useState('no date');

    const equipmentInfo = async() => {
        const localCar = await CarBackendConnectUtils.requestCar(carId as string);
        if (localCar != null) {
            switch (equipment_type) {
                case GlobalConstants.FIRE_EXTINGUISHER:
                    localCar.fireExtinguisherExpirationDate != null ? setOldEquipmentExpirationDate(localCar.fireExtinguisherExpirationDate.toLocaleString()) : setEquipmentExpirationDate("");
                    break;
                case GlobalConstants.FIRST_AID_KIT:
                    localCar.firstAidKitExpirationDate != null ? setOldEquipmentExpirationDate(localCar.firstAidKitExpirationDate.toLocaleString()) : setEquipmentExpirationDate("");
                    break;
                default:
                    break;
            }
        }
    }

    useEffect(() => {
        equipmentInfo();
    }, [carId, equipment_type]);

    if (carId == null)
        return <div> Loading... </div>

    const postEquipment = async (e: any) => {
        e.preventDefault();
        const reponse = await fetch(GlobalConstants.EQUIPMENT_LINK, {
            method: GlobalConstants.POST_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Origin": GlobalConstants.FRONTEND_API_LINK,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN)
            },
            body: JSON.stringify({ 
                carId: carId,
                equipmentType: equipment_type,
                equipmentExpirationDate: equipmentExpirationDate 
            })
        });

        if (reponse.ok) 
            router.push(`${GlobalConstants.OWNER}/${router.query.ownerId}${GlobalConstants.CAR}/${carId}`);
    }

    return (

        <div>
            <NavigationBar/>

            <section className={navigationBarStyle.home_section}>
            {equipment_type}

            {
                equipmentExpirationDate != null ?
                <div> Expiration date: {oldEquipmentExpirationDate} </div> :
                <div> No expiration date set </div>
            }

            <div> Expiration date: 
                <input
                    type="date"
                    value={equipmentExpirationDate}
                    onChange={e => { setEquipmentExpirationDate(e.currentTarget.value); }}/> 
            </div>

            <button onClick={(e) => postEquipment(e)}> Update Equipment Expiration Date </button>
            </section>
        </div>   
    )
}

export default EquipmentType;