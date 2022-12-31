import "./TableSide.css"
import React, {useState, useEffect} from "react";
import axios from "axios";

const TableSide = ({selTable}) => {

    const [allTable, setAllTable] = useState([]);

    let showTable = selTable

  useEffect(() => {
    axios
      .get(`http://localhost:3001/table`,{
          headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`}
      })
      .then((res) => {
        console.log("ALL TABLE DATA FROM BACKEND >>> ", res.data);
        console.log(`this is table ${showTable}`)
        setAllTable(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  

    return (
        <div className={"table-side-grid"}>
            <p>Table Number {showTable}</p>

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