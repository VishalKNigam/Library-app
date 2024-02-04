import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const [bookData, setBookData] = useState({
    title: "",
    year: "",
    createdBy: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You are not logged in or your session has expired.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://library-app-backend-navy.vercel.app/books/create",
        bookData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Book Added",
        text: "The book has been successfully added.",
      });

      setBookData({
        title: "",
        year: "",
        createdBy: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Permission Denied",
          text: "You do not have permission to add a book.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while trying to add the book.",
        });
      }
    }
  };

  return (
    <AddBooksContainer>
      <h2 className="add-books-heading">Add Books</h2>
      <form onSubmit={handleAddBook}>
        <FormGroup>
          <Label htmlFor="title">Title:</Label>
          <Input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleInputChange}
            placeholder="Enter book title"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="year">Year:</Label>
          <Input
            type="text"
            name="year"
            value={bookData.year}
            onChange={handleInputChange}
            placeholder="Enter publication year"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="author">Author:</Label>
          <Input
            type="text"
            name="createdBy"
            value={bookData.createdBy}
            onChange={handleInputChange}
            placeholder="Enter author name"
          />
        </FormGroup>
        <SubmitButton type="submit">Add Book</SubmitButton>
      </form>
    </AddBooksContainer>
  );
};

const AddBooksContainer = styled.div`
  width: 400px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;

  .add-books-heading {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    color: #007bff;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  height: 40px;
  font-size: larger;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 8px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  height: 35px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: red;
  }
`;

export default AddBooks;
