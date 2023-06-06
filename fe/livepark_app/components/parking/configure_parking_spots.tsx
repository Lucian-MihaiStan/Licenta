import React, {ChangeEvent, useMemo, useState} from "react";
import { GlobalConstants } from "../globalc_namespace/global-constants";
import { InputConstants } from '../globalc_namespace/inputc/input-constants';
import {number} from "prop-types";
import styles from "@/components/parking/configure_parking_slots.module.css";

export const ParkingSpotsForm = () => {
    const [width, setWidth] = React.useState<number>(10);
    const [height, setHeight] = React.useState<number>(1);
    const [slots, setSlots] = useState<number[][]>([[1]]);

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
        const arr : number[][] = [];
        for (let i: number = 0; i < h; i++) {
            arr[i] = [];
            for (let j : number = 0; j < w; j++) {
                arr[i][j] = i*j + j;
            }
        }
        setSlots(arr);
    }

    function applyMap(arr : number[]): any {
        return (
            <div className={styles.line}>
                {
                    Array.isArray(arr)
                        ? arr.map((s) => {
                            return (
                                <div key = {s} className={styles.slot}>
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
                    Array.isArray(slots)
                        ? slots.map(applyMap) : <div className={styles.slot}></div>
                }
            </div>
        </div>
    );
}