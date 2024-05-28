import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProfileImage = styled.img`
  max-width: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Profile = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    role: "",
    id: "",
    picture: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/user");
        setForm(data);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files.length) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      await axios.put("http://localhost:3000/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <Container>
      <Title>Profile</Title>
      <Form onSubmit={handleSubmit}>
        <label>Picture</label>
        {form.picture && (
          <ProfileImage
            src={
              typeof form.picture === "string"
                ? `http://localhost:3000${form.picture}`
                : URL.createObjectURL(form.picture)
            }
            alt="Profile"
          />
        )}
        <Input
          type="file"
          name="picture"
          accept="image/*"
          onChange={handleChange}
        />
        <label>Name</label>
        <Input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <label>Email</label>
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <label>Phone</label>
        <Input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <label>Role</label>
        <Input
          type="text"
          name="role"
          value={form.role}
          onChange={handleChange}
          disabled
        />
        <label>ID</label>
        <Input
          type="text"
          name="id"
          value={form.id}
          onChange={handleChange}
          disabled
        />
        <Button type="submit">Update Profile</Button>
      </Form>
    </Container>
  );
};

export default Profile;
