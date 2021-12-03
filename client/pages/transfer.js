import { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  Button,
  Typography,
  Modal,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { Casino, ArrowForwardIos } from "@material-ui/icons";
import { inputErrorMsgs } from "../src/constants/Msgs";
import Upload from "../src/components/Upload";
import TabPanel from "../src/components/TabPanel";
import TabMenu from "../src/components/TabMenu";
import TransferResult from "../src/components/TransferResult";

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
  const [isResultReady, setIsResultReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(undefined);
  // for tab
  const [contentTab, setContentTab] = useState(1);
  const [styleTab, setStyleTab] = useState(0);
  // TODO: api 완성 후 변경 / random image url
  const [randomContent, setRandomContent] = useState("/images/404error.png");
  const [randomStyle, setRandomStyle] = useState("/images/404error.png");

  const handleContentTab = (e, newValue) => {
    setContentTab(newValue);
  };

  const handleStyleTab = (e, newValue) => {
    setStyleTab(newValue);
  };

  const handleClose = () => setOpen(false);

  // TODO : URL 변경
  const onChangeContent = () => {
    const API_URL = `http://makeup-api.herokuapp.com/api/v1/products/798.json`;
    axios.get(API_URL).then((res) => {
      setRandomContent(
        "https://upload.wikimedia.org/wikipedia/commons/b/b8/Portrait_de_Picasso%2C_1908.jpg",
      );
    });
  };

  // TODO : URL 변경
  const onChangeStyle = () => {
    const API_URL = `http://makeup-api.herokuapp.com/api/v1/products/798.json`;
    axios
      .get(API_URL)
      .then((res) =>
        setRandomStyle(
          "https://upload.wikimedia.org/wikipedia/commons/b/b8/Portrait_de_Picasso%2C_1908.jpg",
        ),
      );
  };

  // TODO : 랜덤이미지 주소 변경
  const isValidUserInput = () => {
    if (contentTab === 0 && randomContent === "/images/404error.png") {
      setErrorMsg(inputErrorMsgs.CHOOSE_CONTENT);
      setOpen(true);
      return false;
    }

    if (contentTab === 1 && contentImg === undefined) {
      setErrorMsg(inputErrorMsgs.UPLOAD_CONTENT);
      setOpen(true);
      return false;
    }

    if (styleTab === 0 && randomStyle === "/images/404error.png") {
      setErrorMsg(inputErrorMsgs.CHOOSE_STYLE);
      setOpen(true);
      return false;
    }

    if (styleTab === 1 && styleImg === undefined) {
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
    // TODO : random 부분 변경
    if (styleTab === 0) {
      formData.append("style_file", randomStyle);
    } else if (styleTab === 1) {
      formData.append("style_file", styleImg);
    }
    if (contentTab === 0) {
      formData.append("content_file", randomContent);
    } else if (contentTab === 1) {
      formData.append("content_file", contentImg);
    }

    setErrorMsg("");
    setIsLoading(true);

    // TODO : URL 상수화할 것
    const response = await axios.post(
      `http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com:5000/api/transfer`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    setIsLoading(false);
    setIsResultReady(true);
    setResult(response.data.transfer_image_path);
  });

  return (
    <ResultSection>
      <TitleContainer>
        <TitleTypo>Change your painting style</TitleTypo>
        <h2>내가 그린 그림을 원하는 스타일로 변경해보세요.</h2>
      </TitleContainer>
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
          {/* TODO: styled component로 전환 */}
          <h1 style={{ "text-align": "center" }}>Content</h1>
          <Box>
            <Box>
              <TabMenu value={contentTab} onChange={handleContentTab} />
            </Box>
            <TabPanel value={contentTab} index={0}>
              <RandomContainer>
                <img src={randomContent} />
                <Button
                  size="large"
                  endIcon={<Casino />}
                  onClick={onChangeContent}
                />
              </RandomContainer>
            </TabPanel>
            <TabPanel value={contentTab} index={1}>
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
            </TabPanel>
          </Box>
        </div>
        <div>
          {/* TODO: styled component로 전환 */}
          <h1 style={{ "text-align": "center" }}>Style</h1>
          <Box>
            <Box>
              <TabMenu value={styleTab} onChange={handleStyleTab} />
            </Box>
            <TabPanel value={styleTab} index={0}>
              <RandomContainer>
                <img src={randomStyle} />
                <Button
                  size="large"
                  endIcon={<Casino />}
                  onClick={onChangeStyle}
                />
              </RandomContainer>
            </TabPanel>
            <TabPanel value={styleTab} index={1}>
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
            </TabPanel>
          </Box>
        </div>
      </UploadWrapper>
      <Button
        variant="contained"
        size="large"
        endIcon={<ArrowForwardIos />}
        type="submit"
        onClick={onSubmitStylize}
      >
        <strong>Stylize</strong>
      </Button>
      {isLoading && (
        // TODO: Box style 설정법 찾아서 수정
        <Box sx={{ position: "relative", top: "40%" }}>
          <CircularProgress />
        </Box>
      )}
      {result && <TransferResult before={contentPreview} after={result} />}
      <Empty />
    </ResultSection>
  );
}

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

const ResultSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 7vh;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
`;

const TitleTypo = styled.h1`
  font-size: 4rem;
`;

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2vh;
  position: relative;

  & > div:first-child {
    margin-right: 3em;
  }
`;

const RandomContainer = styled.div`
  width: 25vw;
  height: 25vw;
  display: flex;
  background: #fff;
  border-radius: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 1;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    width: 70%;
    height: 70%;
  }
`;

// TODO : footer 해결되면 없앨 것
const Empty = styled.div`
  margin-top: 10vh;
  margin-bottom: 10vh;
`;
