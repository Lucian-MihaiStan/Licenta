export namespace Models {
    export type Position = {
        i: number,
        j: number
    }
    export type ParkingSpotModel = {
        key: number,
        number: string,
        isRotated: boolean,
        isDeleted: boolean,
        position: Position
    }
}