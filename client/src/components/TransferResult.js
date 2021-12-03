import styled from "styled-components";
import ReactCompareImage from "react-compare-image";
import { Button } from "@material-ui/core";
import { Send } from "@material-ui/icons";

export default function TransferResult({ before, after }) {
  return (
    <div>
      <ResultTitle>
        결과입니다! <br />
        다른 사람에게 자랑하고 싶다면 버튼을~
        <Button size="large" endIcon={<Send />}></Button>
      </ResultTitle>
      <CompareContainer>
        <ReactCompareImage leftImage={before} rightImage={after} />
      </CompareContainer>
    </div>
  );
}

const ResultTitle = styled.h1`
  text-align: center;
`;

const CompareContainer = styled.div`
  width: 25vw;
  height: 25wh;
`;
