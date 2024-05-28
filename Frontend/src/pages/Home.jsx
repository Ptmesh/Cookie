import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: #fff;
`;

const BrandName = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItem = styled(Link)`
  margin-left: 20px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: #ff9900;
  }
`;

const Content = styled.div`
  padding: 40px;
  text-align: center;
  background-color: #f5f5f5;
  min-height: 83vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  height: 80px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Container>
        <BrandName>Cookie</BrandName>
        <Navbar>
          <NavItem to="/login">Login</NavItem>
          <NavItem to="/register">Register</NavItem>
        </Navbar>
      </Container>

      <Content>
        <h1>Welcome to Cookie</h1>
        <p>
          Cookie is an amazing platform where you can explore various features
          and functionalities. Join us today to unlock a world of possibilities.
        </p>
      </Content>

      <Footer>&copy; {currentYear} Prathmesh Takalkar</Footer>
    </>
  );
};

export default Home;
