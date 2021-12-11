import styled from "styled-components";
import { useState, useEffect } from "react";
import GalleryImgListComponent from "../src/components/gallery/GalleryImgListComponent";

export default function Gallery() {
  const [duration, setDuration] = useState("day");
  const [sortBy, setSortBy] = useState("download");

  const duration_list = ["all", "month", "week", "day"];
  const sortBy_list = ["date", "download"];
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
            <button key={index} onClick={() => setDuration(ele)}>
              {ele}
            </button>
          ))}
        </Filter>
        <Filter>
          정렬:
          {sortBy_list.map((ele, index) => (
            <button onClick={() => setSortBy(ele)} key={index}>
              {ele}
            </button>
          ))}
        </Filter>
      </FilterWrapper>
      <h1 style={{ textAlign: "center" }}>
        {duration},{sortBy}
      </h1>
      <GalleryImgListComponent duration={duration} sortBy={sortBy} />
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
