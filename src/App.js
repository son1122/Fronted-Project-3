import {useEffect, useState} from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import Layout from "./component/Layout/Layout";

function App() {
  return (
    <div className="App">
        {/*<Routes>*/}
        {/*    <Route path="/order" element={<Layout/>}/>*/}
        {/*</Routes>*/}
        <Layout/>
        <p>test</p>
    </div>
  );
}

export default App;
