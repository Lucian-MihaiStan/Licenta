import styles from "@/components/parking/configure_parking_slots.module.css";

export const RotationIcon = () => {
    return (
        <svg className={styles.rotationIcon} fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 32.076 32.076"
             xmlSpace="preserve">
            <g>
                <path d="M32.076,15.138l-7.152,9.341l-7.152-9.341h4.666c-0.451-4.397-4.178-7.842-8.695-7.842C8.922,7.296,5,11.218,5,16.038
                    c0,4.82,3.922,8.742,8.742,8.742c1.381,0,2.5,1.119,2.5,2.5s-1.119,2.5-2.5,2.5C6.166,29.78,0,23.615,0,16.038
                    S6.166,2.296,13.742,2.296c7.273,0,13.23,5.686,13.697,12.842H32.076z"/>
            </g>
        </svg>
    );
}