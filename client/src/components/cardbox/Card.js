import styles from "./Card.module.css";
import styled from "styled-components";
import { useState } from "react";
import { useRef } from "react";

export default function Card({ frontImg, backImg, explain }) {
  const [isRotated, setIsRotated] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const onRotate = () => setIsRotated((rotated) => !rotated);
  const word = useRef();

  // Converts integer to hex
  const colToHex = (c) => {
    // Hack so colors are bright enough
    let color = c < 75 ? c + 75 : c;
    let hex = color.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  // uses colToHex to concatenate
  // a full 6 digit hex code
  const rgbToHex = (r, g, b) => {
    return "#" + colToHex(r) + colToHex(g) + colToHex(b);
  };

  // Returns three random 0-255 integers
  const getRandomColor = () => {
    return rgbToHex(
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    );
  };
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.card} ${isRotated && styles.rotated}`}
        onClick={onRotate}
      >
        <CardImg
          className={styles.front}
          Img={frontImg}
          onMouseOver={(e) => {
            setHovered(true);
            setOpacity(0.5);
          }}
          onMouseOut={(e) => {
            setHovered(false);
            setOpacity(1);
          }}
          onClick={() => setClicked(!clicked)}
          opacity={opacity}
        ></CardImg>

        {!isRotated && (
          <CardExplain ref={word} hovered={hovered}>
            {explain}
          </CardExplain>
        )}

        <CardImg className={styles.back} Img={backImg} />
      </div>
    </div>
  );
}

const CardImg = styled.div`
  background-image: url(${(props) => props.Img});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
  :hover {
    opacity: ${(props) => props.opacity};
  }
`;

const CardExplain = styled.strong`
  width: 20em;
  line-height: 1rem;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  position: absolute;
  margin-top: 50vh;

  background-color: ${(props) => (props.hovered ? "black" : "transparent")};
  padding: 10px;
  border-radius: 10px;
  z-index: 2;
  color: ${(props) => (props.hovered ? "white" : "transparent")};
`;
