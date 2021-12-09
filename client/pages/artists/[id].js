import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import apiUrl from "../../lib/api";
import * as Style from "../../styles/styledcomponents";

export default function Artist() {
  const [artistInfo, setArtistInfo] = useState({
    descDetail: "",
    descSimple: "",
    genre: "",
    images: [],
    nation: "",
    year: "",
    name: "",
  });
  const { descDetail, descSimple, genre, images, nation, year, name } =
    artistInfo;
  const router = useRouter();
  const params = router.query.id;

  const getArtistInfo = useCallback(async () => {
    if (params) {
      try {
        const response = await axios.get(`api/artist/detail/${params}`);
        console.log(response.data);
        setArtistInfo({
          descDetail: response.data.desc_detail,
          descSimple: response.data.desc_simple,
          genre: response.data.genre,
          images: response.data.images,
          nation: response.data.nation,
          year: response.data.year,
          name: response.data.name,
        });
        console.log(response.data.images[0]);
      } catch (e) {
        console.log(e.response);
      }
    }
  });
  useEffect(() => {
    getArtistInfo();
  }, [params]);

  return (
    <Style.Container>
      <Style.SectionContainer>
        <Style.GridRow>
          <Style.Title>{name}</Style.Title>
        </Style.GridRow>
        <Style.IntroWrapper>
          <Style.Markdown>
            <Style.HeaderIntro>{descSimple}</Style.HeaderIntro>
          </Style.Markdown>
        </Style.IntroWrapper>
      </Style.SectionContainer>
      <Style.SectionContainer>
        <Style.Hr />
      </Style.SectionContainer>
      <Style.SectionContainer>
        <Style.GridRow information>
          <ImageContainer>
            <ImageWrapper>
              <TeaserImage>
                <ArtistImage src={`${apiUrl}${images[0]}`} alt={name} />
              </TeaserImage>
            </ImageWrapper>
          </ImageContainer>
          <PrivateInfo>
            <div>
              <p>출생-사망 : {year}</p>
              <p>장르 : {genre}</p>
              <p>국적 : {nation}</p>
            </div>
            <div>
              <p>{descDetail}</p>
            </div>
          </PrivateInfo>
        </Style.GridRow>
      </Style.SectionContainer>
      <TitleWrapper TitleWrapper>
        <h2>{name}의 작품들</h2>
      </TitleWrapper>
      <Style.SectionContainer under>
        <ImagesContainer>
          {images.slice(1, 7).map((image) => (
            <ImageWrapper piece>
              <TeaserImage>
                <img src={`${apiUrl}${image}`} alt="artist masterpiece" />
              </TeaserImage>
            </ImageWrapper>
          ))}
        </ImagesContainer>
      </Style.SectionContainer>
    </Style.Container>
  );
}

const TitleWrapper = styled.div`
  margin: 0 calc(8% - 20px) 1.5rem;
`;

const ImageContainer = styled.figure`
  margin-bottom: 1.5rem;
  grid-column: 1 / span 7;
  overflow: hidden;
  width: 100%;
  height: 100%;
  > div {
    width: 100%;
    height: 100%;
    :hover {
      cursor: pointer;
    }
  }
`;

const TeaserImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  height: ${(props) => (props.piece ? "20vw" : "100%")};
  :hover {
    cursor: pointer;
    ${TeaserImage} {
      transform: scale(1.1);
    }
  }
  @media only screen and (max-width: 45rem) {
    height: ${(props) => (props.piece ? "42vw" : "200px")};
  }
`;

const ArtistImage = styled.img`
  position: relative;
  top: 160;
  left: 150;
  object-fit: cover;
  width: 100%;
  height: 30vw;
  @media only screen and (max-width: 45rem) {
    height: 100%;
  }
`;

const PrivateInfo = styled.div`
  grid-column: 9 / span 15;
  font-size: 1rem;
  font-weight: 700;
  > div {
    margin-bottom: 1.5rem;
  }
`;

const ImagesContainer = styled.div`
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(25%, auto));
  grid-gap: 3vw;
  @media only screen and (max-width: 45rem) {
    grid-template-columns: repeat(2, minmax(25%, auto));
  }
`;
