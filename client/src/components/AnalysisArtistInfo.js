import PropTypes from "prop-types";
import styled from "styled-components";
import * as Style from "../../styles/styledcomponents";

export default function AnalysisArtistInfo({ desc, artist }) {
  return (
    <Container>
      <GridRow>
        <DescContainer>
          <p>피카소</p>
          <p>{desc}</p>
        </DescContainer>
      </GridRow>
      <GridRow>
        <ImagesContainer>
          <Style.PageTeaser>
            <Style.ImageWrapper>
              <Style.TeaserImage>
                <Style.Images large src="/images/picture4.jpeg" alt="#" />
              </Style.TeaserImage>
            </Style.ImageWrapper>
          </Style.PageTeaser>
          <Style.PageTeaser>
            <Style.ImageWrapper>
              <Style.TeaserImage>
                <Style.Images large src="/images/picture1.jpeg" alt="#" />
              </Style.TeaserImage>
            </Style.ImageWrapper>
          </Style.PageTeaser>
          <Style.PageTeaser>
            <Style.ImageWrapper>
              <Style.TeaserImage>
                <Style.Images large src="/images/picture2.jpeg" alt="#" />
              </Style.TeaserImage>
            </Style.ImageWrapper>
          </Style.PageTeaser>
        </ImagesContainer>
      </GridRow>
    </Container>
  );
}

AnalysisArtistInfo.propTypes = {
  desc: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};

const Container = styled.article`
  padding: 3rem 0 0 0;
  margin: 0 calc(8% - 20px) 0px;
  width: 100%;
  height: 100%;
`;

const GridRow = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(23, 1fr);
  margin-bottom: 2rem;
`;

const DescContainer = styled.div`
  grid-column: 2 / span 21;
  > p {
    font-size: 1rem;
    font-weight: 700;
  }
`;

const ImagesContainer = styled.figure`
  grid-column: 2 / span 21;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2vw;
`;
