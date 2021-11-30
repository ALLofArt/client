import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Profile from "../src/components/cardbox/Profile";
import { members, frontExample, backExample } from "../data/aboutPageData";

export default function About() {
  const container = useRef();
  const prev = useRef();
  const next = useRef();
  const first = useRef();
  const second = useRef();

  const [previous, setPrevious] = useState(true);

  useEffect(() => {
    let currentPage = 0;
    if (prev.current)
      prev.current.addEventListener("click", () => {
        setPrevious(true);
        currentPage -= 1;
        container.current.style.transform = "none";
      });
    if (next.current)
      next.current.addEventListener("click", () => {
        setPrevious(false);
        currentPage += 1;
        container.current.style.transform = `translateX(${
          -100 * currentPage
        }vw)`;
      });
  });
  useEffect(() => {
    container.current.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
      },
      { passive: false },
    );
  });
  return (
    <Wrapper>
      <Pages ref={container}>
        <PageOne ref={first}>
          {members
            .slice(0, 4)
            .map(({ Img, name, role, introduce, colors }, index) => (
              <Profile
                Img={Img}
                name={name}
                role={role}
                introduce={introduce}
                key={index}
                colors={colors}
              />
            ))}
        </PageOne>
        <PageTwo ref={second}>
          {members
            .slice(4)
            .map(({ Img, name, role, introduce, colors }, index) => (
              <Profile
                Img={Img}
                name={name}
                role={role}
                introduce={introduce}
                key={index}
                colors={colors}
              />
            ))}
        </PageTwo>
      </Pages>
      <ButtonWrapper>
        {!previous ? (
          <PreviousButton ref={prev}>
            <Animation
              autoplay
              loop
              src="https://assets4.lottiefiles.com/private_files/lf30_vejj8cpm.json"
            />
          </PreviousButton>
        ) : (
          <EmptyBox />
        )}

        <Circle color={previous} />
        <Circle color={!previous} />

        {previous ? (
          <NextButton ref={next}>
            <Animation
              autoplay
              loop
              src="https://assets4.lottiefiles.com/private_files/lf30_vejj8cpm.json"
            />
          </NextButton>
        ) : (
          <EmptyBox />
        )}
      </ButtonWrapper>
    </Wrapper>
  );
}

const Circle = styled.div`
  background: ${(props) => (props.color ? "gray" : "transparent")};
  position: relative;
  width: 30px;
  height: 30px;
  border: solid 3px black;
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: 35vw;
  width: 30vw;
  height: 10vh;
  position: relative;
  align-items: center;
  justify-content: space-evenly;
`;
const Wrapper = styled.div`
  display: flex;
  margin-top: 12vh;
  height: 75vh;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const Pages = styled.div`
  display: flex;
  overflow-x: hidden;
  position: relative;
  width: 200vw;
  transition: all 0.5s ease-in-out;
`;
const PreviousButton = styled.div`
  transform: rotate(90deg);
  height: 200px;
  width: 200px;
`;

const NextButton = styled(PreviousButton)`
  transform: rotate(-90deg);
`;

const PageOne = styled.div`
  font-size: 16px;
  width: 100vw;
  height: 100%;
  display: inline-flex;
  justify-content: space-between;
  padding: 0 4vw;
`;
const PageTwo = styled(PageOne)`
  padding: 0 10vw;
`;

const EmptyBox = styled.div`
  height: 200p;
  width: 200px;
`;

const Animation = styled(Player)`
  height: 100px;
  width: 100px;
`;
