import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("token");
    Swal.fire({
      icon: "success",
      title: "Successfully Logged Out",
      text: "You have been successfully logged out.",
    });
    navigate("/users/login");
  };

  return (
    <StyledNavbar>
      <StyledLogo onClick={() => navigate("/books")}>
        Book Management
      </StyledLogo>
      <StyledLinks>
        {isAuth ? (
          <StyledLogoutButton onClick={handleLogout}>Logout</StyledLogoutButton>
        ) : (
          <>
            <StyledLink to="/users/login">Login</StyledLink>
            <StyledLink to="/">Register</StyledLink>
          </>
        )}
        {<StyledLink to="/books">Home</StyledLink>}
        {<StyledLink to="/books/create">AddBook</StyledLink>}
      </StyledLinks>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 20px;
  background-color: #007bff;
  color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 150px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const StyledLogo = styled.div`
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: red;
  }
`;

const StyledLinks = styled.div`
  display: flex;
  gap: 50px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 24px;
  transition: color 0.3s ease;

  &:hover {
    color: #d65656;
  }
`;

const StyledLogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 24px;
  transition: color 0.3s ease;

  &:hover {
    color: #d65656;
  }
`;

export default Navbar;
