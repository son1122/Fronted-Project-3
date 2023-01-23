import "./Layout.css"
import Navbar from "../Navbar/Navbar";
import View from "../View/View";
import Login from "../Login/Login";
import axios from "axios";
import {useEffect, useMemo} from "react";
import login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import {useNavigate} from "react-router-dom";

const Layout = (props) => {
    const navigate = useNavigate();

    return (
        <div className={"layout-grid"}>
            {props.login ? (<View/>) : <NotFound/>}
            <Navbar/>
        </div>
    );
}

export default Layout;