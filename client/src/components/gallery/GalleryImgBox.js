import styled from "styled-components";
import apiUrl from "../../../lib/api";

export default function GalleryImgBox({
  handleOpen,
  result_img_url,
  content_img_url,
  style_img_url,
  download,
  num,
  result_img_id,
}) {
  return (
    <ImageCard>
      <BoxWrapper onClick={handleOpen}>
        <Result src={`${apiUrl}${result_img_url}`} />
        <StyleResultWrapper>
          <Content src={`${apiUrl}${content_img_url}`} />
          <Style src={`${apiUrl}${style_img_url}`} />
        </StyleResultWrapper>
      </BoxWrapper>
      <DownloadCommentWrapper>
        <Download>download:{download}</Download>
        <Comment>comment:</Comment>
        <Date>id:{result_img_id}</Date>
      </DownloadCommentWrapper>
    </ImageCard>
  );
}

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1vw;
  border: solid 30px blue;
  border-image: url("/gallery/frame.jpg") 100;
  border-image-outset: 15px;
  background-color: white;
`;

const Content = styled.img`
  width: 50%;
`;

const StyleResultWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 1vw;
`;

const Style = styled.img`
  width: 50%;
`;

const Result = styled.img`
  position: relative;
  width: 100%;
`;

const Download = styled.div`
  background-color: white;
  width: 40%;
  display: inline-block;
`;
const ImageCard = styled.div`
  width: 100%;
`;
const Comment = styled.div`
  background-color: white;
  width: 40%;
  display: inline-block;
`;
const DownloadCommentWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 30px;
`;

const Date = styled.div`
  background-color: white;
  width: 40%;
  display: inline-block;
`;
