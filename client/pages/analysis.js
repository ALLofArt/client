import axios from "axios";
import {
  Button,
  Typography,
  Modal,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { Send, Replay } from "@material-ui/icons";
import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Upload from "../src/components/Upload";
import KakaoButton from "../src/components/KakaoButton";
import TotalAnalysisData from "../src/components/TotalAnalysisData";
import * as Style from "../styles/styledcomponents";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: 20,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  outline: "none",
};

export default function analysis() {
  const [file, setFile] = useState(""); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisInfo, setAnalysisInfo] = useState({
    artistName: "",
    artistId: 0,
    userPainting: "",
    styleResult: [],
    paintingId: 0,
    desc: "",
    artistImages: [],
  });

  const {
    artistName,
    artistId,
    artistImages,
    userPainting,
    styleResult,
    desc,
    paintingId,
  } = analysisInfo;

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);
  const handleClose = useCallback(() => setOpen(false), []);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          setErrorMsg("");
          setIsLoading(true);
          const response = await axios.post(`api/style`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          const sortable = [];
          const paintResult = response.data.style_result;
          Object.keys(paintResult).forEach((key) => {
            if (paintResult[key]) {
              sortable.push([key, paintResult[key]]);
            }
          });
          console.log(response.data);
          setAnalysisInfo((prevState) => ({
            ...prevState,
            userPainting: response.data.image_url,
            artistName: response.data.artist_name,
            artistImages: response.data.artist_images,
            artistId: response.data.artist_id,
            desc: response.data.artist_bio,
            styleResult: sortable,
            paintingId: response.data.painting_id,
          }));
          setIsLoading(false);
        } else {
          setErrorMsg("Please select a file to add.");
          setOpen(true);
        }
      } catch (e) {
        console.log(e.response);
        setErrorMsg("Please select a file to add.");
        setOpen(true);
      }
    },
    [file],
  );

  const onRetry = useCallback(() => {
    setFile("");
    setAnalysisInfo({
      artistName: "",
      artistId: 0,
      userPainting: "",
      styleResult: [],
      paintingId: 0,
      desc: "",
      artistImages: [],
    });
    setPreviewSrc("");
    setIsPreviewAvailable([]);
  }, []);

  return (
    <Style.Container>
      <div>
        {errorMsg && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, border: "none" }}
              >
                <strong> {errorMsg} </strong>
              </Typography>
            </Box>
          </Modal>
        )}
      </div>
      <Style.SectionContainer>
        <Style.GridRow>
          <Style.Title Long>Look for the painter style</Style.Title>
        </Style.GridRow>
        <Style.IntroWrapper>
          <Style.Markdown>
            <Style.HeaderIntro>
              그림을 업로드하고, 어떤 유명 화가의 화풍과 유사한지 확인해보세요.{" "}
            </Style.HeaderIntro>
          </Style.Markdown>
        </Style.IntroWrapper>
      </Style.SectionContainer>
      <Style.SectionContainer>
        <Style.Hr />
      </Style.SectionContainer>
      {isLoading ? (
        <Style.SectionContainer>
          <LoadingWrapper>
            <CircularProgress />
          </LoadingWrapper>
        </Style.SectionContainer>
      ) : !styleResult[0] ? (
        <Style.SectionContainer>
          <Style.GridRow>
            <UploadContainer>
              <UploadWrapper>
                <Upload
                  file={file}
                  setFile={setFile}
                  previewSrc={previewSrc}
                  setPreviewSrc={setPreviewSrc}
                  isPreviewAvailable={isPreviewAvailable}
                  setIsPreviewAvailable={setIsPreviewAvailable}
                  errorMsg={errorMsg}
                  setErrorMsg={setErrorMsg}
                  setOpen={setOpen}
                />
              </UploadWrapper>
            </UploadContainer>
          </Style.GridRow>
          <Style.BtnContainer>
            <SubmitBtn
              size="large"
              endIcon={<Send />}
              type="submit"
              onClick={onSubmit}
            >
              Analyze
            </SubmitBtn>
          </Style.BtnContainer>
        </Style.SectionContainer>
      ) : (
        <Style.SectionContainer>
          <TotalAnalysisData
            userPainting={userPainting}
            styleResult={styleResult}
            artistName={artistName}
            artistId={artistId}
            artistImages={artistImages}
            desc={desc}
          />
          <BtnsContainer>
            <Style.BtnContainer>
              <SubmitBtn endIcon={<Replay />} onClick={onRetry}>
                RETRY
              </SubmitBtn>
            </Style.BtnContainer>
            <KakaoButton params={paintingId} />
          </BtnsContainer>
        </Style.SectionContainer>
      )}
    </Style.Container>
  );
}

const SubmitBtn = styled(Button)`
  background: #000;
  border-radius: 50px;
  border: 3px solid black;
  width: 8rem;
  height: 2.8rem;
  color: white;
  text-align: center;
  cursor: pointer;
  :hover {
    background: rgba(0, 0, 0, 0.8);
  }
  span {
    font-size: 1rem;
    font-family: "Noto Sans", sans-serif;
    line-height: 1.4rem;
    font-weight: 800;
  }
`;

const UploadContainer = styled.div`
  grid-column: 5 / span 16;
  height: 40vh;
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(10, 1fr);
  justify-content: center;
  @media only screen and (max-width: 45rem) {
    height: 30vh;
  }
`;

const UploadWrapper = styled.div`
  grid-column: 2 / span 12;
  grid-row: 1 / span 9;
  justify-content: center;
`;

const LoadingWrapper = styled.div`
  display: flex;
  padding-top: 20vh;
  justify-content: center;
`;

const BtnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;
