import React from "react";
import { Route, Routes } from "react-router-dom";

import SignIn from "./Authendication/SignIn";
import PrivateRoute from "./Components/Privateroute";
import Home from "./Dashboard/Home";
import NavBar from "./Components/Appbar";

export default function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
    </>
  );
}
