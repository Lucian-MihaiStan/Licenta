export namespace Models {
    export type CarModel = {
        carId: number,
        ownerId: number,
        plate: string,
        vin: string
        brand: string,
        model: string,
        fabricationDate: Date,
        insuranceId: string,
        inspectionId: string,
        rovinietaId: string,
        cascoId: string,
        fireExtinguisherExpirationDate: Date,
        firstAidKitExpirationDate: Date
    }

}

