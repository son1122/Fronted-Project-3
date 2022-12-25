import "./View.css"
import Order from "../Order/Order";
import Dashboard from "../Dashboard/Dashboard";
import Table from "../Table/Table";
import {useParams} from "react-router-dom";

const View = () => {
    let { page } = useParams();
    console.log(page)
    return (
        <div >
            {page=="order"&&<Order/>}
            {page=="dashboard"&&<Dashboard/>}
            {page=="table"&&<Table/>}
        </div>
    );
}

export default View;