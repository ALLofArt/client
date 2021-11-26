import Profile from "../src/components/cardbox/Profile";
import styled from "styled-components";
import { useRef } from "react";
import { members, frontExample, backExample } from "../data/aboutPageData";

const Wrapper = styled.div`
  width: 200vw;
  height: 10vh;
  display: flex;
  padding-top: 10vh;
  margin-bottom: 5vh;
  line-height: 4.2rem;
`;

const PreviousButton = styled.div`
  background: red;
  position: relative;
`;
const NextButton = styled.div`
  background: red;
  position:relative;
`;

export default function About() {
  const container = useRef();

  return (
    <div
      style={{
        display: "flex",
        marginTop: "auto",
        height: "75vh",
        position: "relative",
        flexDirection: "column",
      }}
      ref={container}
    >
      
        <PreviousButton />
        <div>
          {members
            .slice(0, 4)
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
        <div>
          {members
            .slice(4,)
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
     
    </div>
  );
}
