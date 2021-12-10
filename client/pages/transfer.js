import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  Typography,
  Modal,
  Box,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import { Player } from "@lottiefiles/react-lottie-player";
import { inputErrorMsgs } from "../src/constants/Msgs";
import Upload from "../src/components/Upload";
import TabPanel from "../src/components/TabPanel";
import TabMenu from "../src/components/TabMenu";
import TransferResult from "../src/components/TransferResult";

// TODO: env에 빼거나 공용으로 만들 것
const BASE_URL =
  "http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com:5000";

export default function Transfer() {
  // for content img
  const [contentImg, setContentImg] = useState(undefined);
  const [contentPreview, setContentPreview] = useState("");
  const [isContentPreview, setIsContentPreview] = useState(false);
  // for style img
  const [styleImg, setStyleImg] = useState(undefined);
  const [stylePreview, setStylePreview] = useState("");
  const [isStylePreview, setIsStylePreview] = useState(false);
  // for api
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [isRandomContent, setIsRandomContent] = useState(false);
  const [isRandomStyle, setIsRandomStyle] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(undefined);
  const [paintingId, setPaintingId] = useState(undefined);
  // for tab
  const [contentTab, setContentTab] = useState(0);
  const [styleTab, setStyleTab] = useState(0);
  // TODO: api 완성 후 변경 / random image url
  const [randomContent, setRandomContent] = useState("/images/404error.png");
  const [randomStyle, setRandomStyle] = useState("/images/404error.png");

  useEffect(() => {
    setIsRandomStyle(styleTab === 1);
    setIsRandomContent(contentTab === 1);
  }, [contentTab, styleTab]);

  const handleContentTab = (e, newValue) => {
    setContentTab(newValue);
  };

  const handleStyleTab = (e, newValue) => {
    setStyleTab(newValue);
  };

  const handleClose = () => setOpen(false);

  const onChangeContent = async () => {
    const API_URL = "/api/transfer/content";
    await axios.get(API_URL).then((res) => {
      const img_url = `${BASE_URL}${res.data}`;
      setRandomContent(img_url);
    });
  };

  const onChangeStyle = async () => {
    const API_URL = "/api/transfer/style";
    await axios.get(API_URL).then((res) => {
      const img_url = `${BASE_URL}${res.data}`;
      setRandomStyle(img_url);
    });
  };

  // TODO : 랜덤이미지 주소 변경
  const isValidUserInput = () => {
    if (contentTab === 1 && randomContent === "/images/404error.png") {
      setErrorMsg(inputErrorMsgs.CHOOSE_CONTENT);
      setOpen(true);
      return false;
    }

    if (contentTab === 0 && contentImg === undefined) {
      setErrorMsg(inputErrorMsgs.UPLOAD_CONTENT);
      setOpen(true);
      return false;
    }

    if (styleTab === 1 && randomStyle === "/images/404error.png") {
      setErrorMsg(inputErrorMsgs.CHOOSE_STYLE);
      setOpen(true);
      return false;
    }

    if (styleTab === 0 && styleImg === undefined) {
      setErrorMsg(inputErrorMsgs.UPLOAD_STYLE);
      setOpen(true);
      return false;
    }

    return true;
  };

  const onSubmitStylize = useCallback(async (e) => {
    e.preventDefault();

    if (!isValidUserInput()) {
      return;
    }

    const formData = new FormData();
    formData.append("content_file", contentImg || new File([], "default"));
    formData.append("style_file", styleImg || new File([], "default"));
    formData.append("random_content_name", randomContent);
    formData.append("random_style_name", randomStyle);
    formData.append("is_random_content", isRandomContent);
    formData.append("is_random_style", isRandomStyle);

    setErrorMsg("");
    setIsLoading(true);
    setIsResultReady(false);

    const response = await axios.post("/api/transfer", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setIsLoading(false);
    setIsResultReady(true);
    setPaintingId(response.data.painting_id);
    setResult(`${BASE_URL}${response.data.transfer_image_path}`);
  });

  const onClickEnroll = useCallback(async () => {
    const API_URL = `/api/transfer/create?painting_id=${Number(paintingId)}`;
    await axios.put(API_URL);
  });

  return (
    <ResultSection>
      <TitleContainer>
        <h1>Style Transfer</h1>
        <h3>
          스타일 이미지의 특성을 분석하고 이를 사용자 사진에 적용하여 새로운
          예술 작품을 만듭니다.
        </h3>
      </TitleContainer>
      <Divider />
      <UploadWrapper>
        {errorMsg && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            {/* TODO: 은열님 모달 수정한 거 보고 맞출 것 */}
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
        <div>
          <UploadTitle>Photo</UploadTitle>
          <Box>
            <Box>
              <TabMenu value={contentTab} onChange={handleContentTab} />
            </Box>
            <TabPanel value={contentTab} index={0}>
              <UploadContainer>
                <Upload
                  file={contentImg}
                  setFile={setContentImg}
                  previewSrc={contentPreview}
                  setPreviewSrc={setContentPreview}
                  isPreviewAvailable={isContentPreview}
                  setIsPreviewAvailable={setIsContentPreview}
                  errorMsg={errorMsg}
                  setErrorMsg={setErrorMsg}
                  setOpen={setOpen}
                />
              </UploadContainer>
            </TabPanel>
            <TabPanel value={contentTab} index={1}>
              <RandomContainer>
                <img src={randomContent} />
                <button onClick={onChangeContent}>
                  <RandomIcon
                    autoplay
                    loop
                    src="https://assets4.lottiefiles.com/packages/lf20_3Pg4c8.json"
                  />
                </button>
              </RandomContainer>
            </TabPanel>
          </Box>
        </div>
        <div>
          <UploadTitle>Style</UploadTitle>
          <Box>
            <Box>
              <TabMenu value={styleTab} onChange={handleStyleTab} />
            </Box>
            <TabPanel value={styleTab} index={0}>
              <UploadContainer>
                <Upload
                  file={styleImg}
                  setFile={setStyleImg}
                  previewSrc={stylePreview}
                  setPreviewSrc={setStylePreview}
                  isPreviewAvailable={isStylePreview}
                  setIsPreviewAvailable={setIsStylePreview}
                  errorMsg={errorMsg}
                  setErrorMsg={setErrorMsg}
                  setOpen={setOpen}
                />
              </UploadContainer>
            </TabPanel>
            <TabPanel value={styleTab} index={1}>
              <RandomContainer>
                <img src={randomStyle} />
                <button onClick={onChangeStyle}>
                  <RandomIcon
                    autoplay
                    loop
                    src="https://assets4.lottiefiles.com/packages/lf20_3Pg4c8.json"
                  />
                </button>
              </RandomContainer>
            </TabPanel>
          </Box>
        </div>
      </UploadWrapper>
      <BtnContainer>
        {isLoading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <>
            <ResultBtn endIcon={<ArrowForwardIos />} onClick={onSubmitStylize}>
              STYLIZE
            </ResultBtn>
          </>
        )}
      </BtnContainer>
      <Divider />
      {!isLoading && isResultReady && (
        <TransferResult
          before={isRandomContent ? randomContent : contentPreview}
          after={result}
          onClick={onClickEnroll}
        />
      )}
    </ResultSection>
  );
}

const ResultSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 4.2rem 0;
`;

const TitleContainer = styled.header`
  padding: 0 7vw;
  padding-bottom: 2rem;

  h1 {
    font-size: 5rem;
    font-weight: 800;
    @media only screen and (max-width: 45rem) {
      font-size: 2.8rem;
    }
  }

  h3 {
    font-size: 1.2rem;
  }

  hr {
    margin-top: 1.4vh;
    border: 0;
    border-top: 3px solid black;
  }
`;

const Divider = styled.hr`
  border: 0;
  border-top: 3px solid black;
  width: 86%;
`;

const UploadWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  & > div:first-child {
    margin-right: 10em;
  }

  @media only screen and (max-width: 45rem) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > div:first-child {
      margin-right: 0;
    }
  }
`;

const UploadContainer = styled.div`
  margin-top: 2vh;
`;

const UploadTitle = styled.h3`
  font-size: 2rem;
  text-align: center;
  font-weight: medium;
`;

const RandomContainer = styled.div`
  width: 25vw;
  height: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vh;
  margin-bottom: 20px;
  border-radius: 20px;

  background: white;
  opacity: 1;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: auto;
  }

  button {
    transform: translateY(100%);
    border: 0;
    outline: 0;
    background-color: transparent;
    cursor: pointer;
  }

  & > div:first-child {
    margin-right: 0;
  }

  @media only screen and (max-width: 45rem) {
    width: 60vw;
    height: 50vh;
  }
`;

const RandomIcon = styled(Player)`
  width: 35%;
  height: 35%;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  margin-bottom: 5vh;
`;

const ResultBtn = styled(Button)`
  background: black;
  border-radius: 50px;
  border: 3px solid black;
  width: 8rem;
  height: 2.8rem;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :hover {
    background: rgba(0, 0, 0, 0.8);
    border: 3px solid transparent;
    transform: scale(1.1);
  }
  span {
    font-size: 1rem;
    line-height: 1.4rem;
    font-weight: 800;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-bottom: 1.6vh;
`;

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
