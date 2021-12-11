import Card from "../src/components/cardbox/Card";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { mainPageImg } from "../data/mainPageImg";
import styles from "../styles/main.module.css";
import Options from "../src/components/main/Options";

export default function Home() {
  const [background, setBackGround] = useState("#f7c73b");
  const container = useRef();

  useEffect(() => {
    const changeColor = () => {
      if (
        container.current.scrollLeft >= 0 &&
        container.current.scrollLeft < 450
      ) {
        setBackGround("#f7c73b");
      }
      if (
        container.current.scrollLeft >= 450 &&
        container.current.scrollLeft < 880
      ) {
        setBackGround("#57679c");
      }

      if (
        container.current.scrollLeft >= 1200 &&
        container.current.scrollLeft < 1500
      ) {
        setBackGround("#bc9473");
      }
      if (
        container.current.scrollLeft >= 1500 &&
        container.current.scrollLeft < 1900
      ) {
        setBackGround("#4a6396");
      }
      if (container.current.scrollLeft >= 1900) {
        setBackGround("#f7c73b");
      }
    };
    if (typeof document.body != undefined) {
      document.body.addEventListener("wheel", changeColor);
      return () => {
        document.body.removeEventListener("wheel", changeColor);
      };
    }
  }, []);
  useEffect(() => {
    if (container.current) {
      let flag = false;
      let counter = [];

      const handleWheel = (e) => {
        console.log(counter.length);
        counter.push(e.deltaY);
        if (flag === true) return;
        flag = true;
        if (e.deltaY > 0) {
          if (counter.length < 20)
            container.current.scrollTo({
              left: container.current.scrollLeft + 200 - 100 / counter.length,
              behavior: "smooth",
            });
          else if (counter.length >= 20 && counter.length < 40)
            container.current.scrollTo({
              left: container.current.scrollLeft + 100 - 50 / counter.length,
              behavior: "smooth",
            });
          else if (counter.length >= 40)
            container.current.scrollTo({
              left: container.current.scrollLeft + 50 - 25 / counter.length,
              behavior: "smooth",
            });
        } else {
          if (counter.length < 10)
            container.current.scrollTo({
              left: container.current.scrollLeft - 200 + 100 / counter.length,
              behavior: "smooth",
            });
          else {
            flag = false;
            counter = [];
          }
        }
        setTimeout(() => {
          flag = false;
        }, 100);
        setTimeout(() => {
          counter = [];
        }, 2000);
      };

      if (typeof document.body != "undefined") {
        document.body.addEventListener("wheel", handleWheel);

        return () => {
          document.body.removeEventListener("wheel", handleWheel);
        };
      }
    }
  }, []);

  return (
    <div className={styles.box} ref={container}>
      <Wrapper>
        <Explain>
          <strong>
            <ExplainTitle>Find your </ExplainTitle>
            <ExplainTitle>Painting Style</ExplainTitle>
            <ExplainTitle>And be </ExplainTitle>
            <ExplainTitle>an Artist</ExplainTitle>
          </strong>
        </Explain>

        <ClickTheCard>
          <ArrowImage src="/pngegg.png" />
          <h3>CLICK THE CARDS!</h3>
        </ClickTheCard>

        <Card
          frontImg={mainPageImg[0]}
          backImg={mainPageImg[1]}
          explain="이미지에 화풍을 적용해 보세요"
        />
        <Card
          frontImg={mainPageImg[2]}
          backImg={mainPageImg[3]}
          explain="화풍을 적용한 나의 그림을 AllofArt의 갤러리에 올려보세요!"
        />
        <Card
          frontImg={mainPageImg[4]}
          backImg={mainPageImg[5]}
          explain="자신의 그림이 어떤 화가의 화풍과 닮았는지 확인해보세요!"
        />
        <Card
          frontImg={mainPageImg[6]}
          backImg={mainPageImg[7]}
          explain="그림의 화풍을 분석한 결과를 지인에게 공유해보세요!"
        />
        <Options />
      </Wrapper>
      <style jsx global>
        {`
          html,
          body {
            background: ${background} !important;
            padding: 0 !important;
            transition: all 0.7s ease-in-out;
            overflow-y: hidden;
            margin-top: 0;
          }
        `}
      </style>
    </div>
  );
}

const Wrapper = styled.div`
  width: 500vw;
  height: 100vh;
  display: flex;
  padding-top: 15vh;
  line-height: 4.2rem;
`;

const Explain = styled.div`
  width: 50rem;
  max-height: 60vh;
  letter-spacing: 0.3rem;
  padding-left: 8vw;
  padding-right: 2vw;
  padding-top: 10vh;
  text-align: left;
  display: inline-block;
  Button {
    display: block;
  }
`;

const ExplainTitle = styled.div`
  font-size: min(8vh, 8vw);
`;

const ArrowImage = styled.img`
  width: 7vh;
  height: 4vh;
  margin-left: 3vh;
`;
const ClickTheCard = styled.div`
  text-align: center;
  letter-spacing: 0.1rem;
  line-height: 1rem;
  margin-top: 30vh;
`;
