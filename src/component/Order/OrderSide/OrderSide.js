import { render } from "@testing-library/react";
import { tab } from "@testing-library/user-event/dist/tab";
import axios from "axios";
import { useEffect, useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import "./OrderSide.css";
const OrderSide = ({
  selectMenuItems,
  totalPrice,
  setTotalPrice,
  setSelectMenuItems,
}) => {
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
  const handleDecRemItem = (id) => {
    const updatedItems = selectMenuItems
      .map((menuitem) => {
        if (menuitem.id === id && menuitem.quantity > 0) {
          setTotalPrice(totalPrice - menuitem.price);
          return { ...menuitem, quantity: menuitem.quantity - 1 };
        }
        return menuitem;
      })
      .filter((menuitem) => menuitem.quantity > 0);
    setSelectMenuItems(updatedItems);
  };

  let tableList = allTable.map((table) => {
    return (
      <option key={table.id} value={table.table_number}>
        {table.table_number}
      </option>
    );
  });

  let selMenuItemList = selectMenuItems.map((item) => {
    return (
      <div key={item.id} className={"order-side-menu-grid"}>
        <p>{item.name}</p>
        <p>{item.quantity}</p>
        <p>{item.price}</p>
        <button id="decrement" onClick={() => handleDecRemItem(item.id)}>
          -
        </button>
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
            defaultValue={"placeholder"}
            placeholder="Select Table"
            onChange={(e) => setSelectTable(e.target.value)}
          >
            <option disabled value={null}>
              Select Table
            </option>
            {tableList}
          </select>
        </div>

        <div className={"order-side-menu-grid"}>
          <h3>Name</h3>
          <h3>Quantity</h3>
          <h3>Price</h3>
        </div>
        <div className="order-side-slide">
          <div className={"order-side-detail-container"}>{selMenuItemList}</div>
        </div>
        <p>Total = {totalPrice}</p>
      </div>
      <button onClick={confirmOrder}>Confirm</button>
    </div>
  );
};

export default OrderSide;
