import styles from "./Card.module.css";
import styled from "styled-components";
import { useState } from "react";

export default function Card({ frontImg, backImg }) {
  const [isRotated, setIsRotated] = useState(false);

  const onRotate = () => setIsRotated((rotated) => !rotated);
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.card} ${isRotated ? styles.rotated : null}`}
        onClick={onRotate}
      >
        <CardImg className={styles.front} Img={frontImg} />
        <CardImg className={styles.back} Img={backImg} />
      </div>
    </div>
  );
}

const CardImg = styled.div`
  background-color: black;
  background-image: url(${(props) => props.Img});
  background-size: cover;
  background-repeat: no-repeat;
`;
