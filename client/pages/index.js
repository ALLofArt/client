import styles from "../styles/Home.module.css";
import Card from "../src/components/cardbox/Card";
import styled  from "styled-components";

const Cards = styled.div`
  display : flex;
  margin-top : 0;
  justify-content: space-evenly;
`;


export default function Home() {
  return (
    <Cards>
      
      <Card />
      <Card />
      <Card />
      <Card />
    </Cards>
  );
}
