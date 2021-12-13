import styles from "./Card.module.css";
import styled from "styled-components";
import { useState } from "react";
import { useRef } from "react";
import getRandomColor from "../../../lib/getRandomColor";

export default function Card({ frontImg, backImg, explain }) {
  const [isRotated, setIsRotated] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const onRotate = () => setIsRotated((rotated) => !rotated);
  const word = useRef();

  // Converts integer to hex

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.card} ${isRotated && styles.rotated}`}
        onClick={onRotate}
      >
        <CardImg
          className={styles.front}
          Img={frontImg}
          onClick={() => setClicked(!clicked)}
        ></CardImg>

        {isRotated && (
          <CardExplain>{explain}</CardExplain>
        )}

        <CardImg className={styles.back} Img={backImg} />
      </div>
    </div>
  );
}

const CardImg = styled.div`
  background-image: url(${(props) => props.Img});
  background-color: white;
  background-size: 100% 100%;
  image-rendering: auto;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
`;

const CardExplain = styled.strong`
  width: 40vh;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  position: absolute;
  margin-top: 45vh;

  background-color: black;
  padding: 10px;
  border-radius: 10px;
  z-index: 2;
  color: white;
  opacity:0.8;
  transition: background-color 5s linear;
`;
