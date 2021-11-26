import Profile from "../src/components/cardbox/Profile";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import { members, frontExample, backExample } from "../data/aboutPageData";


const Wrapper = styled.div`
  width: 200vw;
  height: 10vh;
  display: flex;
  padding-top: 10vh;
  margin-bottom: 5vh;
  line-height: 4.2rem;
`;

export default function About() {
  const container = useRef();
  
  return (
    <div
      style={{
        display: "flex",
        overflowY: "visible",
        overflowX: "scroll",
        marginTop: "auto",
        height: "75vh",
        position: "relative",
        overflow: "hidden",
        flexDirection: "column",
      }}
      ref={container}
    >
      <Wrapper>
        {members.map(
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
      </Wrapper>
    </div>
  );
}
