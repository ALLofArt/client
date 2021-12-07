import styled from "styled-components";
import PropTypes from "prop-types";
import AnalysisChart from "./AnalysisChart";
import AnalysisResult from "./AnalysisResult";

export default function TotalAnalysisData({ image, sortArr }) {
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

TotalAnalysisData.propTypes = {
  image: PropTypes.string.isRequired,
  sortArr: PropTypes.arrayOf(PropTypes.array).isRequired,
};

const ResultContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const ImageBox = styled.img`
  width: 70%;
  margin: auto;
`;
