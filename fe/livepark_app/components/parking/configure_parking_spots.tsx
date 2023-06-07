import React, {ChangeEvent, useState} from "react";
import styles from "@/components/parking/configure_parking_slots.module.css";
import {Models} from "@/components/parking/parkingSpot";
import ParkingSpotModel = Models.ParkingSpotModel;
import {DeleteIcon} from "@/components/parking/images/delete-icon";
import {RotationIcon} from "@/components/parking/images/rotation-icon";
import {PlusIcon} from "@/components/parking/images/plus-icon";

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
    const [rotationArr, setRotationArr] = React.useState<boolean[][]>([[false, false]]);
    const [deletionArr, setDeletionArr] = React.useState<boolean[][]>([[false, false]]);

    function createNewPropArr(old_arr: boolean[][], setOldArr: React.Dispatch<any>, h: number, w: number, old_h: number, old_w: number): void {
        const arr: boolean[][] = [];
        const h_max = h > old_h ? h : old_h;
        const w_max = w > old_w ? w : old_w;
        for (let i: number = 0; i < h_max; i++) {
            arr[i] = [];
            for (let j: number = 0; j < w_max; j++) {
                if (i < old_h && j < old_w)
                    arr[i][j] = old_arr[i][j];
                else
                    arr[i][j] = false;
            }
        }
        setOldArr(arr);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        let h = height;
        let w = width;
        if (+e.target.value > 100)
            return;
        if (e.target.name === "height") {
            createNewPropArr(rotationArr, setRotationArr, +e.target.value, w, h, w);
            createNewPropArr(deletionArr, setDeletionArr, +e.target.value, w, h, w);
            h = +e.target.value;
            setHeight(h);
        } else {
            createNewPropArr(rotationArr, setRotationArr, h, +e.target.value, h, w);
            createNewPropArr(deletionArr, setDeletionArr, h, +e.target.value, h, w);
            w = +e.target.value;
            setWidth(w);
        }
        const arr: ParkingSpotModel[][] = [];
        for (let i: number = 0; i < h; i++) {
            arr[i] = [];
            for (let j: number = 0; j < w; j++) {
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

    function handleRotation(p: ParkingSpotModel): void {
        p.isRotated = !p.isRotated;
        let new_arr = [...rotationArr];
        new_arr[p.position.i][p.position.j] = !new_arr[p.position.i][p.position.j];
        setRotationArr(new_arr);
    }

    function handleDeletion(p: ParkingSpotModel): void {
        p.isDeleted = !p.isDeleted;
        let new_arr = [...deletionArr];
        new_arr[p.position.i][p.position.j] = !new_arr[p.position.i][p.position.j];
        setDeletionArr(new_arr);
    }

    function applyMap(arr: ParkingSpotModel[]): any {
        return (
            <div className={styles.line} style={{width: (70 + width * 80) + 'px'}}>
                {
                    Array.isArray(arr)
                        ? arr.map((s) => {
                            return (
                                <div key={s.key}
                                     className={deletionArr[s.position.i][s.position.j] ? styles.deletedSlot :
                                                rotationArr[s.position.i][s.position.j] ? `${styles.slot} ${styles.rotated} ` : styles.slot}>
                                    {
                                        !deletionArr[s.position.i][s.position.j] ?
                                            <div>
                                            <button className={`${styles.rotationButton} ${rotationArr[s.position.i][s.position.j] &&  styles.rotatedBackwards}`} onClick={() => {
                                                handleRotation(s)
                                            }}>
                                                <RotationIcon/>
                                            </button>
                                            <button className={`${styles.deleteButton} ${rotationArr[s.position.i][s.position.j] &&  styles.rotatedBackwards}`} onClick={() => {
                                                handleDeletion(s)
                                            }}>
                                                <DeleteIcon/>
                                            </button>
                                            </div> :
                                            <div>
                                                <button className={styles.plusButton} onClick={() => {
                                                    handleDeletion(s)
                                                }}>
                                                    <PlusIcon/>
                                                </button>
                                            </div>
                                    }
                                </div>
                            )
                        }) : <div className={styles.slot}></div>
                }
            </div>
        )
    }

    return (
        <div>
            <div className={styles.inputZone}>
                <label className={styles.label}> Height: </label>
                <input
                    className={styles.input}
                    type="number"
                    name="height"
                    placeholder="height"
                    value={height}
                    min="1"
                    max="100"
                    onChange={handleChange}
                />
                <label className={styles.label}> Width: </label>
                <input
                    className={styles.input}
                    type="number"
                    name="width"
                    placeholder="width"
                    value={width}
                    min="1"
                    max="100"
                    onChange={handleChange}
                />
            </div>
            <div className={styles.grid} style={{width: (30 + width * 80) + 'px', height: (height * 95) + 'px'}}>
                {
                    slots.map(applyMap)
                }
            </div>
        </div>
    );
}