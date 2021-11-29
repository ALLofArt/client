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
              <span style={{ fontSize: "4em" }}>{sortArr[0][0]} </span>
              <CountUp
                start={0.0}
                end={sortArr[0][1]}
                duration={2.5}
                decimals={1}
                decimal="."
                onEnd={() => console.log("Ended! 👏")}
                onStart={() => console.log("Started! 💨")}
                style={{ fontSize: "5em" }}
              />
              <span style={{ fontSize: "4em" }}> %</span>
            </strong>
          </div>
          <div style={{ height: "3vw" }}>
            {result && (
              <h2>
                당신의 그림은 화가 {sortArr[0][0]}의 화풍과 {sortArr[0][1]}%
                유사합니다.
              </h2>
            )}
          </div>
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
