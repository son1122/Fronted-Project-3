import {useEffect, useState} from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import Layout from "./component/Layout/Layout";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import NotFound from "./component/NotFound/NotFound";

function App() {



    const [login,setLogin]=useState(false)

    const loginFunc = () => {
        // console.log(localStorage.getItem("jwt"));
        // axios.get('http://localhost:3001/fruits', {
        //     headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`}
        // })
        //     .then(res => {
        //         console.log(res.data);
        //         setLogin(true)
        //     }).catch(e=>{
        //         setLogin(false)
        // })

    }
    useEffect((e=>{


    }),[login])

  return (
    <div className="App">
        <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login setLogin={setLogin}/>} />
            <Route path="/:page" element={login?<Layout/>:<Login setLogin={setLogin}/>}/>
            <Route path="*" element={<NotFound/>} />
        </Routes>
        {/*After Login Page*/}
        {/*    <Layout />*/}

        {/*Login Page*/}
        {/*    <Login/>*/}
        {/*    <Signup/>*/}

        {/*//condition rendering*/}
        {/*{login?<Layout/>:<Login setLogin={setLogin}/>}*/}
    </div>
  );
}

export default App;
