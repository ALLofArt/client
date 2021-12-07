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
// TODO: 임시 데이터 삭제하기
// TODO: 서버로부터 실제 데이터 받기
export default function analysis() {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [sortArr, setSortArr] = useState([
    ["Picasso", 99.9],
    ["Heezy", 80.8],
    ["Eunsun", 50.5],
    ["Hyeon", 5.8],
    ["Kiwon", 3],
  ]);
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg/800px-Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg",
  );
  const [parameter, setParameter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);
  const handleClose = () => setOpen(false);

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
          setSortArr(sortable);
          setImage(response.data.image_url);
          setParameter(response.data.painting_id);
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
    setFile(null);
    setSortArr(null);
    setPreviewSrc("");
    setIsPreviewAvailable(false);
  }, []);

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

  return (
    <Container>
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

      {isLoading ? (
        <Box sx={{ position: "relative", top: "40%" }}>
          <CircularProgress />
        </Box>
      ) : !sortArr ? (
        <>
          <TextBox>
            <Title>Look for the painter style</Title>
            <h2>내가 그린 그림을 업로드하고,</h2>
            <h2>
              내 그림이 어떤 유명한 화가의 화풍과 얼마나 유사한지 확인해보세요.
            </h2>
          </TextBox>
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
          <Button
            size="large"
            endIcon={<Send />}
            type="submit"
            onClick={onSubmit}
          >
            <strong>Analyze</strong>
          </Button>
        </>
      ) : (
        <>
          <TotalAnalysisData image={image} sortArr={sortArr} />
          <RetryButton endIcon={<Replay />} onClick={onRetry}>
            <strong>RETRY</strong>
          </RetryButton>
          <KakaoButton params={parameter} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
  height: 80vh;
  position: relative;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
`;

const RetryButton = styled(Button)`
  margin-top: 5vw;
`;

const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 4rem;
`;
