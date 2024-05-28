import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
  max-width: 400px;
  margin: 50px auto;
  padding: 40px;
  background-color: #f4f4f9;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1.2em;

  &:hover {
    background-color: #0056b3;
  }
`;

function Login({ authenticate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/login", form);
      authenticate();
      navigate("/dashboard");
    } catch (error) {
      alert("Error logging in");
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
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <Button type="submit">Login</Button>
    </Form>
  );
}

export default Login;
