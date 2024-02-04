import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import AddBooks from "../components/AddBooks";
import EditBook from "../components/EditBook";
import PrivateRoute from "../components/PrivateRoute";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/users/login" element={<Login />} />
      <Route
        path="/books"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/books/create"
        element={
          <PrivateRoute>
            <AddBooks />
          </PrivateRoute>
        }
      />
     <Route path="/books/update/:id" element={<EditBook />} />
    </Routes>
  );
};

export default Allroutes;
