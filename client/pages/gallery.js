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

  const saveFile = async (painting_id) => {
    const data = await axios.get(`/api/gallery/download/${painting_id}`);
    console.log(data);
    if (confirm("Do you want to download the photo?") == true) {
      saveAs(data.data.image_url, `${painting_id}.jpg`);
      setModalData({ ...modalData, download: data.data.download });
    }
  };
  const Images = async () => {
    const data = await axios.get(`/api/gallery?page=${page}`);
    setImages(data.data);
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
        sx={{
          position: "relative",
          height: "25%",
        }}
      >
        <Box
          sx={{
            width: "90vw",
            height: "80vh",
            backgroundColor: "white",
            position: "absolute",
            top: "10vh",
            left: "5vw",
            paddingLeft: "10vw",
            "media only screen and (max-width: 45rem)": {
              height: "30vh",
            },

            "&:hover": {
              backgroundColor: "gray",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "4em" }}>
            <div
              style={{ float: "right", width: "3rem", fontSize: "3em" }}
              onClick={handleClose}
            >
              x
            </div>
          </div>
          <div style={{ width:"",display: "flex", flexDirection:"column", alignItems:"center", float:"left"}}>
            {modalData.result ? (
              <ModalImgBox>
                <GalleryImgBox
                  result={modalData.result}
                  content={modalData.content}
                  style={modalData.style}
                  download={modalData.download}
                />
              </ModalImgBox>
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
          </div>
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
                  key={painting_id}
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
      <style jsx global>
        {`
          body::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
const Title = styled.div`
  font-size: 7vw;
  width: 100%;
  text-align: center;
`;

const MarginTop = styled.div`
  margin-top: 10vh;
`;

const Audio = styled.div``;

const Boxes = styled.div`
  background-color: transparent;
  margin: 0 10vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 10ch;
  column-gap: 10ch;
  @media only screen and (max-width: 64rem) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 45rem) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ModalImgBox = styled.div`
  width: 20vw;
  @media only screen and (max-width: 120rem) {
    width: 30vw;
  }
  @media only screen and (max-width: 60rem) {
    width: 40vw;
  }
  @media only screen and (max-width: 35rem) {
    width: 50vw;
  }
`;
