import { render } from "@testing-library/react";
import { tab } from "@testing-library/user-event/dist/tab";
import axios from "axios";
import { useEffect, useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import "./OrderSide.css";
const OrderSide = ({ selectMenuItems, totalPrice, setTotalPrice }) => {
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

  let selMenuItemList = selectMenuItems.map((item) => {
    return (
      <div key={item.id} className={"table-side-detail-grid"}>
        <p>{item.name}</p>
        <p>{item.quantity}</p>
        <p>{item.price}</p>
      </div>
    );
  });
  let confirmOrder = () => {
    console.log("Menu Items >>> ", selectMenuItems);
    console.log("Select Table >>> ", selectTable);
    const checkTable = () => {
      if (selectTable === null) {
        alert("PLEASE SELECT TABLE");
      } else {
        axios
          .post("http://localhost:3001/order", {
            menuItems: selectMenuItems,
            table_number: selectTable,
            customer_id: null,
            order_date: new Date(),
            status: "inprogress",
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        alert("Created Order successfully.");
      }
    };
    checkTable();
  };

  return (
    <div className={"order-side-grid"}>
      <p>Order Side</p>
      <div className={"order-side-detail-grid"}>
        <div className={"table-selection"}>
          <label htmlFor="order-side-table-list">Select Table</label>
          <select
            name="order-side-table-list"
            form="order-side-form"
            defaultValue={null}
            onChange={(e) => setSelectTable(e.target.value)}
          >
            <option disabled selected>
              Select Table
            </option>
            {tableList}
          </select>
        </div>

        <div>
          <div className={"table-side-detail-grid"}>
            <h3>Name</h3>
            <h3>Quantity</h3>
            <h3>Price</h3>
          </div>
          {selMenuItemList}
        </div>
        <p>Total = {totalPrice}</p>
      </div>
      <button onClick={confirmOrder}>Confirm</button>
    </div>
  );
};

export default OrderSide;
