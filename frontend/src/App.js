import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context/globalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Main from "./Components/Main/Main";
import Register from "./Components/Auth/Register";
import { PrivateRoute, PrivateRouteAuthenticated } from "./utils/privateRoutes";

function App() {
  return (
    <AppStyled className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRouteAuthenticated />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background: rgb(30, 30, 30);
  position: relative;
  main {
    flex: 1;
    background: rgba(50, 50, 50, 0.9);
    border: 3px solid rgba(79, 79, 79, 0.8);
    border-radius: 12px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
