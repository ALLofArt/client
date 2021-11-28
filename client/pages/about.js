import styled from 'styled-components';
import { useRef, useState } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Profile from '../src/components/cardbox/Profile';
import { members, frontExample, backExample } from '../data/aboutPageData';
import styles from '../styles/about.module.css';

const Circle = styled.div`
  background: ${props=>props.color?"gray":"transparent"};
  position: relative;
  width:30px;
  height:30px;
  border: solid 3px black;
  border-radius: 50px;
  transition:all 0.5s ease-in-out;
  
`

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: 35vw;
  padding-top:10vh;
  width: 30vw;
  height:10vh;
  position :relative;
  align-items:center;
  justify-content:space-evenly;
`;
const Wrapper = styled.div`
  display: flex;
  padding-top: 5vh;
  height: 75vh;
  position: relative;
  flex-direction: column;
  
`;

const PreviousButton = styled.div`
  transform: rotate(90deg); 
`;

const NextButton = styled.div`
  transform: rotate(-90deg); 
`;

const FirstPage = styled.div`
display:flex;
  justify-content:space-evenly;
`;
const SecondPage = styled.div`
  margin-left:15vw;
  margin-right:15vw;
  display:flex;
  justify-content:space-evenly;

`;

export default function About() {
  const container = useRef();
  const [previous, setPrevious] = useState(true);

  const handlePrevious = () => {
    container.current.scrollLeft -= container.current.clientWidth;
    setPrevious(true);
  }
  const handleNext = () => {
    container.current.scrollLeft += container.current.clientWidth;
    setPrevious(false);
  }
  return (
    <>
    <Wrapper >
      <div className={styles.box} ref={container}>
        <FirstPage>
        {members.slice(0,4).map(
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
        </FirstPage>
        <SecondPage>
        {members.slice(4,).map(
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
        </SecondPage>
      </div>
      <ButtonWrapper>
        <PreviousButton onClick={handlePrevious} >
        {!previous?<Player
          autoplay
          loop
          src="https://assets4.lottiefiles.com/private_files/lf30_vejj8cpm.json"
          style={{ height: '100px', width: '100px' }} 
          />:<div style={{ height: '100px', width: '100px' }} />}
        </PreviousButton>
        <Circle color={previous}/>
        <Circle color={!previous}/>
        <NextButton onClick={handleNext}>
        {previous?<Player
          autoplay
          loop
          src="https://assets4.lottiefiles.com/private_files/lf30_vejj8cpm.json"
          style={{ height: '100px', width: '100px' }}
          />:<div style={{ height: '100px', width: '100px' }} />}
        </NextButton>
      </ButtonWrapper>
    </Wrapper>
    </>
  );
}
