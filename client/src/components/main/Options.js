import Link from "next/link";
import styled from "styled-components";
import getRandomColor from "../../../lib/getRandomColor";
export default function Options() {
  return (
    <Explain>
      <ClickOptions>§MENU§</ClickOptions>
      <div>
        <Link href="/analysis">
          <ExplainTitle color={getRandomColor}>내 그림 화풍 분석</ExplainTitle>
        </Link>
        <Link href="/transfer">
          <ExplainTitle color={getRandomColor}>
            다른 그림의 화풍 적용
          </ExplainTitle>
        </Link>
        <Link href="/artists">
          <ExplainTitle color={getRandomColor}>
            All Of Art의 화가 소개
          </ExplainTitle>
        </Link>
        <Link href="/gallery">
          <ExplainTitle color={getRandomColor}>갤러리 구경하기</ExplainTitle>
        </Link>
      </div>
    </Explain>
  );
}

const Explain = styled.div`
  width: 90vh;
  padding: 0 20vh;
  max-height: 60vh;
  letter-spacing: 0.7vh;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 3vh;
  Button {
    display: block;
  }
`;

const ExplainTitle = styled.div`
  width: 100%;
  margin: 2vh auto;
  padding-top: 1.5vh;
  padding-bottom: 1.5vh;
  background-color: black;
  color: white;
  text-align: center;
  font-size: 3vh;
  border-radius: 2vh;
  :hover {
    cursor: pointer;
    color: ${(props) => props.color};
    transform: scale(1.1);
    transition: transform 0.3s linear;
    font-weight: bold;
  }
`;

const ClickOptions = styled.strong`
  display: block;
  font-size: 6vh;
  width: 100%;
  text-align: center;
  text-shadow: 4px 4px 0px orange, 8px 8px 0px green;
`;
