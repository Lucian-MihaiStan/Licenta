import { NextPage } from "next"
import React from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import navigationBarStyle from "@/components/navigation_bar/navigation-bar.module.css";
import {AdminReservations} from "@/components/parking/adminReservations";


const AdminReservationsPage: NextPage = () => {
    return (
        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <AdminReservations/>
            </section>
        </div>
    )
}

export default AdminReservationsPage;