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
      <IconContainer>
        <Home />
        <GitHub />
      </IconContainer>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 30px;
  border: solid 3px black;
  width: 20vw;
  height: 60vh;
  overflow: hidden;
  background-color: white;
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
  overflow: hidden;
  backface-visibility: hidden;
  background-color: white;
  background-image: url(${(props) => props.Img});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 100;
`;

const ProfileName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10vw;
  height: 10vw;
  overflow: hidden;
  background-color: white;
  font-color: black;

  h2 {
    font-size: 1.8rem;
    font-weight: 800;
  }
}
`;

const ProfileCard = styled.div`
  width: 88%;
  height: 100%; 
  overflow: hidden;
  margin-top: 0.7vh;
  margin-bottom: 2.5vh;
  border: solid 2px black;
  border-style: dashed;
}`;

const ProfileContent = styled.h4`
  padding: 0 1vw;
  line-height: 1.2em;
  text-align: left;
  margin: 10px 0;
  font-weight: 600;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3vh;
`;
