import Card from "../src/components/cardbox/Card";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { mainPageImg } from "../data/mainPageImg";
import styles from "../styles/main.module.css";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";

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
        container.current.scrollLeft > 450 &&
        container.current.scrollLeft < 880
      ) {
        setBackGround("#57679c");
      }

      if (
        container.current.scrollLeft > 880 &&
        container.current.scrollLeft < 1200
      ) {
        setBackGround("#bc9473");
      }
      if (
        container.current.scrollLeft > 1200 &&
        container.current.scrollLeft < 1600
      ) {
        setBackGround("#4a6396");
      }
      if (container.current.scrollLeft > 1600) {
        setBackGround("#f7c73b");
      }
    };
    if (typeof document.body != undefined)
      document.body.addEventListener("wheel", changeColor);
    return () => {
      if (typeof document.body != undefined)
        document.body.removeEventListener("wheel", changeColor);
    };
  }, []);

  useEffect(() => {
    if (container.current) {
      let flag = false;
      function handleWheel(e) {
        if (flag == true) return;
        flag = true;
        if (e.deltaY > 0) container.current.scrollLeft += 50;
        else container.current.scrollLeft -= 50;
        setTimeout(() => {
          flag = false;
        }, 30);
      }

      if (typeof document.body != undefined) {
        document.body.addEventListener("wheel", handleWheel);
      }

      return () => {
        if (typeof document.body != undefined) {
          document.body.removeEventListener("wheel", handleWheel);
        }
      };
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
          <AnimationWrapper>
            <Animation
              autoplay
              loop
              background="transparent"
              speed="2.5"
              src="https://assets6.lottiefiles.com/packages/lf20_2nbdgrr8.json"
            />
            <div>DRAG THE WHEEL</div>
          </AnimationWrapper>
        </Explain>

        <AnimationWrapper2>
          <ClickTheCard>
            <ArrowImage src="/pngegg.png" />
            <h3>CLICK THE CARDS!</h3>
          </ClickTheCard>
          <Player
            src="https://assets1.lottiefiles.com/private_files/lf30_81wH2j.json"
            background="transparent"
            speed="1"
            loop
            controls
            autoplay
          />
        </AnimationWrapper2>

        <Card frontImg={mainPageImg[0]} backImg={mainPageImg[1]} />
        <Card frontImg={mainPageImg[2]} backImg={mainPageImg[3]} />
        <Card frontImg={mainPageImg[4]} backImg={mainPageImg[5]} />
        <Card frontImg={mainPageImg[6]} backImg={mainPageImg[7]} />
        <Explain>
          <ExplainTitle>
            Check your Style
            <Link href="/">
              <Button variant="outlined">Go</Button>
            </Link>
          </ExplainTitle>

          <p></p>
          <ExplainTitle>
            Change Painting Style
            <Link href="/">
              <Button variant="outlined">Go</Button>
            </Link>
          </ExplainTitle>

          <SponsersWrapper>
            <h3>Sponsers:</h3>
            <img src="/images/elicelogo.png" alt="elicelogo" />
          </SponsersWrapper>
        </Explain>
      </Wrapper>
      <style jsx global>
        {`
          html,
          body {
            background: ${background} !important;
            padding: 0 !important;
            transition: all 0.7s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}

const Wrapper = styled.div`
  width: 500vw;
  height: 90vh;
  display: flex;
  padding-top: 15vh;
  line-height: 4.2rem;
`;

const Explain = styled.div`
  width: 50em;
  max-height: 50vh;
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
  font-size: 3rem;
`;

const AnimationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin-top: 10vh;
`;

const AnimationWrapper2 = styled.div`
  width: 20vh;
  padding-right: 3vh;
`;

const Animation = styled(Player)`
  width: 100px;
  height: 100px;
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

const SponsersWrapper = styled.div`
  margin-right: 10vw;
  line-height: 2rem;
`;
