import React, {ChangeEvent, useState} from "react";
import styles from "@/components/parking/configure_parking_slots.module.css";
import {Models} from "@/components/parking/parkingSpot";
import ParkingSpotModel = Models.ParkingSpotModel;
import {DeleteIcon} from "@/components/parking/images/delete-icon";
import {RotationIcon} from "@/components/parking/images/rotation-icon";
import {PlusIcon} from "@/components/parking/images/plus-icon";
import {GlobalConstants} from "@/components/globalc_namespace/global-constants";
import {useRouter} from "next/router";
import {useLocation, useNavigate} from "react-router-dom";

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
    const router = useRouter();
    const location = useLocation();
    const navigate = useNavigate();
    const parking_data = location.state;

    function resetSlotsKeys(): void {
        for (let i = 0; i < slots.length; i++)
            for (let j = 0; j < slots[i].length; j++)
            slots[i][j].key = i * slots[i].length + j;
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
                        key: i * new_w + j,
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
                isDeleted: true,
                position: {i: p.position.i, j: p.position.j + 1}
            };
            slots[p.position.i].splice(p.position.j + 1, 0, newSlot);
            for (let i = 0; i < slots.length; i++) {
                if (i == p.position.i)
                    continue;
                let fillSlot: ParkingSpotModel = {
                    key: 0,
                    number: "",
                    isRotated: false,
                    isAutoCreated: false,
                    isDeleted: true,
                    position: {i: p.position.i, j: width}
                };
                slots[i].push(fillSlot);
            }
            setWidth(width + 1);
            resetSlotsKeys();
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

    const goToNextPage = async () => {
        const data = {
            parking_data: parking_data,
            slots: slots,
            width: width,
            height: height
        };
        navigate(GlobalConstants.CONFIGURE_PARKING_SPOTS_DETAILS, { state: data});
        router.push(GlobalConstants.CONFIGURE_PARKING_SPOTS_DETAILS);
    }

    function applyMap(arr: ParkingSpotModel[]): any {
        return (
            <>
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
            </>
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
            <button className={styles.nextButton} onClick={goToNextPage}> Next </button>
            </div>
            <div className={styles.grid} style={{width: (10 + width * 48) + 'px', height: (5 + height * 86) + 'px'}}>
                {
                    slots.map(applyMap)
                }
            </div>
        </div>
    );
}