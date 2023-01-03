import "./Table.css";
import TableView from "./TableView/TableView";
import TableSide from "./TableSide/TableSide";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Table = () => {
  //Get database//
  const [tables, setTables] = useState([]);
  const [order, setOrder] = useState();
  const [orderDetail, setOrderDetail] = useState();

  // Get value
  const [tableOrderDetail, setTableOrderDetail] = useState([]);
  const [selTable, setSelTable] = useState(0);

  //Call api from data base//
  useEffect(() => {
    axios
      .get(`http://localhost:3001/table`, {
        // headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`}
      })
      .then((res) => {
        setTables(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={"table-grid"}>
      <TableView
        setSelTable={setSelTable}
        order={order}
        tables={tables}
        setTables={setTables}
        setOrder={setOrder}
        orderDetail={orderDetail}
        setOrderDetail={setOrderDetail}
        selTable={selTable}
        tableOrderDetailState={tableOrderDetail}
        setTableOrderDetail={setTableOrderDetail}
      />
      <TableSide
        selTable={selTable}
        setTables={setTables}
        tables={tables}
        setSelTable={setSelTable}
        order={order}
        setOrder={setOrder}
        orderDetail={orderDetail}
        setOrderDetail={setOrderDetail}
        tableOrderDetailState={tableOrderDetail}
        setTableOrderDetail={setTableOrderDetail}
      />
    </div>
  );
};

export default Table;
