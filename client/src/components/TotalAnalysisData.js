import styled from "styled-components";
import PropTypes from "prop-types";
import AnalysisChart from "./AnalysisChart";
import AnalysisResult from "./AnalysisResult";
import * as Style from "../../styles/styledcomponents";
import apiUrl from "../../lib/api";
import AnalysisArtistInfo from "./AnalysisArtistInfo";

export default function TotalAnalysisData({
  artistName,
  artistId,
  artistImages,
  userPainting,
  styleResult,
  desc,
}) {
  return (
    <Container>
      <AnalysisResult styleResult={styleResult} />
      <GridRow>
        <ImageContainer>
          <Style.ImageWrapper>
            <Style.TeaserImage>
              <ImageBox src={`${apiUrl}${userPainting}`} alt="Painting" />
            </Style.TeaserImage>
          </Style.ImageWrapper>
        </ImageContainer>
        <ChartContainer>
          <AnalysisChart styleResult={styleResult} />
        </ChartContainer>
      </GridRow>
      <AnalysisArtistInfo
        desc={desc}
        artistName={artistName}
        artistId={artistId}
        artistImages={artistImages}
      />
    </Container>
  );
}

TotalAnalysisData.propTypes = {
  userPainting: PropTypes.string.isRequired,
  styleResult: PropTypes.arrayOf(PropTypes.array).isRequired,
  artistImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  desc: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  artistId: PropTypes.number.isRequired,
};

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin: auto;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(23, 1fr);
  grid-gap: 1rem;
  min-height: 30vh;
  @media only screen and (max-width: 45rem) {
    display: flex;
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  grid-column: 2 / span 7;
  height: 30vh;
`;

const ChartContainer = styled.div`
  grid-column: 11 / span 12;
  align-items: center;
`;
