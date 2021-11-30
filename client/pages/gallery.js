import styled from "styled-components";

const Title = styled.div`
  font-size: 5rem;
  width:100%;
  text-align:center;

`;

const MarginTop = styled.div`
  margin-top: 10vh;
`;

const Audio = styled.div`

`;

export default function Gallery() {
  return (
    <div>
      <MarginTop />
      <Title>Gallery</Title>
      <Audio>
      <audio controls src="/music/bgm.mp3">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      </Audio>


    </div>
  );
}
