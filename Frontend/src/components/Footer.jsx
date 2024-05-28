import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  background-color: #0a1128;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Footer = () => {
  return <Container>Prathmesh Takalkar @{new Date().getFullYear()} </Container>;
};

export default Footer;
