import { forwardRef, useState } from "react";
import { NotificationProps } from "./notification_props";
import classNames from "classnames";
import notifications_style from "@/components/notifications/notifications_styles/notification_style.module.css"

export const NotificationCard = forwardRef((notificationProps: NotificationProps) => {

    const [expand, setExpand] = useState<boolean>(false);
    const notification = notificationProps.notification;

    function expand_description(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        e.preventDefault();
        setExpand(!expand);
    } 

    return (
        <>

            <div className={classNames("row", notifications_style.ul_list)} onClick={(e) => expand_description(e)}>
                <div className={classNames(notifications_style.mwidth)}>
                    <div className={classNames("row no-gutters")}>
                        {/* <div className={classNames("col-md-8")}> */}
                        <div className="col">
                            <div className={classNames("card-body")}>
                                <h5 className={classNames("card-title")}>{notification.title}</h5>
                                { 
                                    expand ?
                                        <div>
                                            <div className={classNames("card-text")}>{notification.message}</div>
                                            <div className={classNames("card-text")}>{notification.createdAt.toLocaleString()}</div>
                                        </div>
                                    : <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
})