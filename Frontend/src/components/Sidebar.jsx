import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Coder from "../assets/coding.svg";
import Item from "./Item";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  background-color: #0a1128;
  color: white;
  height: 100vh; /* Full height */
  overflow-y: auto;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  color: white;
  background-color: #0077b6;
  height: 50px;
  border-radius: 0.25rem;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

const MenuItems = styled.div`
  width: 100%;
  overflow-y: auto;
  height: 60%;
`;

const SVGContainer = styled.img`
  height: 120px;
  width: 100%;
`;

const ItemContainer = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &.active {
    background-color: #0077b6;
  }
`;

const Sidebar = ({ role }) => {
  const getMenuItems = () => {
    if (role === "admin") {
      return (
        <>
          <ItemContainer to="/adminpage">
            <Item name="Admin Item 1" icon="🔧" />
          </ItemContainer>
          <ItemContainer to="/adminpage">
            <Item name="Admin Item 2" icon="⚙️" />
          </ItemContainer>
          <ItemContainer to="/adminpage">
            <Item name="Admin Item 3" icon="🔩" />
          </ItemContainer>
        </>
      );
    } else {
      return (
        <>
          <ItemContainer to="/userpage">
            <Item name="User Item 1" icon="📄" />
          </ItemContainer>
          <ItemContainer to="/userpage">
            <Item name="User Item 2" icon="🗂️" />
          </ItemContainer>
          <ItemContainer to="/userpage">
            <Item name="User Item 3" icon="📁" />
          </ItemContainer>
        </>
      );
    }
  };

  return (
    <Container>
      <LogoContainer>HappyPerformer</LogoContainer>
      <MenuItems>{getMenuItems()}</MenuItems>
      <SVGContainer src={Coder} />
    </Container>
  );
};

export default Sidebar;
