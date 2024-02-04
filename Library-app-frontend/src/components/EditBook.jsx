import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { Box ,Heading } from "@chakra-ui/react";

const EditBook = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(null);
  

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://library-app-backend-navy.vercel.app/books/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data)
        setTitle(response.data.title);
        setYear(response.data.year);
      } catch (error) {
        console.error("Error fetching book:", error.message);
      }
    };
      fetchData();
  }, [id]);
  

  const handleUpdate = () => {
    const data = {
      title,
      year,
    };

    axios
      .patch(`https://library-app-backend-navy.vercel.app/books/update/${id}`, data , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Book Updated",
            text: "The book has been successfully updated.",
          });
        }else{
          Swal.fire({
            icon: "error",
            title: "YOU ARE NOT A CREATOR",
            text: "You do not have permission to update this book.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "YOU ARE NOT A CREATOR",
          text: "You do not have permission to update this book.",
        });
      });
  };

  if (year == null && title === "") {
    return (
      <Box p="4" borderWidth="1px" borderRadius="lg" bg="red.100">
        <Heading as="h1" size="xl">
          You do not have permission to update this book. Only Creator can edit books.
        </Heading>
      </Box>
    );
  }
  return (
    <Container>
      <h2 className="edit-heading ">Edit Book</h2>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <Input
        type="number"
        value={year}
        onChange={(e) => setYear(+e.target.value)}
        placeholder="Year"
      />
      <Button onClick={handleUpdate}>Update</Button>
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0);
  padding: 20px;
  .edit-heading {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    color: #007bff;
  }
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

const Button = styled.button`
  height: 35px;
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

export default EditBook;
