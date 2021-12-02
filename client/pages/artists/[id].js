import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

export default function Artist() {
  // TODO: default {}로 수정 예정
  const [artistInfo, setArtistInfo] = useState({
    image: "/images/picture4.jpeg",
    name: "Amedeo Modigliani",
    years: "2002 - 2021",
    genre: "Expressionism",
    nationality: "Italian",
    desc: "Amedeo Clemente Modigliani (Italian pronunciation: [amedo modiani]; 12 July 1884  24 January 1920) was an Italian Jewish painter and sculptor who worked mainly in France. He is known for portraits and nudes in a modern style characterized by elongation of faces, necks, and figures that were not received well during his lifetime but later found acceptance. Modigliani spent his youth in Italy, where he studied the art of antiquity and the Renaissance. In 1906 he moved to Paris, where he came into contact with such artists as Pablo Picasso and Constantin Brâncui. By 1912 Modigliani was exhibiting highly stylized sculptures with Cubists of the Section d'Or group at the Salon d'Automne.",
    paintings: [
      "/images/picture1.jpeg",
      "/images/picture2.jpeg",
      "/images/picture3.png",
    ],
  });
  const router = useRouter();
  const params = router.query.id;
  console.log(router.query);
  const fetch = async () => {
    try {
      const response = await axios.get(`api/artists/${params}`);
      // TODO: console.log 삭제
      console.log(response.data);
      setArtistInfo(response.data);
    } catch (e) {
      console.log(e.response);
    }
  };
  return (
    <Container>
      {artistInfo && (
        <InfoWrapper>
          <GridRow>
            <ImageWrapper>
              <TeaserImage>
                <Image src={artistInfo.image} alt="artistImage" />
              </TeaserImage>
            </ImageWrapper>
            <ArtistInfo>
              <p>{artistInfo.name}</p>
              <p>{artistInfo.years}</p>
              <p>{artistInfo.genre}</p>
              <p>{artistInfo.nationality}</p>
              <p>{artistInfo.desc}</p>
            </ArtistInfo>
            {/* <div>
              <img src={artistInfo.paintings[0]} />
              <img src={artistInfo.paintings[1]} />
              <img src={artistInfo.paintings[2]} />
            </div> */}
          </GridRow>
        </InfoWrapper>
      )}
    </Container>
  );
}

const Container = styled.main`
  padding: 10rem 0;
`;

const InfoWrapper = styled.section`
  padding-bottom: 3.75rem;
  margin: 0 calc(8% - 20px) 0px;
`;

const GridRow = styled.div`
  display: grid;
  align-content: flex-start;
  align-items: flex-start;
  grid-template-columns: repeat(24, 1fr);
`;

const TeaserImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
`;

const ImageWrapper = styled.div`
  grid-column: 1 / span 10;
  overflow: hidden;
  height: 100%;
  :hover {
    cursor: pointer;
    ${TeaserImage} {
      transform: scale(1.1);
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;
`;

const ArtistInfo = styled.article`
  grid-column: 12 / span 23;
`;
