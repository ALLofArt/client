import { makeStyles } from "@material-ui/core/styles";
import styles from "./Card.module.css";
import { useState } from "react";


export default function Card({frontImg,backImg}) {
    const [isRotated, setIsRotated] = useState(false);

    const onRotate = () => setIsRotated((rotated) => !rotated);
    return (
      <div className={styles.wrapper}>
        <div
          className={`${styles.card} ${isRotated ? styles.rotated : null}`}
          onClick={onRotate}
        >
          <div
            className={styles.front}
            style={{
              background: `url(${frontImg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            className={styles.back}
            style={{
              background: `url(${backImg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
    );
}