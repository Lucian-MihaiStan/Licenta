import { DashboardForm } from "@/components/dashboard_page/dashboard-form";
import { NavigationBar } from "@/components/navigation_bar/navigation-bar";
import { NextPage } from "next";
import navigationBarStyle from '@/components/navigation_bar/navigation-bar.module.css'


const Dashboard:  NextPage = () => {
    return (
        <>
        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <DashboardForm/>
            </section>
        </div>
        </>
    )
}

export default Dashboard;