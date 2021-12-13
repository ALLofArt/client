import styled from "styled-components";
import { useEffect } from "react";
import GalleryImgListComponent from "../src/components/gallery/GalleryImgListComponent";
import axios from "axios";
import { useImgState, useImgDispatch } from "../store/reducer";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Gallery() {
  const duration_list = ["all", "month", "week", "day"];
  const sortBy_list = ["date", "download"];
  const dispatch = useImgDispatch();
  const state = useImgState();
  useEffect(() => {
    state.page === 1 && dispatch({ type: "HAS_MORE", payload: true });
    sendQuery();
  }, [state.page, state.duration, state.sortBy]);

  const sendQuery = async () => {
    const URL = `/api/gallery?duration=${state.duration}&sort_by=${state.sortBy}&page=${state.page}`;

    try {
      dispatch({ type: "IS_LOADING", payload: true });
      if (!state.hasMore) return;
      await axios
        .get(URL, {
          timeout: 4000,
        })
        .then((response) => {
          if (response.data === "no content") {
            dispatch({ type: "HAS_MORE", payload: false });
          } else {
            dispatch({
              type: "HAS_MORE",
              payload: response.data.length > 0,
            });
            dispatch({ type: "IS_LOADING", payload: false });
            dispatch({
              type: "SET_IMAGES",
              payload: response.data,
            });
          }
        });
    } catch (e) {
      dispatch({ type: "HAS_MORE", payload: false });
      dispatch({ type: "IS_LOADING", payload: false });
    }
  };
  return (
    <Wrapper>
      <Title>Gallery</Title>
      <Explain>Let's See Others' Artworks and Download What you want! </Explain>

      <Audio>
        <audio controls src="/music/bgm.mp3">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </Audio>
      <Hr />
      <FilterWrapper>
        <Filter>
          기간:
          {duration_list.map((ele, index) => (
            <button
              key={index}
              onClick={() => dispatch({ type: "DURATION", payload: ele })}
            >
              {ele}
            </button>
          ))}
        </Filter>
        <Filter>
          정렬:
          {sortBy_list.map((ele, index) => (
            <button
              onClick={() => dispatch({ type: "SORT_BY", payload: ele })}
              key={index}
            >
              {ele}
            </button>
          ))}
        </Filter>
      </FilterWrapper>
      <h1 style={{ textAlign: "center" }}>
        {state.duration},{state.sortBy}
      </h1>

      <GalleryImgListComponent />
      {state.hasMore && state.isLoading && (
        <>
          <Animation
            src="https://assets2.lottiefiles.com/packages/lf20_oeeo5l2t.json"
            background="transparent"
            speed="1"
            loop
            controls
            autoplay
          />
        </>
      )}

      <style jsx global>
        {`
          body::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </Wrapper>
  );
}
const Title = styled.h1`
  font-size: 7rem;
  width: 100%;
  text-align: center;
`;

const Audio = styled.div`
  float: right;
`;

const Hr = styled.hr`
  background: #000;
  height: 3px;
  margin: 5vh 5vw;
  padding: 0;
  border: 0;
`;

const Explain = styled.h2`
  text-align: center;
`;

const FilterWrapper = styled.div``;

const Filter = styled.div`
  button {
    background-color: white;
  }
`;

const Wrapper = styled.div`
  padding-top: 12vh;
`;

const Animation = styled(Player)`
  width: 45rem;
  height: 45rem;
`;
