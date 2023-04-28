import { DashboardForm } from "@/components/dashboard_page/dashboard-form";
import { NavigationBar } from "@/components/navigation_bar/navigation-bar";
import { NextPage } from "next";

const Dashboard:  NextPage = () => {
    return (
        <div>
            <NavigationBar/>
            <DashboardForm/>
        </div>
    )
}

export default Dashboard;