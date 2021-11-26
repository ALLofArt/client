import CountUp from "react-countup";
import styled from "styled-components";

export default function AnalysisResult({ sortArr }) {
  return (
    <Container>
      {sortArr && (
        <>
          <div>
            <span style={{ fontSize: "80px" }}>{sortArr[0][0]} </span>
            <CountUp
              start={0.0}
              end={sortArr[0][1]}
              duration={2.5}
              decimals={1}
              decimal="."
              onEnd={() => console.log("Ended! 👏")}
              onStart={() => console.log("Started! 💨")}
              style={{ fontSize: "100px" }}
            />
            <span style={{ fontSize: "80px" }}> %</span>
          </div>
          <p>
            당신의 그림은 화가 {sortArr[0][0]}의 화풍과 {sortArr[0][1]}%
            유사합니다.
          </p>
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
