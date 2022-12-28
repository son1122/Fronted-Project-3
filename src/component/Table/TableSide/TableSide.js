import "./TableSide.css"
import React, {useState, useEffect} from "react";
import axios from "axios";

const TableSide = (prop) => {

    const [allTable, setAllTable] = useState([]);
    const [selectTable, setSelectTable] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/table`)
      .then((res) => {
        console.log("ALL TABLE DATA FROM BACKEND >>> ", res.data);
        setAllTable(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
    
    let tableList = allTable.map((table) => {
        return (
          <option key={table.id} value={table.table_number}>
            {table.table_number}
          </option>
        );
      });
      

    return (
        <div className={"table-side-grid"}>
            <p>Table Number</p>
                <select name="order-side-table-list" form="order-side-form"
                    onChange={(e) => setSelectTable(e.target.value)}
                >
                    {tableList}
                </select>


            <div >
                <div className={"table-side-detail-grid"}>   

                    <p>Order detail </p>

                </div>
                
            </div>
            <p>Total Price</p>
            <button>Check Button</button>
        </div>
    );
}

export default TableSide;