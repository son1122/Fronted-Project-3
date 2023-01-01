import "./Table.css"
import TableView from "./TableView/TableView";
import TableSide from "./TableSide/TableSide";
import axios from "axios";
import React, {useState, useEffect} from "react";

const Table = () => {
    
    //Get database//
    const [tables, setTables] = useState([]);
    const [order, setOrder] = useState();
    const [orderDetail, setOrderDetail] = useState()
    
    // Get value 
    const [selTable, setSelTable] = useState(0);

    //Call api from data base//
    useEffect(() => {
        axios
          .get(`http://localhost:3001/table`,{
              headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`}
          })
          .then((res) => {
            console.log("ALL TABLE DATA FROM BACKEND >>> ", res.data);
            setTables(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      async function getOrder(selTable){
        try {
          let orders = await fetch(`http://localhost:3001/order/table/${selTable}`)
          let res = await orders.json();
            console.log("ororororo >>> ", res);
            setOrder(res[0].id);  
            console.log(selTable, order)        
        } catch (error) {
            console.log('err') };
        }

      useEffect(() => {
        axios
          .get(`http://localhost:3001/Order/detail/`)
          .then((res) => {
            console.log("ALL ORDER DETAIL DATA FROM BACKEND >>> ", res.data);
            setOrderDetail(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      
    return (
        <div className={"table-grid"} onChange={getOrder(selTable)}>
            <TableView 
              setSelTable={setSelTable} 
              order={order}
              tables={tables}/>
            <TableSide 
              selTable={selTable}
              setSelTable={setSelTable}
              order={order}
              setOrder={setOrder}
              orderDetail={orderDetail}
              setOrderDetail={setOrderDetail}

            />
        </div>
    );
}

export default Table;