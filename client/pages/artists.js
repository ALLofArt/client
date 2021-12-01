import styled from "styled-components";

export default function Artists(props) {
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
          <GridRow>
            <h2></h2>
            <ImageBar>
              <PageTeaser>
                <ImageWrapper>
                  <TeaserImage>
                    <figure>
                      <Image src="/images/davinci.jpeg" alt="da vinci" />
                    </figure>
                  </TeaserImage>
                </ImageWrapper>
              </PageTeaser>
            </ImageBar>
          </GridRow>
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
  padding-left: 85px;
  padding-right: 85px;
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
  grid-column: 1 / span 6;
`;

const ImageBar = styled.div`
  grid-column: 1 / span 3;
  display: grid;
  align-content: flex-start;
  align-items: flex-start;
  grid-template-columns: repeat(6, 1fr);
  padding-bottom: 1.875rem;
`;

const ImageWrapper = styled.div`
  margin-bottom: 1.25rem;
  overflow: hidden;
`;

const TeaserImage = styled.div`
  padding-bottom: 100%;
  will-change: transform;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  
`;
