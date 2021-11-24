import Card from "../src/components/cardbox/Card";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Link from "next/link";

const Wrapper = styled.div`
  width: 400vh;
  height: 60vh;
  display: flex;
  padding-top: 10vh;
  margin-bottom: 5vh;
  line-height: 4.2rem;
  
`;

const Explain = styled.div`
  width: 43vw;
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
  font-size:3rem;

`
const ExplainContent = styled.div`
  font-size: 2rem;
`;
   
  

export default function Home() {

  const target = document.querySelector("div");

  target.addEventListener("wheel", (event) => {
    const toLeft = event.deltaY < 0 && target.scrollLeft > 0;
    const toRight =
      event.deltaY > 0 &&
      target.scrollLeft < target.scrollWidth - target.clientWidth;

    if (toLeft || toRight) {
      event.preventDefault();
      target.scrollLeft += event.deltaY;
      
    }
  });


  return (
    <>
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
          <div style={{ textAlign:"right" ,letterSpacing: "0.1rem"}}>click the card!</div>
          <img src="/pngegg.png" width="40vh" align="right" style={{transform:"rotate(90deg)"}}/>
        </div>
        
        <Card />
        <Card />
        <Card />
        <Card />
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

          <div style={{ margin: "10vh", lineHeight: "2rem" }}>
            <h3>Sponsers:</h3>
            <h1>ELICE</h1>
          </div>
        </Explain>
      </Wrapper>
    </>
  );
}
