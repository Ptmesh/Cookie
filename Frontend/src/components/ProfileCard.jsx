import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
`;

const Name = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin: 0;
`;

const Role = styled.h3`
  font-size: 1.2em;
  color: #777;
  margin: 5px 0;
`;

const Email = styled.p`
  font-size: 1em;
  color: #555;
  margin: 5px 0;
`;

const Phone = styled.p`
  font-size: 1em;
  color: #555;
  margin: 5px 0;
`;

const ProfileCard = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <Card onClick={handleClick}>
      <ProfileImage src={user.picture || "default-pic-url.jpg"} alt="Profile" />
      <Name>{user.name}</Name>
      <Role>{user.role}</Role>
      <Email>{user.email}</Email>
      <Phone>{user.phone}</Phone>
    </Card>
  );
};

export default ProfileCard;
