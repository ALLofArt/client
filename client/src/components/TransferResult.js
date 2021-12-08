import styled from "styled-components";
import ReactCompareImage from "react-compare-image";

export default function TransferResult({ before, after, onClick }) {
  return (
    <div>
      <ResultTitle>Result</ResultTitle>
      <ResultContainer>
        <CompareContainer>
          <ReactCompareImage leftImage={before} rightImage={after} />
        </CompareContainer>
        <ResultDesc>
          <p>변환된 결과가 만족스러우신가요?</p>
          <p>갤러리에 등록해 자랑해보세요.</p>
          <p>클릭 한 번이면 자동으로 등록됩니다.</p>
          <button onClick={onClick}>
            <span>갤러리에 등록하기</span>
          </button>
        </ResultDesc>
      </ResultContainer>
    </div>
  );
}

const ResultTitle = styled.h1`
  padding: 0 6vw;
  margin-bottom: 4vh;
  font-weight: medium;
  font-size: 2.6rem;
  font-family: "Noto Sans", sans-serif;
`;

const ResultContainer = styled.section`
  display: flex;
  justify-content: space-evenly;
`;

const CompareContainer = styled.div`
  width: 25vw;
  height: auto;
`;

const ResultDesc = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  p {
    font-weight: semi-bold;
    font-size: 1.6rem;
    font-family: "Noto Sans KR", sans-serif;
    margin-bottom: 1vh;
  }

  button {
    margin-top: 2vh;
    background: black;
    border-radius: 50px;
    border: 3px solid black;
    width: 16rem;
    height: 2.8rem;
    color: white;
    text-align: center;
    cursor: pointer;

    span {
      font-weight: 500;
      font-size: 1.5rem;
      font-family: "Noto Sans KR", sans-serif;
    }
  }
`;
