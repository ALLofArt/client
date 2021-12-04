import React, { useState, useRef } from "react";
import useImgFetch from "./useImgFetch";
import styled from "styled-components";
import GalleryImgBox from "./GalleryImgBox";
import { useEffect } from "react";
import GalleryImgModal from "./GalleryImgModal";
import axios from "axios";
import { saveAs } from "file-saver";

export default function GalleryImgListComponent({ duration, sortBy }) {
  const [pageNum, setPageNum] = useState(1);
  const { images, hasMore, isLoading } = useImgFetch(pageNum, duration, sortBy);
  const [hover, setHover] = useState("false");
  const observerRef = useRef();
  const options = {
    root: null,
    rootMargin: "10px",
    threshold: 0,
  };

  useEffect(() => console.log(images), []);

  const observer = (ele) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        setPageNum((page) => page + 1);
      }
    }, options);
    ele && observerRef.current.observe(ele);
  };

  const handleOpen = (result, content, style, download, painting_id) => {
    setOpen(true);
    setModalData({ result, content, style, download, painting_id });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [modalData, setModalData] = useState({
    painting_id: "",
    content: "",
    style: "",
    result: "",
    download: "",
  });

  const saveFile = async (painting_id) => {
    const data = await axios.get(`/api/gallery/download/${painting_id}`);
    if (confirm("Do you want to download the photo?") == true) {
      saveAs(data.data.image_url, `${painting_id}.jpg`);
      setModalData({ ...modalData, download: data.data.download });
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <>
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
                <div>
                  {hover ? <Layer /> : null}
                  <div
                    onMouseEnter={() => {
                      setHover(true);
                      console.log("hover", hover);
                    }}
                  >
                    <GalleryImgBox
                      painting_id={painting_id}
                      handleOpen={() =>
                        handleOpen(
                          result,
                          content,
                          style,
                          download,
                          painting_id,
                        )
                      }
                      result={result}
                      content={content}
                      style={style}
                      download={download}
                      saveFile={saveFile}
                    />
                  </div>
                </div>
              ),
            )
          : null}
          </Boxes>
          <GalleryImgModal open={open} handleClose={handleClose} modalData={modalData} saveFile={saveFile} />
      <div ref={observer} />
      <div>{isLoading ? <Loading /> : "No More Data"} </div>

    </>
  );
}

const Loading = styled.div`
  fontweight: 600;
`;
const Boxes = styled.div`
  background-color: transparent;
  margin: 0 10vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 7ch;
  column-gap: 7ch;
  @media only screen and (max-width: 64rem) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 45rem) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const Layer = styled.div`
  width: 1fr;
  height: 10%;
  position: absolute;
  background-color: red;
  opacity: 1;
  z-index: 3;
`;
