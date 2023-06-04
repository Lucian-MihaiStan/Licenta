import { GlobalConstants } from '../globalc_namespace/global-constants';

export namespace CarBackendConnectUtils {
    export async function requestCar(carId: string) {
        const url = `${GlobalConstants.CAR_LINK}?carId=${carId}`;
        const _carinfo = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK
            }
        });
        
        return await _carinfo.json();
    }
}