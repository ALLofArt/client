import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";
import Profile from "../src/components/cardbox/Profile";
import { members } from "../data/aboutPageData";

export default function About() {
  const container = useRef();

  const [isFirstPage, setIsFirstPage] = useState(true);

  const onClickPrevBtn = () => {
    setIsFirstPage(true);
    container.current.style.transform = "none";
  };

  const onClickNextBtn = () => {
    setIsFirstPage(false);
    container.current.style.transform = `translateX(-100vw)`;
  };

  return (
    <Wrapper>
      <Container ref={container}>
        <PageWrapper>
          {members.slice(0, 4).map(({ Img, name, role, introduce, colors }) => (
            <Profile
              Img={Img}
              name={name}
              role={role}
              introduce={introduce}
              key={name}
              colors={colors}
            />
          ))}
        </PageWrapper>
        <PageWrapper>
          {members.slice(4).map(({ Img, name, role, introduce, colors }) => (
            <Profile
              Img={Img}
              name={name}
              role={role}
              introduce={introduce}
              key={name}
              colors={colors}
            />
          ))}
        </PageWrapper>
      </Container>

      <BtnContainer isFirstPage={isFirstPage}>
        {!isFirstPage && (
          <PreviousButton onClick={onClickPrevBtn}>
            <Animation
              autoplay
              loop
              src="https://assets4.lottiefiles.com/private_files/lf30_vejj8cpm.json"
            />
          </PreviousButton>
        )}
        <Circle color={isFirstPage} />
        <Circle color={!isFirstPage} />
        {isFirstPage && (
          <NextButton onClick={onClickNextBtn}>
            <Animation
              autoplay
              loop
              src="https://assets4.lottiefiles.com/private_files/lf30_vejj8cpm.json"
            />
          </NextButton>
        )}
      </BtnContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding-top: 12vh;
  height: 90vh;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const Container = styled.div`
  display: flex;
  overflow-x: hidden;
  position: relative;
  width: 200vw;
  transition: all 0.5s ease-in-out;
`;

const PageWrapper = styled.div`
  font-size: 16px;
  width: 100vw;
  height: 100%;
  display: inline-flex;
  justify-content: space-evenly;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.isFirstPage
      ? css`
          margin-left: 6vw;
        `
      : css`
          margin-right: 5vw;
        `}
`;

const Circle = styled.span`
  background: ${(props) => (props.color ? "gray" : "transparent")};
  width: 30px;
  height: 30px;
  border: solid 3px black;
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
  margin-right: 1vw;
`;

const PreviousButton = styled.div`
  transform: rotate(90deg);
`;

const NextButton = styled(PreviousButton)`
  transform: rotate(-90deg);
`;

const Animation = styled(Player)`
  height: 100px;
  width: 100px;
`;
