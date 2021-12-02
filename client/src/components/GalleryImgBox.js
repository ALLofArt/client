import styled from "styled-components";

export default function GalleryImgBox({
  handleOpen,
  result,
  content,
  style,
  download,
}) {
  return (
    <ImageCard>
      <BoxWrapper onClick={handleOpen}>
        <Download>download:{download}</Download>
        <Result src={result} />

        <StyleResultWrapper>
          <Content src={content} />
          <Style src={style} />
        </StyleResultWrapper>
      </BoxWrapper>
    </ImageCard>
  );
}

const BoxWrapper = styled.div`
//   border: solid 1px red;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin:1vw 1vw;
`;

const Content = styled.img`
//   border: solid 1px black;
  width: 50%;

`;

const StyleResultWrapper = styled.div`
  display: flex;
  position: relative;
//   border: solid 1px black;
  justify-content: center;
  margin-top:1vw;
`;

const Style = styled.img`
//   border: solid 1px black;
  width: 50%;

`;

const Result = styled.img`
//   border: solid 1px black;
  position: relative;
  width: 100%;
  z-index: 1;
`;

const Download = styled.div`
  position: absolute;
  z-index: 2;

`;
const ImageCard = styled.div`
  border: solid 1px blue;
  width: 100%;

`;
