import styled from "styled-components";

function Test() {
  const sortArr = [
    ["Picasso", 99.3],
    ["Gogh", 87.2],
    ["Gogang", 31.2],
    ["Davinchi", 20.5],
    ["Nyeol", 0],
  ];
  return (
    <>
      {sortArr && (
        <div
          style={{
            width: "1000px",
            height: "300px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {sortArr.map((sort, idx) => (
            <Circular
              size={sort[1]}
              idx={idx}
              colors={["#ebc8f6", "#edc3d8", "#d1c9e9", "#dce4f2", "#feddc8"]}
            >
              <h1>{sort[0]}</h1>
              <h3>{sort[1]} %</h3>
            </Circular>
          ))}
        </div>
      )}
    </>
  );
}

export default Test;

const Circular = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  background: ${(props) => props.colors[props.idx]};
  animation: bounceInUp;
  animation-duration: ${(props) => props.idx + 1}s;
  transition: all 0.5s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: ${(props) => props.size / 5}vw;
  height: ${(props) => props.size / 5}vw;
  :hover {
    transform: scale(1.1);
  }
`;
