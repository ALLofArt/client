import styled from "styled-components";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/Home";
import { Grid } from "@material-ui/core";

const Wrapper = styled.div`
  width: 20vw;
  display: inline-block;
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
  margin-bottom: 1vh;

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
  font-color:black;
  }
`;

const ProfileLine = styled.h2`
  padding: 0.3em;
  line-height: 1.5em;
  text-align:center;
`;

const ProfileContent = styled.h4`
padding: 0 1vw ;
  line-height: 1.2em;
  text-align:left;
  margin :  10px 0;
`

export default function Profile({ frontImg, backImg, name, role, introduce, colors }) {
  return (
    <Wrapper>
      <ProfileWrapper>
        <div style={{ display: "flex" }}>
                  <ProfileImg frontImg={frontImg} backImg={backImg} colors={colors}/>
          <ProfileName>
            <ProfileLine>{name}</ProfileLine>
            <ProfileLine>{role}</ProfileLine>
          </ProfileName>
        </div>
        <ProfileCard>
         
            {introduce.map((content) => <ProfileContent>{content}</ProfileContent>)}
          
        </ProfileCard>
        <Grid item container spacing={2} justifyContent="center">
          <Grid
            item
            component={"a"}
            target="_blank"
            rel="noreferrer noopener"
            href={"/"}
          >
            <HomeIcon color="primary"
            />
          </Grid>
          <Grid
            item
            component={"a"}
            target="_blank"
            rel="noreferrer noopener"
            href={"/"}
          >
            <GitHubIcon color="primary"
            />
          </Grid>
        </Grid>
      </ProfileWrapper>
    </Wrapper>
  );
}
