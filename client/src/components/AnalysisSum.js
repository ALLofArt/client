import styled from "styled-components";
import AnalysisChart from "./AnalysisChart";
import AnalysisResult from "./AnalysisResult";

export default function AnalysisSum({ image, sortArr }) {
  return (
    <ResultContainer>
      <ImageBox src={image} alt="Painting" />
      <div>
        <AnalysisResult sortArr={sortArr} />
        <AnalysisChart sortArr={sortArr} />
      </div>
    </ResultContainer>
  );
}

const ResultContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const ImageBox = styled.img`
  width: 70%;
  margin: auto;
`;
