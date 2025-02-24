import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./protected/ProtectedRoute";
import useStore from "./zustand/useStore.js";
import ProtectLogin from "./protected/ProtectLogin.jsx";


const App = () => {
  const { user, setUser,setLoading } = useStore();

  useEffect(() => {
    setLoading(true);
    fetch("/auth/user", { credentials: "include" }) 
        .then((res) => res.json())
        .then((data) => {
            if (data?.error) {
                console.log(data.error);
                setLoading(false);
                return;
            }
            console.log(data);
            setUser(data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
}, [setUser]);


  return (
    <Routes>
      <Route element={<ProtectLogin />}>
        <Route path='/login' element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Home user={user}/>} />
      </Route>




    </Routes>
  );
};

export default App;
