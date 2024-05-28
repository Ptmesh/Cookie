import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #0a1128;
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  &:hover {
    cursor: pointer;
    color: white;
    transition: all 0.5s ease;
  }
`;
const MaterialIcon = styled.div`
  display: flex;
  flex-direction: flex-end;
`;
const PageName = styled.div`
  padding: 10px;
`;
const Item = (props) => {
  return (
    <Container>
      <MaterialIcon>{props.icon}</MaterialIcon>
      <PageName>{props.name}</PageName>
    </Container>
  );
};

export default Item;
