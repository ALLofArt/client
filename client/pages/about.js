import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Profile from "../src/components/cardbox/Profile";
import { members, frontExample, backExample } from "../data/aboutPageData";
import styles from "../styles/about.module.css";

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
  overflow-x:hidden;
  overflow-y:hidden;
`;

const PreviousButton = styled.div`
  transform: rotate(90deg);
  height: 200px;
  width: 200px;
`;

const NextButton = styled.div`
  transform: rotate(-90deg);
  height: 200px;
  width: 200px;
`;

const PageOne = styled.div`
  font-size: 16px;
  width: 100vw;
  height: 100%;
  display: inline-flex;
  justify-content: space-between;
  padding:0 4vw;


`;
const PageTwo = styled(PageOne)`
  padding: 0 10vw;
`;

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
        container.current.style.transform ="none";
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
      <div className={styles.box} ref={container}>
        <PageOne ref={first}>
          {members
            .slice(0, 4)
            .map(
              ({ frontImg, backImg, name, role, introduce, colors }, index) => (
                <Profile
                  frontImg={frontImg}
                  backImg={backExample}
                  name={name}
                  role={role}
                  introduce={introduce}
                  key={index}
                  colors={colors}
                />
              ),
            )}
        </PageOne>
        <PageTwo ref={second}>
          {members
            .slice(4)
            .map(
              ({ frontImg, backImg, name, role, introduce, colors }, index) => (
                <Profile
                  frontImg={frontImg}
                  backImg={backExample}
                  name={name}
                  role={role}
                  introduce={introduce}
                  key={index}
                  colors={colors}
                />
              ),
            )}
        </PageTwo>
      </div>
      <ButtonWrapper>
        {!previous ? (
          <PreviousButton ref={prev}>
            <Player
              autoplay
              loop
              src="https://assets4.lottiefiles.com/private_files/lf30_vejj8cpm.json"
              style={{ height: "100px", width: "100px" }}
            />
          </PreviousButton>
        ) : (
          <div style={{ height: "200px", width: "200px" }} />
        )}

        <Circle color={previous} />
        <Circle color={!previous} />

        {previous ? (
          <NextButton ref={next}>
            <Player
              autoplay
              loop
              src="https://assets4.lottiefiles.com/private_files/lf30_vejj8cpm.json"
              style={{ height: "100px", width: "100px" }}
            />
          </NextButton>
        ) : (
          <div style={{ height: "200px", width: "200px" }} />
        )}
      </ButtonWrapper>
    </Wrapper>
  );
}
