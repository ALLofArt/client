import styled from "styled-components";
// import BeforeAfterSlider from "react-before-after-slider";
import ReactCompareImage from "react-compare-image";

export default function TransferResult({ before, after }) {
  return (
    <div>
      <ResultTitle>결과</ResultTitle>
      <CompareContainer>
        <ReactCompareImage leftImage={before} rightImage={after} />
      </CompareContainer>
      <ResultImg src={before} />
      <ResultImg src={after} />
    </div>
  );
}

const ResultTitle = styled.h1`
  text-align: center;
`;

const CompareContainer = styled.div`
  width: 25vw;
  height: 25wh;
`;

const ResultImg = styled.img`
  width: 25vw;
  height: 25wh;
`;
