import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { saveAs } from "file-saver";
import { Modal, Box, Typography } from "@material-ui/core";
import GalleryImgBox from "../src/components/GalleryImgBox";
export default function Gallery() {
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [paintingId, setPaintingId] = useState(null);
  // const [downloadImg, setDownloadImg] = useState();
  const [downloadNum, setDownloadNum] = useState();
  const [modalData, setModalData] = useState({
    painting_id: "",
    content: "",
    style: "",
    result: "",
    download: "",
  });

  useEffect(() => {
    Images(page);
  }, [page]);

  // const saveFile = (painting_id) => {
  //   saveAs(
  //     downloadImg,
  //     `${painting_id}.jpg`,
  //   );
  // };

  const saveFile = async (painting_id) => {
    const data = await axios.get(`/api/gallery/download/${painting_id}`);
    console.log(data.data.image_url);
    // setDownloadImg(data.data);
    if (confirm("Do you want to download the photo?") == true) {
      saveAs(data.data.image_url, `${painting_id}.jpg`);
      setModalData({ ...modalData, download: data.data.download });
    } else {
    }
  };
  const Images = async () => {
    const data = await axios.get(`/api/gallery?page=${page}`);
    setImages(data.data);
    console.log(data.data);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (result, content, style, download, painting_id) => {
    setOpen(true);
    setModalData({ result, content, style, download, painting_id });
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MarginTop />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: 300,
            height: 300,
            backgroundColor: "white",
            margin: "auto",
            "&:hover": {
              backgroundColor: "gray",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <div onClick={handleClose}>x</div>
          {modalData.result ? (
            <GalleryImgBox
              result={modalData.result}
              content={modalData.content}
              style={modalData.style}
              download={modalData.download}
            />
          ) : null}
          <button
            style={{
              width: "100px",
              height: "100px",
              border: "solid 1px blue",
              fontSize: "10px",
            }}
            onClick={() => {
              saveFile(modalData.painting_id);
            }}
          >
            다운로드
          </button>
        </Box>
      </Modal>

      <Title>Gallery</Title>
      <Audio>
        <audio controls src="/music/bgm.mp3">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </Audio>
      <Boxes>
        {images
          ? images.map(
              ({
                content,
                result,
                style,
                created_at,
                download,
                painting_id,
              }) => (
                <GalleryImgBox
                  painting_id={painting_id}
                  handleOpen={() =>
                    handleOpen(result, content, style, download, painting_id)
                  }
                  result={result}
                  content={content}
                  style={style}
                  download={download}
                  saveFile={saveFile}
                />
              ),
            )
          : null}
      </Boxes>
    </div>
  );
}
const Title = styled.div`
  font-size: 5rem;
  width: 100%;
  text-align: center;
`;

const MarginTop = styled.div`
  margin-top: 10vh;
`;

const Audio = styled.div``;

const BoxWrapper = styled.div`
  border: solid 1px red;
`;

const ImageCard = styled.div``;

const Boxes = styled.div`
  border: solid 1px black;
  background-color: transparent;
  display: grid;
  grid-template-rows: 400px 400px 400px;
  grid-template-columns: 600px 600px 600px;
`;
