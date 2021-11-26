import Profile from "../src/components/cardbox/Profile";
import styled from "styled-components";
import { useRef } from "react";
import { members, frontExample, backExample } from "../data/aboutPageData";
import styles from "../styles/about.module.css";

const PreviousButton = styled.div`
  background: red;
  position: relative;
`;
const NextButton = styled.div`
  background: red;
  position:relative;
`;

const Wrapper = styled.div`
  display: flex;
  padding-top: 5vh;
  height: 75vh;
  position: relative;
`;
export default function About() {
  const container = useRef();

  return (
    <Wrapper ref={container}>
        <PreviousButton />
        <div className={styles.box}>
          {members
            .map(
              ({ frontImg, backImg, name, role, introduce, colors }, index) => (
                <Profile
                  frontImg={frontExample}
                  backImg={backExample}
                  name={name}
                  role={role}
                  introduce={introduce}
                  key={index}
                  colors={colors}
                />
              ),
            )}
        </div>
        <NextButton/>
    </Wrapper>
  );
}
