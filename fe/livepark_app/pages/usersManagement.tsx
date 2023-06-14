import { NextPage } from "next"
import React from "react";
import { NavigationBar } from "../components/navigation_bar/navigation-bar";
import navigationBarStyle from "@/components/navigation_bar/navigation-bar.module.css";
import {UserReservations} from "@/components/parking/userReservations";
import {AllUsersComponent} from "@/components/users/userManagement";


const UsersManagementPage: NextPage = () => {
    return (
        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <AllUsersComponent/>
            </section>
        </div>
    )
}

export default UsersManagementPage;