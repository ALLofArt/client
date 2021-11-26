import styled from "styled-components";

import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/Home";
import { Grid } from "@material-ui/core";

const Wrapper = styled.div`
  width: 24vw;
  display: inline-block;
  padding-left: 4vw;
  padding-bottom: 8vw;
`;

const ProfileWrapper = styled.div`
  border-radius: 30px;
  width: 20vw;
  height: 60vh;
  overflow: hidden;
  position: relative;
  background-color: white;
  border: solid 4px black;
  
`;
const ProfileImg = styled.div`
  border-radius: 10vw;
  border: solid 4px ;
  border-color:${(props) => (props.colors ? props.colors : "gray")};
  border-style: inset;
  width: 9vw;
  height: 9vw;
  margin-left: 1vw;
  margin-top: 1vw;
  overflow: hidden;
  backface-visibility: hidden;
  position: relative;
  background-color: white;
  background-image: url(${(props) => props.frontImg});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 100;
  &:hover {
    background-image: url(${(props) => props.backImg});
    transition: all 0.3s ease-in-out;
  }
`;

const ProfileCard = styled.div`
  border-radius: 30px;
  width: 17vw;
  height: 33vh;
  overflow: hidden;
  position: relative;
  margin-left:1.5vw;
  margin-top:1vw;
  border: solid 2px black;
  border-style: dashed;
  

  }
`;
const ProfileName = styled.div`
  width: 10vw;
  height: 10vw;
  padding-top:3vw;
  overflow: hidden;
  position: relative;
  background-color: white;
  line-height: 2em;
  }
`;

const ProfileLine = styled.h4`
  padding-left: 1vw;
`;

export default function Profile({ frontImg, backImg, name, role, introduce, colors }) {
  return (
    <Wrapper>
      <ProfileWrapper>
        <div style={{ display: "flex" }}>
                  <ProfileImg frontImg={frontImg} backImg={backImg} colors={colors}/>
          <ProfileName>
            <ProfileLine>이름: {name}</ProfileLine>
            <ProfileLine>역할: {role}</ProfileLine>
          </ProfileName>
        </div>
        <ProfileCard>
          <ProfileLine>소개: {introduce}</ProfileLine>
        </ProfileCard>
        <Grid item container spacing={2} justifyContent="center">
          <Grid
            item
            component={"a"}
            target="_blank"
            rel="noreferrer noopener"
            href={"/"}
          >
            <HomeIcon
            />
          </Grid>
          <Grid
            item
            component={"a"}
            target="_blank"
            rel="noreferrer noopener"
            href={"/"}
          >
            <GitHubIcon
            />
          </Grid>
        </Grid>
      </ProfileWrapper>
    </Wrapper>
  );
}
