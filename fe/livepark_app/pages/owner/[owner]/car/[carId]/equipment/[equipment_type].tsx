import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { NavigationBar } from "../../../../../../components/navigation_bar/navigation-bar";
import { GlobalConstants } from "@/components/globalc_namespace/global-constants";

const EquipmentType: NextPage = () => {
    
    const router = useRouter();
    const carId = router.query.carId;
    const equipment_type = router.query.equipment_type;
    const [equipmentExpirationDate, setEquipmentExpirationDate] = useState('');

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
            {equipment_type}

            <div> Expiration date: 
                <input
                    type="date"
                    value={equipmentExpirationDate}
                    onChange={e => { setEquipmentExpirationDate(e.currentTarget.value); }}/> 
            </div>

            <button onClick={(e) => postEquipment(e)}> Save Equipment </button>

        </div>   
    )
}

export default EquipmentType;