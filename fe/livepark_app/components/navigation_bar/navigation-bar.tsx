import { GlobalConstants } from '../globalc_namespace/global-constants';
import { useRouter } from 'next/router';
import navigationBarStyle from './navigation-bar.module.css'
import Head from 'next/head';
import Image from "next/image";

import { MouseEvent, use, useRef, useState, useEffect } from 'react';

export const NavigationBar = (): JSX.Element => {

    const routerUtils = useRouter();
    const routeToPage = async (event: any, path: string) => {
        event.preventDefault();
        routerUtils.push(path);
    }

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const sidebar_ref = useRef<any>();
    const close_button_ref = useRef<any>();

    const [userId, setUserId] = useState<any>(null);
    const [userRole, setUserRole] = useState<any>(null);
    useEffect(() => {
        setUserId(localStorage.getItem(GlobalConstants.USER_ID));
        setUserRole(localStorage.getItem(GlobalConstants.USER_ROLE));
    }, [])

    function logout(e: any, LOGIN: string): void {
        e.preventDefault();
        localStorage.removeItem(GlobalConstants.USER_ID);
        localStorage.removeItem(GlobalConstants.USER_ROLE);
        localStorage.removeItem(GlobalConstants.TOKEN);
        routerUtils.push(LOGIN);
    }

    return (
        <>

        <Head>
            <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
            <link rel="stylesheet" href="navigation-bar.module.css" />
        </Head>

        <main>
            <div className={`${navigationBarStyle.sidebar} ${isSidebarOpen ? navigationBarStyle.open : ""}`} ref={sidebar_ref}>
                <div className={navigationBarStyle.logo_details}>
                    {
                        isSidebarOpen ? <Image className={navigationBarStyle.padding_icon} src='/favicon.ico' width={30} height={30} alt={"P"}/> : <></>
                    }

                    <div className={navigationBarStyle.logo_name}><p>Parklive</p></div>
                    <i className='bx bx-menu' id={navigationBarStyle.btn} ref={close_button_ref} onClick={toggleSidebar}></i>
                </div>
                <ul className={navigationBarStyle.nav_list}>
                    <li>
                        <a onClick={(e) => routeToPage(e, GlobalConstants.DASHBOARD)}>
                            <i className='bx bx-grid-alt'></i>

                            <span className={navigationBarStyle.links_name}>Dashboard</span>
                        </a>
                        <span className={navigationBarStyle.tooltip}>Dashboard</span>
                    </li>

                    <li>
                        <a onClick={(e) => routeToPage(e, GlobalConstants.PROFILE + "/" + userId)}>
                            <i className='bx bx-user'></i>
                            <span className={navigationBarStyle.links_name}>Profile</span>
                        </a>
                        <span className={navigationBarStyle.tooltip}>Profile</span>
                    </li>

                    <li>
                        <a onClick={(e) => routeToPage(e, GlobalConstants.PARKING_AREAS_PAGE)}>
                            <i className='bx bx-map'></i>
                            <span className={navigationBarStyle.links_name}>Parking areas</span>
                        </a>
                        <span className={navigationBarStyle.tooltip}>Parking areas</span>
                    </li>

                    {
                        (userRole == GlobalConstants.USER_ROLE_ADMIN || userRole == GlobalConstants.USER_ROLE_MASTER) &&
                        <li>
                            <a onClick={(e) => routeToPage(e, GlobalConstants.ADMIN_RESERVATIONS_PAGE)}>
                                <i className='bx bx-registered'></i>
                                <span className={navigationBarStyle.links_name}>Parkings reservations</span>
                            </a>
                            <span className={navigationBarStyle.tooltip}>Reservations for your parkings</span>
                        </li>
                    }

                    <li>
                        <a onClick={(e) => routeToPage(e, GlobalConstants.USER_RESERVATIONS_PAGE)}>
                            <i className='bx bx-calendar-check'></i>
                            <span className={navigationBarStyle.links_name}>Reservations</span>
                        </a>
                        <span className={navigationBarStyle.tooltip}>Reservations</span>
                    </li>

                    <li>
                        <a onClick={(e) => routeToPage(e, GlobalConstants.CARS + "/" + userId)}>
                            <i className='bx bx-car'></i>
                            <span className={navigationBarStyle.links_name}>Cars</span>
                        </a>
                        <span className={navigationBarStyle.tooltip}>Cars</span>
                    </li>

                    <li>
                        <a onClick={(e) => routeToPage(e, GlobalConstants.SUPPORT)}>
                            <i className='bx bx-support'></i>
                            <span className={navigationBarStyle.links_name}>Support</span>
                        </a>
                        <span className={navigationBarStyle.tooltip}>Support</span>
                    </li>

                    <li>
                        <a onClick={(e) => routeToPage(e, GlobalConstants.NOTIFICATIONS + "/" + userId)}>
                            <i className='bx bxs-bell'></i>
                            <span className={navigationBarStyle.links_name}>Notifications</span>
                        </a>
                        <span className={navigationBarStyle.tooltip}>Notifications</span>
                    </li>
                    {
                        userRole == GlobalConstants.USER_ROLE_MASTER &&
                        <li>
                            <a onClick={(e) => routeToPage(e, GlobalConstants.ALL_USERS_PAGE)}>
                                <i className='bx bxs-user-account'></i>
                                <span className={navigationBarStyle.links_name}>Users management</span>
                            </a>
                            <span className={navigationBarStyle.tooltip}>Users management</span>
                        </li>
                    }

                    <li>
                        <a onClick={(e) => logout(e, GlobalConstants.LOGIN)}>
                            <i className='bx bx-log-out'></i>
                            <span className={navigationBarStyle.links_name}>Logout</span>
                        </a>
                        <span className={navigationBarStyle.tooltip}>Logout</span>
                    </li>
                </ul>
            </div>

        </main>

        </>
    );
}
