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
            isAutoCreated: false,
            isDeleted: false,
            position: {i: 0, j: 0}
        },
        {
            key: 1,
            number: "",
            isRotated: false,
            isAutoCreated: false,
            isDeleted: false,
            position: {i: 0, j: 1}
        }
    ]]);
    const [renderSwitch, setRenderSwitch] = React.useState<boolean>(false);

    function resetSlotsKeys(i: number): void {
        for (let j = 0; j < slots[i].length; j++)
            slots[i][j].key = i * j + j;
    }

    function resetPositions(): void {
        for (let i = 0; i < slots.length; i++)
            for (let j = 0; j < slots[i].length; j++) {
                slots[i][j].position.i = i;
                slots[i][j].position.j = j;
            }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        let new_h = height;
        let new_w = width;
        if (+e.target.value > 100)
            return;
        if (e.target.name === "height") {
            new_h = +e.target.value;
        } else {
            new_w = +e.target.value;
        }
        const arr: ParkingSpotModel[][] = [];
        for (let i = 0; i < new_h; i++) {
            arr[i] = [];
            for (let j = 0; j < new_w; j++) {
                if (i < height && j < width)
                    arr[i][j] = slots[i][j];
                else
                    arr[i][j] = {
                        key: i * j + j,
                        number: "",
                        isRotated: false,
                        isAutoCreated: false,
                        isDeleted: false,
                        position: {i: i, j: j}
                    };
            }
        }
        setHeight(new_h);
        setWidth(new_w);
        setSlots(arr);
    }

    function handleRotation(p: ParkingSpotModel): void {
        if (!p.isRotated) {
            let newSlot : ParkingSpotModel = {
                key: 0,
                number: "",
                isRotated: true,
                isAutoCreated: true,
                isDeleted: false,
                position: {i: p.position.i, j: p.position.j + 1}
            };
            slots[p.position.i].splice(p.position.j + 1, 0, newSlot);
            for (let i = 0; i < slots.length; i++) {
                if (i == p.position.i)
                    continue;
                let fillSlot: ParkingSpotModel = {
                    key: (width - 1) * i + (width - 1),
                    number: "",
                    isRotated: false,
                    isAutoCreated: false,
                    isDeleted: true,
                    position: {i: p.position.i, j: width}
                };
                slots[i].push(fillSlot);
            }
            setWidth(width + 1);
            resetSlotsKeys(p.position.i);
        } else {
            slots[p.position.i].splice(p.position.j + 1, 1);
            for (let i = 0; i < slots.length; i++) {
                if (i == p.position.i)
                    continue;
                slots[i].splice(width - 1, 1);
            }
            setWidth(width - 1);
        }
        resetPositions();
        p.isRotated = !p.isRotated;
        setRenderSwitch(!renderSwitch);
    }

    function handleDeletion(p: ParkingSpotModel): void {
        p.isDeleted = !p.isDeleted;
        setRenderSwitch(!renderSwitch);
    }

    function print(b: boolean): boolean {
        console.log(b);
        return b;
    }

    function applyMap(arr: ParkingSpotModel[]): any {
        return (
            <div className={styles.line} style={{width: (70 + width * 80) + 'px'}}>
                {
                    Array.isArray(arr)
                        ? arr.map((s) => {
                            return (
                                <div key={s.key}
                                     className={`${styles.slot} ${s.isRotated && !s.isAutoCreated && styles.rotatedFirstSlot} ${s.isRotated && s.isAutoCreated && styles.rotatedSecondSlot} ${s.isDeleted && styles.deletedSlot} ${s.isAutoCreated && styles.autocreatedSlot}`}>
                                    {
                                        !s.isDeleted ?
                                            <div>
                                            {
                                                !s.isAutoCreated ?
                                                    <div>
                                                        <button className={`${s.isRotated &&  styles.rotatedBackwards} ${styles.rotationButton}`} onClick={() => {
                                                            handleRotation(s)
                                                        }}>
                                                            <RotationIcon/>
                                                        </button>
                                                        <button className={`${s.isRotated &&  styles.rotatedBackwards} ${styles.deleteButton}`} onClick={() => {
                                                            handleDeletion(s)
                                                        }}>
                                                            <DeleteIcon/>
                                                        </button>
                                                    </div>
                                                : <button className={`${s.isRotated &&  styles.rotatedBackwards} ${styles.deleteButton} ${styles.autocreatedButton}`} onClick={() => {
                                                        handleDeletion(s)
                                                    }}>
                                                        <DeleteIcon/>
                                                </button>
                                            }
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
            <div className={styles.grid} style={{width: (10 + width * 48) + 'px', height: (5 + height * 86) + 'px'}}>
                {
                    slots.map(applyMap)
                }
            </div>
        </div>
    );
}