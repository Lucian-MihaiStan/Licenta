import { NextPage } from "next";
import navigationBarStyle from '@/components/navigation_bar/navigation-bar.module.css'
import { NavigationBar } from "@/components/navigation_bar/navigation-bar";
import React from "react";
import { SupportForm } from "@/components/support/support-form";

const Support:  NextPage = () => {
    return (
        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <SupportForm/>
            </section>
        </div>
    )
}

export default Support;