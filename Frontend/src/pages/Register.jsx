import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

function Register() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    role: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/register", form);
      navigate("/login");
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <Input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <Input
        type="text"
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
      />
      <Select name="role" onChange={handleChange}>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </Select>
      <Input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <Button type="submit">Register</Button>
    </Form>
  );
}

export default Register;
