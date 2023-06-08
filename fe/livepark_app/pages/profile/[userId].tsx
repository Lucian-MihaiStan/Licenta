import React, { use, useEffect } from "react";
import { ProfileForm } from "@/components/profile_page/profile-form";
import { NextPage } from "next";
import { NavigationBar } from "@/components/navigation_bar/navigation-bar";
import { useRouter } from "next/router";
import navigationBarStyle from '@/components/navigation_bar/navigation-bar.module.css'
import { GlobalConstants } from "@/components/globalc_namespace/global-constants";

const Profile: NextPage = () => {
    const router = useRouter();
    const userId = router.query.userId;

    useEffect(() => {
        if (userId == null)
            router.push(GlobalConstants.LOGIN);
    }, [userId]);

    return (
        <div>
            <NavigationBar/>
            <section className={navigationBarStyle.home_section}>
                <ProfileForm/>
            </section>
        </div>
    )
}

export default Profile;