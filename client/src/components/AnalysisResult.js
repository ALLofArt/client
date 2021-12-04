import { useState } from "react";
import CountUp from "react-countup";
import styled from "styled-components";

export default function AnalysisResult({ sortArr }) {
  const [result, setResult] = useState(false);
  if (sortArr) {
    setTimeout(() => {
      setResult(true);
    }, 3000);
  }
  return (
    <Container>
      {sortArr && (
        <>
          <div>
            <strong>
              <Span>
                {sortArr[0][0]}&nbsp;
                <NumberUp
                  start={0.0}
                  end={sortArr[0][1]}
                  duration={2.5}
                  decimals={1}
                  decimal="."
                />
                &nbsp;%
              </Span>
            </strong>
          </div>
          <SentBox>
            {result && (
              <h2>
                당신의 그림은 화가 {sortArr[0][0]}의 화풍과 {sortArr[0][1]} %
                유사합니다.
              </h2>
            )}
          </SentBox>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Span = styled.span`
  font-size: 4em;
`;

const NumberUp = styled(CountUp)`
  font-size: 5rem;
`;

const SentBox = styled.div`
  height: 3vw;
`;
