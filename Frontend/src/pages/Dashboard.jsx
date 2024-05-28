import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import ProfileCard from "../components/ProfileCard";

axios.defaults.withCredentials = true;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5em;
`;

const Nav = styled.nav`
  margin-top: 20px;

  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: #007bff;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #0056b3;
    }
  }
`;

const Button = styled.button`
  display: block;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 20px auto 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Dashboard = ({ logout }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/user", {
          withCredentials: true,
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout");
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  if (!user) {
    return (
      <LoadingMessage>
        <div>Loading...</div>
        <div>
          Stuck? Try going to{" "}
          <Link to="/allusers" style={{ fontWeight: "bold", color: "#007bff" }}>
            see all users
          </Link>{" "}
          OR{" "}
          <Link to="/secpage" style={{ fontWeight: "bold", color: "#007bff" }}>
            to the SECRET PAGE
          </Link>
        </div>
      </LoadingMessage>
    );
  }

  return (
    <Layout username={user.name} role={user.role} logout={handleLogout}>
      <Title>Welcome, {user.name}</Title>
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <ProfileCard user={user} />
      </Link>
      <Nav>
        <ul>
          <li>
            <Link to="/allusers">See All Users</Link>
          </li>
          <li>
            <Link to="/secpage">Secret Page</Link>
          </li>
        </ul>
      </Nav>
    </Layout>
  );
};

export default Dashboard;
