import styled from "styled-components";
import { Send } from "@material-ui/icons";
import { Button } from "@material-ui/core";

export default function TransferResult({ result }) {
  console.log(result);
  return (
    <div>
      {/* <h1>결과입니다! </h1>
      <h2>다른 사람에게 자랑하고 싶다면 버튼을~</h2>
      <Button size="large" endIcon={<ArrowCircleRight />} type="button">
        <strong>요기~</strong>
      </Button> */}
      <ResultTitle>
        결과입니다! <br />
        다른 사람에게 자랑하고 싶다면 버튼을~
        <Button size="large" endIcon={<Send />}></Button>
      </ResultTitle>
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
