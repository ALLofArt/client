import Link from "next/link";
import styled from "styled-components";
import getRandomColor from "../../../lib/getRandomColor";
export default function Options() {
  return (
    <Explain>
      <ClickOptions>What do you want?</ClickOptions>
      <Link href="/analysis">
        <ExplainTitle color={getRandomColor}>Analyze Style</ExplainTitle>
      </Link>
      <Link href="/transfer">
        <ExplainTitle color={getRandomColor}>
          Change Painting Style
        </ExplainTitle>
      </Link>
      <Link href="/artists">
        <ExplainTitle color={getRandomColor}>
          Get Info about our Artists
        </ExplainTitle>
      </Link>
      <Link href="/gallery">
        <ExplainTitle color={getRandomColor}>Go to Gallery</ExplainTitle>
      </Link>
      <SponsersWrapper>
        <h1>Sponsers:</h1>
        <img src="/images/elicelogo.png" alt="elicelogo" />
      </SponsersWrapper>
    </Explain>
  );
}

const Explain = styled.div`
  width: 70rem;
  max-height: 60vh;
  letter-spacing: 0.3rem;
  padding-left: 8vw;
  padding-right: 10rem;
  text-align: left;
  display: inline-block;

  Button {
    display: block;
  }
`;

const ExplainTitle = styled.div`
  font-size: min(4vh, 2vw);
  padding-top: min(0.1rem, 0.1rem);
  width: 100%;
  margin: 2rem auto;
  padding-top: min(1.2vh, 0.7vw);
  padding-bottom: min(1.2vh, 0.7vw);
  background-color: black;
  color: white;
  text-align: center;

  border-radius: 1.2rem;
  :hover {
    cursor: pointer;
    color: ${(props) => props.color};
    transform: scale(1.1);
    transition: transform 0.3s linear;
    font-weight: bold;
  }
`;

const SponsersWrapper = styled.div``;

const ClickOptions = styled.strong`
  display: block;
  font-size: min(6vh, 6vw);
  width: 100%;
  text-align: center;
`;
