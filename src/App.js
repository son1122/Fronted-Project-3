import {useEffect, useState} from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import Layout from "./component/Layout/Layout";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/order" element={<Layout/>}/>
        </Routes>
        {/*After Login Page*/}
            <Layout />

        {/*Login Page*/}
        {/*    <Login/>*/}
        {/*    <Signup/>*/}
    </div>
  );
}

export default App;
