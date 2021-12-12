import React, { useState, useRef } from "react";
import useImgFetch from "./useImgFetch";
import styled from "styled-components";
import GalleryImgBox from "./GalleryImgBox";
import { useEffect } from "react";
import GalleryImgModal from "./GalleryImgModal";
import axios from "axios";
import { saveAs } from "file-saver";
import apiUrl from "../../../lib/api";

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

  useEffect(() => {
    setPageNum(1);
  }, [duration, sortBy]);

  const observer = (node) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        setPageNum((page) => page + 1);
      }
    }, options);

    node && observerRef.current.observe(node);
  };

  const handleOpen = (
    result_img_url,
    content_img_url,
    style_img_url,
    download,
    result_img_id,
  ) => {
    setOpen(true);
    setModalData({
      result_img_url,
      content_img_url,
      style_img_url,
      download,
      result_img_id,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [modalData, setModalData] = useState({
    result_img_id: "",
    content_img_url: "",
    style_img_url: "",
    result_img_url: "",
    download: "",
  });

  const saveFile = async (result_img_id) => {
    const data = await axios.get(`/api/gallery/download/${result_img_id}`);
    console.log(data);
    if (confirm("Do you want to download the photo?") == true) {
      saveAs(`${apiUrl}:5000${data.data.image_url}`, `${result_img_id}.jpg`);
      setModalData({ ...modalData, download: data.data.download });
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Boxes>
        {images
          ? images.map(
              (
                {
                  content_img_url,
                  result_img_url,
                  style_img_url,
                  download,
                  result_img_id,
                },
                index,
              ) => (
                <div key={result_img_id}>
                  {hover ? <Layer /> : null}
                  <div
                    onMouseEnter={() => {
                      setHover(true);
                      // console.log("hover", hover);
                    }}
                  >
                    <GalleryImgBox
                      result_img_id={result_img_id}
                      handleOpen={() =>
                        handleOpen(
                          result_img_url,
                          content_img_url,
                          style_img_url,
                          download,
                          result_img_id,
                        )
                      }
                      result_img_url={result_img_url}
                      content_img_url={content_img_url}
                      style_img_url={style_img_url}
                      download={download}
                      saveFile={saveFile}
                      num={index + 1}
                    />
                  </div>
                </div>
              ),
            )
          : null}
      </Boxes>

      <GalleryImgModal
        open={open}
        handleClose={handleClose}
        modalData={modalData}
        saveFile={saveFile}
      />
      <div ref={observer} />
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
