import { makeStyles } from "@material-ui/core/styles";
import styles from "./Card.module.css";
import { useState } from "react";


export default function Card() {
    const [isRotated, setIsRotated] = useState(false);

    const onRotate = () => setIsRotated((rotated) => !rotated);
    return (
        <div className={`${styles.card} ${isRotated ? styles.rotated : null}` } onClick={onRotate}>
            <div className={styles.front}>

            </div>
            <div className={styles.back}>

            </div>
        </div>
    );
}