import Card from "../src/components/cardbox/Card";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { mainPageImg } from "../data/mainPageImg";
import styles from "../styles/main.module.css";
import { Player } from "@lottiefiles/react-lottie-player";
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
    if(typeof document.body != undefined) document.body.addEventListener("wheel", changeColor);
    return () => {
      if(typeof document.body != undefined) document.body.removeEventListener("wheel", changeColor);
    };
  },[]);

  useEffect(() => {
    if (container.current) {
      function handleWheel(e) {
        if (e.deltaY > 0) container.current.scrollLeft += 50;
        else container.current.scrollLeft -= 50;
        console.log("wheel");
      }
      if(typeof document.body != undefined) document.body.addEventListener("wheel", handleWheel);
      return () => {
        if(typeof document.body != undefined) document.body.removeEventListener("wheel", handleWheel);
      };
    }
  },[]);

  return (
    <div
      id="container"
      style={{
        
      }}
      className={styles.box}
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
         <div style={{display:"flex", flexDirection:"column", alignItems:"center", width: "200px", marginTop:"10vh"}}> 
        <Player autoplay
          loop  background="transparent"  speed="2.5"  style={{width: "100px", height: "100px"}}  src="https://assets6.lottiefiles.com/packages/lf20_2nbdgrr8.json"/>
        <div>DRAG THE WHEEL</div>
        </div>
        </Explain>
       
        <div style={{ width: "20vh", paddingRight: "3vh" }}>
          <div style={{ textAlign: "center", letterSpacing: "0.1rem", lineHeight:"1rem" , marginTop:"30vh"}}>
          <img
            src="/pngegg.png"
            width="40vh"
            align="right"
            style={{ paddingBottom:"10vh" }}
          />
            <h3>CLICK THE CARDS!</h3>
          </div>
          <Player src="https://assets1.lottiefiles.com/private_files/lf30_81wH2j.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"  }} loop controls autoplay/>
          
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
