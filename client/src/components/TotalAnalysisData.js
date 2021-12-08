import styled from "styled-components";
import PropTypes from "prop-types";
import AnalysisChart from "./AnalysisChart";
import AnalysisResult from "./AnalysisResult";
import * as Style from "../../styles/styledcomponents";

export default function TotalAnalysisData({ image, sortArr }) {
  return (
    <Container>
      <AnalysisResult sortArr={sortArr} />
      <GridRow>
        <ImageContainer>
          <Style.ImageWrapper>
            <Style.TeaserImage>
              <ImageBox src={image} alt="Painting" />
            </Style.TeaserImage>
          </Style.ImageWrapper>
        </ImageContainer>
        <ChartContainer>
          <AnalysisChart sortArr={sortArr} />
        </ChartContainer>
      </GridRow>
    </Container>
  );
}

TotalAnalysisData.propTypes = {
  image: PropTypes.string.isRequired,
  sortArr: PropTypes.arrayOf(PropTypes.array).isRequired,
};

const Container = styled.article`
  /* height: 40vh; */
`;

const ImageBox = styled.img`
  width: 100%;
  height: 30vh;
  object-fit: contain;
  margin: auto;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(23, 1fr);
  grid-gap: 1rem;
  max-height: 30vh;
`;

const ImageContainer = styled.div`
  grid-column: 2 / span 7;
`;

const ChartContainer = styled.div`
  grid-column: 11 / span 12;
  align-items: center;
`;
