import styled from "styled-components";

export default function GalleryImgBox({saveFile, painting_id,handleOpen,result,content,style,download}) {
    
    return (
      <ImageCard>
        <BoxWrapper key={painting_id} onClick={handleOpen}>
          <Result src={result} />
          <StyleResultWrapper>
            <Content src={content} />
            <Style src={style} />
          </StyleResultWrapper>
          <div>download:{download}</div>
        </BoxWrapper>
        
      </ImageCard>
    );
}


const BoxWrapper = styled.div`
  border: solid 1px red;
`;

const Content = styled.img`
  border: solid 1px black;
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.img});
`;

const StyleResultWrapper = styled.div`
  display: flex;
  border: solid 1px black;
  width: 100px;
  height: 100px;
`;

const Style = styled.img`
  border: solid 1px black;
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.img});
`;

const Result = styled.img`
  border: solid 1px black;
  width: 200px;
  height: 200px;
  background-image: url(${(props) => props.img});
`;


const ImageCard = styled.div``;