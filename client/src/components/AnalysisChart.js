import styled from "styled-components";

export default function AnalysisChart({ sortArr }) {
  return (
    <>
      {sortArr && (
        <Container>
          {sortArr.map((sort, idx) => (
            <Circular
              size={sort[1]}
              idx={idx}
              key={sort[0]}
              length={sortArr.length}
              colors={["#FFD005", "#B39102", "#FFD51F", "#383BB3", "#5C5FFF"]}
            >
              <h1>{sort[0]}</h1>
              <h3>{sort[1]} %</h3>
            </Circular>
          ))}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  height: 23vw;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Circular = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  background: ${(props) => props.colors[props.idx]};
  animation: bounceInUp;
  animation-duration: ${(props) => 5 - props.idx}s;
  transition: all 0.5s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: ${(props) => (props.size < 20 ? 4 : props.size / 5)}vw;
  height: ${(props) => (props.size < 20 ? 4 : props.size / 5)}vw;
  font-size: ${(props) => props.size / 5}px;
  color: #fff;
  :hover {
    cursor: pointer;
    transform: scale(${(props) => (props.size < 20 ? 1.3 : 1.1)});
  }
`;
