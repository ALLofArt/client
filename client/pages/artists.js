import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Artists() {
  const [artistsList, setArtistsList] = useState([]);

  const artistRef = useRef();
  // TODO: 임시 데이터 삭제하기
  const artistList = [
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
    ["/images/davinci.jpeg", "Leonardo Da Vinci asdasdsadasd", 1],
  ];

  // TODO: 데이터 확인 후 console.log 삭제
  const getAllArtists = async () => {
    try {
      const response = await axios.get("/api/artist");
      console.log(response.data);
      setArtistsList(response.data);
    } catch (e) {
      console.log(e.response);
    }
  };
  // TODO: api 연경 시 주석 제거
  useEffect(() => {
    getAllArtists();
  }, []);

  const observerOption = {
    root: null,
    rootMargin: "0px 0px 30px 0px",
    threshold: 0.5,
  };

  useEffect(() => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        // entry.isIntersecting: 특정 요소가 뷰포트와 20%(threshold 0.2) 교차되었으면
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target); // entry.target에 대해 관찰 종료
        }
      });
    }, observerOption);
    // lazy-img 클래스 요소 순회
    const lazyImgs = document.querySelectorAll(".lazy-img");
    lazyImgs.forEach((el) => {
      io.observe(el); // el에 대하여 관측 시작
    });
  });
  const myLoader = ({ src }) => {
    return `http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com${src}`;
  };

  return (
    <main>
      <Container>
        <SecondContainer>
          <GridRow>
            <H1>Painter Information</H1>
          </GridRow>
          <SecondDiv>
            <Markdown>
              <h3>
                {/* TODO: 문구 수정 */}
                동해물과 백두산이 마르고 닳도록, 하나님이 보우하사 우리나라
                만세. 무궁화 삼천리 화려강산. 대한사람 대한으로 길이 보전하세.
              </h3>
            </Markdown>
          </SecondDiv>
        </SecondContainer>
        <SecondContainer>
          <Hr />
        </SecondContainer>
        <SecondContainer>
          <MainGridRow>
            {artistsList.map((artistInfo) => (
              <Link
                href={`/artists/${artistInfo.id}`}
                key={`${artistInfo.name}-${artistInfo.id}`}
              >
                <PageTeaser>
                  <ImageWrapper>
                    <TeaserImage>
                      <Images
                        // loader={myLoader}
                        // src={artistInfo.profile}
                        src="/images/yellow.png"
                        data-src={`http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com:5000${artistInfo.profile}`}
                        alt={artistInfo.name}
                        className="lazy-img"
                        width="100"
                        height="100"
                      />
                    </TeaserImage>
                    <NameBox>
                      <Name>{artistInfo.name}</Name>
                    </NameBox>
                  </ImageWrapper>
                </PageTeaser>
              </Link>
            ))}
          </MainGridRow>
        </SecondContainer>
      </Container>
    </main>
  );
}

const Container = styled.section`
  padding: 5rem 0;
`;

const SecondContainer = styled.section`
  padding-bottom: 3.75rem;
  margin: 0 calc(8% - 20px) 0px;
  @media only screen and (max-width: 64rem) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const H1 = styled.h1`
  grid-column: 1 / span 16;
  font-size: 5rem;
  line-height: 1.05;
  @media only screen and (max-width: 45rem) {
    font-size: 3rem;
  }
`;

const GridRow = styled.div`
  display: grid;
  align-content: flex-start;
  align-items: flex-start;
  grid-template-columns: repeat(24, 1fr);
`;

const SecondDiv = styled.div`
  display: grid;
  align-content: flex-start;
  align-items: flex-start;
  grid-template-columns: repeat(11, 1fr);
`;

const MainGridRow = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  @media only screen and (max-width: 64rem) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (max-width: 45rem) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Markdown = styled.div`
  grid-column: 1 / span 7;
  padding-top: 1.25rem;
`;

const Hr = styled.hr`
  background: #000;
  height: 3px;
  margin: 0;
  padding: 0;
  border: 0;
`;

const PageTeaser = styled.article`
  position: relative;
  height: 100%;
`;

const TeaserImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
`;

const NameBox = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  display: block;
  background-color: #061c25;
  padding: 6% 8%;
  transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`;

const Name = styled.span`
  display: inline-block;
  color: white;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.815rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.08em;
  text-overflow: ellipsis;
  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`;
const ImageWrapper = styled.div`
  overflow: hidden;
  /* background: #f00; */
  width: 100%;
  height: 100%;
  :hover {
    cursor: pointer;
    ${TeaserImage} {
      transform: scale(1.1);
    }
    ${NameBox} {
      background-color: #00667f;
    }
    ${Name} {
      padding-left: 10%;
    }
  }
`;

const Images = styled.img`
  /* background: #f00; */
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;
`;
