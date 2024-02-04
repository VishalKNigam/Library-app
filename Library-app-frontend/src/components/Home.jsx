import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  VStack,
  Center,
  Box,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://library-app-backend-navy.vercel.app/books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data["All Books"])
        setBooks(response.data["All Books"])
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://library-app-backend-navy.vercel.app/books/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Book Deleted",
          text: "The book has been successfully deleted.",
        });
        const updatedBooks = books.filter((book) => book._id !== id);
        setBooks(updatedBooks);
      } else{
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You do not have permission to delete this book.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You do not have permission to delete this book.",
      });
    }
  };

  return (
    <VStack spacing="4" align="stretch">
      <Box>
        <Center>
          <Table variant="striped" colorScheme="blue">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Year</Th>
                <Th>CreatedBy</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {books.map((book) => (
                <Tr key={book._id}>
                  <Td>{book.title}</Td>
                  <Td>{book.year}</Td>
                  <Td>{book.createdBy}</Td>
                  <Td>
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDelete(book._id)}
                      mr="2"
                    />
                    <Link to={`/books/update/${book._id}`}>
                      <IconButton icon={<EditIcon />} colorScheme="blue" />
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Center>
      </Box>
    </VStack>
  );
};

export default Home;
