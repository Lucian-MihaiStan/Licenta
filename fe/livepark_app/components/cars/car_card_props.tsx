import { Models } from "../../components/cars/car";


export type CarCardProps = {
    car: Models.CarModel;
    userId: string | string[];
    view_documents: boolean;
};