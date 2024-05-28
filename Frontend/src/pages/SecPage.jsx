import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";

axios.defaults.withCredentials = true;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Content = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SecPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/user", {
          withCredentials: true,
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data", error);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout username={user.name} role={user.role} logout={handleLogout}>
      <Container>
        <Title>Welcome to the Secret Page</Title>
        <Content>
          <p>This is a secure page accessible only to authenticated users.</p>
          <p>
            You can put any content or functionality specific to this page here.
          </p>
        </Content>
      </Container>
    </Layout>
  );
};

export default SecPage;
