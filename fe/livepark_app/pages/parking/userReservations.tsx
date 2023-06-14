import { NextPage } from "next"
import React from "react";
import { NavigationBar } from "../../components/navigation_bar/navigation-bar";
import navigationBarStyle from "@/components/navigation_bar/navigation-bar.module.css";
import {UserReservations} from "@/components/parking/userReservations";


const UserReservationsPage: NextPage = () => {
    return (
        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <UserReservations/>
            </section>
        </div>
    )
}

export default UserReservationsPage;