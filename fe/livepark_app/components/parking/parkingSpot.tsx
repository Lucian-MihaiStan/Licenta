export namespace Models {
    export type Position = {
        i: number,
        j: number
    }
    export enum ParkingSpotStatus {
        UNKNOWN="UNKNOWN", EMPTY="EMPTY", OCCUPIED="OCCUPIED", RESERVED="RESERVED"
    }
    export type ParkingSpotModel = {
        id: number,
        key: number,
        number: string,
        isRotated: boolean,
        isAutoCreated: boolean,
        isDeleted: boolean,
        position: Position,
        sensorDeviceName: string,
        status: ParkingSpotStatus
    }
}