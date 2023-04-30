import React from "react";
import { InputConstants } from "../globalc_namespace/inputc/input-constants";
import { GlobalConstants } from "../globalc_namespace/global-constants";

export const ProfileForm = () => {
    function change_password(): void {
        throw new Error("Function not implemented.");
    }

    function edit_profile(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div>
            <div>
                <p>Profile</p>
            </div>

            <div>
                <p>Profile Picture</p>
            </div>

            <div>
                <div>
                    <button onClick={e => change_password()}> Change Password </button>
                </div>
                
                <div>
                    <button onClick={e => edit_profile()}> Edit Profile </button>
                </div>
            </div>
        </div>
    );
}