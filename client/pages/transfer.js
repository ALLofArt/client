import { Button, Typography, Modal, Box } from "@material-ui/core";
import { Casino, Send } from "@material-ui/icons";
import { useState, useCallback } from "react";
import styled from "styled-components";
import Axios from "axios";
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
  // tab
  const [contentTab, setContentTab] = useState(1);
  const [styleTab, setStyleTab] = useState(0);
  // random image url 관리
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
    Axios.get(API_URL).then((res) => setRandomContent(res.data.image_link));
  };

  const onChangeStyle = () => {
    const API_URL = `http://makeup-api.herokuapp.com/api/v1/products/798.json`;
    Axios.get(API_URL).then((res) => setRandomStyle(res.data.image_link));
  };

  // TODO : 에러 메시지 상수화
  const isValidUserInput = () => {
    if (contentTab === 0 && randomContent === "/images/404error.png") {
      setErrorMsg("Content Image를 선택해주세요 😢");
      setOpen(true);
      return false;
    }

    if (contentTab === 1 && contentImg === undefined) {
      setErrorMsg("Content Image를 업로드해주세요 😢");
      setOpen(true);
      return false;
    }

    if (styleTab === 0 && randomStyle === "/images/404error.png") {
      setErrorMsg("Style Image를 선택해주세요 😢");
      setOpen(true);
      return false;
    }

    if (styleTab === 1 && styleImg === undefined) {
      setErrorMsg("Style Image를 업로드해주세요 😢");
      setOpen(true);
      return false;
    }

    return true;
  };

  const onClickStylize = useCallback(async (e) => {
    if (!isValidUserInput()) {
      return;
    }
    setIsLoading(true);
    setErrorMsg("");
    // API 결과 반환 후
    setIsLoading(false);
    setIsResultReady(true);
    setResult("/images/404error.png");
  });

  return (
    <ResultWrapper>
      <Container>
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

        <div>
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
      </Container>
      <Button
        size="large"
        endIcon={<Send />}
        type="button"
        onClick={onClickStylize}
      >
        <strong>Stylize</strong>
      </Button>
      {isLoading && <div>Loading</div>}
      {isResultReady && <TransferResult result={result} />}
    </ResultWrapper>
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

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10vh;
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
