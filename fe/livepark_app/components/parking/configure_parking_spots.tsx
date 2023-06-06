import React, {ChangeEvent, useMemo, useState} from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { InputConstants } from '../globalc_namespace/inputc/input-constants';
import {number} from "prop-types";
import styles from "@/components/parking/configure_parking_slots.module.css";
import {Models} from "@/components/parking/parkingSpot";
import ParkingSpotModel = Models.ParkingSpotModel;
import Position = Models.Position;

export const ParkingSpotsForm = () => {
    const [width, setWidth] = React.useState<number>(2);
    const [height, setHeight] = React.useState<number>(1);
    const [slots, setSlots] = useState<ParkingSpotModel[][]>([[
        {
        key: 0,
        number: "",
        isRotated: false,
        isDeleted: false,
        position: {i: 0, j: 0}
        },
        {
            key: 1,
            number: "",
            isRotated: false,
            isDeleted: false,
            position: {i: 0, j: 1}
        }
        ]]);

    function handleChange(e : ChangeEvent<HTMLInputElement>): void {
        let h = height;
        let w = width;
        if (e.target.name === "height") {
            h = +e.target.value;
            setHeight(h);
        } else {
            w = +e.target.value;
            setWidth(w);
        }
        const arr : ParkingSpotModel[][] = [];
        for (let i: number = 0; i < h; i++) {
            arr[i] = [];
            for (let j : number = 0; j < w; j++) {
                arr[i][j] = {
                    key: i * j + j,
                    number: "",
                    isRotated: false,
                    isDeleted: false,
                    position: {i: i, j: j}
                };
            }
        }
        setSlots(arr);
    }

    function applyMap(arr : ParkingSpotModel[]): any {
        return (
            <div className={styles.line}>
                {
                    Array.isArray(arr)
                        ? arr.map((s) => {
                            return (
                                <div key = {s.key} className={styles.slot}>
                                </div>
                            )
                        }) : <div className={styles.slot}></div>
                }
            </div>
        )
    }

    return (
        <div>
            <input
                type="number"
                name="width"
                placeholder="width"
                value={width}
                onChange={handleChange}
            />
            <input
                type="number"
                name="height"
                placeholder="height"
                value={height}
                onChange={handleChange}
            />
            <div>
                {
                    slots.map(applyMap)
                }
            </div>
        </div>
    );
}