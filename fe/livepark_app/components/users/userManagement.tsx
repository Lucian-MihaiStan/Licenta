import React, {useEffect, useState} from "react";
import {GlobalConstants} from "../globalc_namespace/global-constants";
import {useRouter} from "next/router";
import styles from "./userManagement.module.css";
import {UserModel} from "@/components/users/user";
import {EditIcon} from "@/components/parking/images/edit-icon";
import {PlusIcon} from "@/components/parking/images/plus-icon";


export const AllUsersComponent = () => {
    const routerUtils = useRouter();
    const [users, setUsers] = useState<UserModel[]>([]);
    const [userRole, setUserRole] = useState<any>(null);
    const [selected, setSelected] = useState<{[key:number]: string}>({});
    const [isEditing, setIsEditing] = useState<{[key:number]: boolean}>({});
    const handleUsers = async () => {
        const url = `${GlobalConstants.USERS_LINK}`;
        const response = await fetch(url, {
            method: GlobalConstants.GET_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            }
        });

        const userList = await response.json();
        let arr : {[key:number]: boolean} = {}
        for (let u of userList)
            arr[u.userId] = false;
        setIsEditing(arr);
        setUsers(userList);
    }
    useEffect(() => {
        handleUsers();
    }, []);

    async function handleEdit(u : UserModel, i : number) {
        let elem = document.getElementById("user" + u.userId + "val" + i);
        if (elem) {
            const selectElement = document.createElement('select');
            selectElement.style.width = '100px';
            selectElement.style.height = '50px';
            selectElement.style.background = 'transparent';
            selectElement.style.border = 'none';
            selectElement.style.position = 'relative';
            selectElement.style.left = '10px';

            const option1 = document.createElement('option');
            option1.value = 'USER';
            option1.textContent = 'USER';
            selectElement.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = 'ADMIN';
            option2.textContent = 'ADMIN';
            selectElement.appendChild(option2);

            const option3 = document.createElement('option');
            option3.value = 'MASTER';
            option3.textContent = 'MASTER';
            selectElement.appendChild(option3);

            const selectedText = elem.textContent?.trim();
            if (selectedText) {
                const matchingOption = Array.from(selectElement.options).find(
                    (option) => option.textContent === selectedText
                );
                if (matchingOption) {
                    matchingOption.selected = true;
                }
            }

            selectElement.addEventListener('change', (event) => {
                let arr = {...selected};
                arr[u.userId] = (event.target as HTMLSelectElement).value;
                setSelected(arr);
                console.log(selected[u.userId]);
            });
            selectElement.addEventListener('focus', () => {
                selectElement.style.outline = 'none';
            });

            elem.replaceWith(selectElement);
            let arr = {...isEditing};
            arr[u.userId] = true;
            setIsEditing(arr);
        }
    }

    async function handleSave(u : UserModel) {
        console.log(selected);
        const url = GlobalConstants.USERS_LINK + "?id=" + u.userId + "&role=" + selected[u.userId];
        const response = await fetch(url, {
            method: GlobalConstants.PUT_REQUEST,
            headers: {
                "Content-Type": GlobalConstants.APPLICATION_JSON,
                "Access-Control-Allow-Origin": GlobalConstants.STAR,
                "Authorization": "Bearer " + localStorage.getItem(GlobalConstants.TOKEN),
                "Origin": GlobalConstants.FRONTEND_API_LINK,
            }
        });
        if (response.ok) {
            location.reload();
        }
    }

    return (
        Object.keys(isEditing).length === 0 ? null :
        <div>
            <div className={styles.titleBox}>Your reservations</div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Role</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {
                        users.length != 0
                            ? users.map((u) => {
                                let i = 0;
                                return (
                                    <tr key={u.userId}>
                                        {
                                            Object.values(u).map(value => {
                                                i = i + 1;
                                                return (<td key={i} id={"user" + u.userId + "val" + i}>{value}</td>)
                                            })
                                        }
                                        {
                                            u.role === GlobalConstants.USER_ROLE_MASTER ? null :
                                                <td>
                                                    {
                                                        !isEditing[u.userId] ?
                                                        <button className={styles.editButton} onClick={() => handleEdit(u, i)}>
                                                            <EditIcon/>
                                                        </button> :
                                                        <button className={styles.editButton} onClick={() => handleSave(u)}>
                                                            <PlusIcon/>
                                                        </button>
                                                    }
                                                </td>
                                        }
                                    </tr>
                                )
                            }) : <div style={{position: "relative", left: "70px"}}> No users found. </div>
                    }
                </tbody>
            </table>
        </div>
    );

}