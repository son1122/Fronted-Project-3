import "./Table.css"
import TableView from "./TableView/TableView";
import TableSide from "./TableSide/TableSide";
import axios from "axios";
import React, {useState, useEffect} from "react";

const Table = () => {
    
    //Get all table data//
    const [tables, setTables] = useState([]);
    const [selTable, setSelTable] = useState();

    //Call api from Table data base//
    useEffect(() => {
        axios
          .get(`http://localhost:3001/table`)
          .then((res) => {
            console.log("ALL TABLE DATA FROM BACKEND >>> ", res.data);
            setTables(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);



    return (
        <div className={"table-grid"}>
            <TableView tables={tables}/>
            <TableSide OrderDetail={tables.table_number}/>
        </div>
    );
}

export default Table;