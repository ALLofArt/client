import styled from "styled-components";
import { GitHub, Home } from "@material-ui/icons";
import { Grid } from "@material-ui/core";

export default function Profile({ Img, name, role, introduce, colors }) {
  console.log(colors);
  return (
    <ProfileWrapper>
      <ProfileNameWrapper>
        <ProfileImg Img={Img} colors={colors} />
        <ProfileName>
          <h2>{name}</h2>
          <h3>{role}</h3>
        </ProfileName>
      </ProfileNameWrapper>
      <ProfileCard>
        {introduce.map((content, index) => (
          <ProfileContent key={index}>{content}</ProfileContent>
        ))}
      </ProfileCard>
      <Grid item container spacing={2} justifyContent="center">
        <Grid
          item
          component={"a"}
          target="_blank"
          rel="noreferrer noopener"
          href={"/"}
        >
          <Home color="primary" />
        </Grid>
        <Grid
          item
          component={"a"}
          target="_blank"
          rel="noreferrer noopener"
          href={"/"}
        >
          <GitHub color="primary" />
        </Grid>
      </Grid>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.section`
  border-radius: 30px;
  width: 20vw;
  height: 60vh;
  overflow: hidden;
  position: relative;
  background-color: white;
  border: solid 4px black;
`;

const ProfileNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.div`
  border-radius: 10vw;
  border: solid 4px;
  border-color: ${(props) => (props.colors ? props.colors : "gray")};
  border-style: inset;
  width: 8vw;
  height: 8vw;
  margin-left: 1vw;
  margin-top: 1vw;
  overflow: hidden;
  backface-visibility: hidden;
  background-color: white;
  background-image: url(${(props) => props.Img});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 100;
`;

const ProfileName = styled.div`
  width: 10vw;
  height: 10vw;
  padding-top: 4vh;
  overflow: hidden;
  position: relative;
  background-color: white;
  line-height: 2em;
  font-color: black;

  h2 {
    padding: 0 0.3em;
    margin-top: 1vh;
    line-height: 1.5em;
    text-align: center;
    font-size: 1.8rem;
    font-weight: 800;
  }

  h3 {
    padding: 0 0.3em;
    text-align: center;
  }
}
`;

const ProfileCard = styled.div`
  // border-radius: 30px;
  width: 17vw;
  height: 33vh;
  overflow: hidden;
  position: relative;
  margin-left:1.5vw;
  margin-top:1vw;
  border: solid 2px black;
  border-style: dashed;
  margin-bottom: 1vh;

  }
`;

const ProfileContent = styled.h4`
  padding: 0 1vw;
  line-height: 1.2em;
  text-align: left;
  margin: 10px 0;
`;
