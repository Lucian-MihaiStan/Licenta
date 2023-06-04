export namespace Models {
    export type CarModel = {
        carId: number,
        ownerId: number,
        plate: string,
        vin: string
        brand: string,
        model: string,
        fabricationDate: Date,
        rcaId: string,
        rcaExpirationDate: Date,
        itpId: string,
        itpExpirationDate: Date,
        rovinietaId: string,
        rovinietaExpirationDate: Date,
        cascoId: string,
        cascoExpirationDate: Date,
        fireExtinguisherExpirationDate: Date,
        firstAidKitExpirationDate: Date
    }

}

