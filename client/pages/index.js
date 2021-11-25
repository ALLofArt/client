import Card from "../src/components/cardbox/Card";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { mainPageImg } from "../data/mainPageImg";

const Wrapper = styled.div`
  width: 500vw;
  height: 60vh;
  display: flex;
  padding-top: 10vh;
  margin-bottom: 5vh;
  line-height: 4.2rem;
`;

const Explain = styled.div`
  width: 60vw;
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
const ExplainContent = styled.div`
  font-size: 2rem;
`;

export default function Home() {
  const [background, setBackGround] = useState("#f7c73b");
  const container = useRef();
  useEffect(() => {
    function changeColor() {
      if (
        container.current.scrollLeft >= 0 &&
        container.current.scrollLeft < 450
      ) {
        setBackGround("#f7c73b");
        console.log(container.current.scrollLeft);
      }
      if (
        container.current.scrollLeft > 450 &&
        container.current.scrollLeft < 880
      ) {
        setBackGround("#57679c");
        console.log(container.current.scrollLeft);
      }

      if (
        container.current.scrollLeft > 880 &&
        container.current.scrollLeft < 1200
      ) {
        setBackGround("#bc9473");
        console.log(container.current.scrollLeft);
      }
      if (
        container.current.scrollLeft > 1200 &&
        container.current.scrollLeft < 1600
      ) {
        setBackGround("#4a6396");
        console.log(container.current.scrollLeft);
      }
      if (container.current.scrollLeft > 1600) {
        setBackGround("#f7c73b");
        console.log(container.current.scrollLeft);
      }
    }
    container.current.addEventListener("wheel", changeColor);
    return () => {
      document.body.removeEventListener("wheel", changeColor);
    };
  });

  useEffect(() => {
    if (container.current) {
      function handleWheel(e) {
        if (e.deltaY > 0) container.current.scrollLeft += 10;
        else container.current.scrollLeft -= 10;
        console.log("wheel");
      }
      container.current.addEventListener("wheel", handleWheel);
      return () => {
        document.body.removeEventListener("wheel", handleWheel);
      };
    }
  });

  return (
    <div
      id="container"
      style={{
        display: "flex",
        overflowY: "visible",
        overflowX: "scroll",
        marginTop: "auto",
        height: "75vh",
        position: "relative",
        overflow: "hidden",
      }}
      ref={container}
    >
      <Wrapper>
        <Explain>
          <strong>
            <ExplainTitle>Find your </ExplainTitle>
            <ExplainTitle>Painting Style</ExplainTitle>
            <ExplainTitle>And be </ExplainTitle>
            <ExplainTitle>an Artist</ExplainTitle>
          </strong>
        </Explain>
        <div style={{ width: "20vh", paddingRight: "10px" }}>
          <div style={{ textAlign: "right", letterSpacing: "0.1rem" }}>
            click the card!
          </div>
          <img
            src="/pngegg.png"
            width="40vh"
            align="right"
            style={{ transform: "rotate(90deg)" }}
          />
        </div>

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

          <div style={{ marginRight: "10vw", lineHeight: "2rem" }}>
            <h3>Sponsers:</h3>
            <h1>ELICE</h1>
          </div>
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
