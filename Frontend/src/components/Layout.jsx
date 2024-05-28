import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
`;

const SidebarContainer = styled.div`
  width: 20%;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PageContent = styled.div`
  flex: 1;
  padding: 40px 20px;
  background-color: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Layout = ({ children, username, role, logout }) => {
  return (
    <MainContainer>
      <ContentContainer>
        <SidebarContainer>
          <Sidebar role={role} />
        </SidebarContainer>
        <MainContent>
          <Navbar username={username} logout={logout} />
          <PageContent>{children}</PageContent>
          <Footer />
        </MainContent>
      </ContentContainer>
    </MainContainer>
  );
};

export default Layout;
