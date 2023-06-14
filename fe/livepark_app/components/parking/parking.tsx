export namespace Models {
    export type ParkingModel = {
        id: number,
        name: string,
        address: string,
        lat: number,
        lng: number,
        parkingFee: string,
        hasSensors: boolean,
        totalSpots: number,
        emptySpots: number,
        adminId: number
    }
}

