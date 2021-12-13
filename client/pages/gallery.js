import styled from "styled-components";
import { useEffect } from "react";
import GalleryImgListComponent from "../src/components/gallery/GalleryImgListComponent";
import axios from "axios";
import { useImgState, useImgDispatch } from "../store/reducer";
import * as Style from "../styles/CommonStyle";

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
    if (state.hasMore) {
      try {
        await axios
          .get(URL, {
            timeout: 2000,
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
      }
    }
  };
  return (
    <Style.Container>
      <Style.SectionContainer>
        <Style.GridRow>
          <Style.Title>Gallery</Style.Title>
        </Style.GridRow>
        <Style.IntroWrapper rows>
          <Style.Markdown>
            <Style.HeaderIntro>
              Let's See Others' Artworks and Download What you want!
            </Style.HeaderIntro>
          </Style.Markdown>
          <Audio>
            <audio controls src="/music/bgm.mp3" style={{ width: 270 }}>
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </Audio>
        </Style.IntroWrapper>
      </Style.SectionContainer>

      {/* <Audio>
        <audio controls src="/music/bgm.mp3">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </Audio> */}
      <Style.SectionContainer>
        <Style.Hr />
      </Style.SectionContainer>
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

      <style jsx global>
        {`
          body::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </Style.Container>
  );
}
const Title = styled.h1`
  font-size: 7rem;
  width: 100%;
  text-align: center;
`;

const Audio = styled.div`
  grid-column: 9 / span 2;
  justify-items: end;
  @media only screen and (max-width: 64rem) {
    grid-column: 1 / span 7;
    grid-row: 2;
    margin-top: 0.5rem;
  }
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
