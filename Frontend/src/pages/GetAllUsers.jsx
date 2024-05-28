import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";

axios.defaults.withCredentials = true;

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
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

    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/allusers");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users data", error);
      }
    };

    fetchUser();
    fetchUsers();
  }, []);

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
        <Title>All Users</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Role</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Layout>
  );
};

export default GetAllUsers;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5em;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: #fff;
`;

const TableHeadCell = styled.th`
  padding: 15px;
  text-align: left;
`;

const TableBody = styled.tbody`
  background-color: #f9f9f9;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #eee;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;
