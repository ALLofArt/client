import styled from "styled-components";

export default function TransferResult({ result }) {
  console.log(result);
  return (
    <div>
      <ResultTitle>결과</ResultTitle>
      <ResultImg src={result} />
    </div>
  );
}

const ResultTitle = styled.h1`
  text-align: center;
`;

const ResultImg = styled.img`
  width: 50vw;
  height: 50wh;
`;
