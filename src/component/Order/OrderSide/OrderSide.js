import { render } from "@testing-library/react";
import { tab } from "@testing-library/user-event/dist/tab";
import axios from "axios";
import { useEffect, useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import "./OrderSide.css";
import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";
const OrderSide = ({
  selectMenuItems,
  totalPrice,
  setTotalPrice,
  setSelectMenuItems,
  currentOrder,
}) => {
  const [allTable, setAllTable] = useState([]);
  const [selectTable, setSelectTable] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/table`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })

      // .get(`http://localhost:3001/table`)
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
        <img
          src={item.img}
          className={"order-side-menu-img"}
          style={{ maxheight: "50%" }}
        />
        <div className="order-side-menu-nameprice">
          <div className="order-side-menu-name">{item.name}</div>
          <div className="order-side-menu-price"> ฿ {item.price}</div>
        </div>
        <div className="order-side-menu-qtybtn">
          <div className="order-side-menu-qty">x {item.quantity}</div>
          <div className="order-side-menu-decbtn">
            <button id="decrement" onClick={() => handleDecRemItem(item.id)}>
              -
            </button>
          </div>
        </div>
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
        setSelectMenuItems([]);
        // messageApi.info("Created Order Successfully");
      }
    };
    checkTable();
  };
  return (
    <div className={"order-side-grid"}>
      <h2>Order#00{currentOrder}</h2>
      <div className={"order-side-detail-grid"}>
        <div className={"table-selection"}>
          {/* <label htmlFor="order-side-table-list">Select Table</label> */}
          <div className="custom-select">
            <select
              className="order-side-table-list"
              form="order-side-form"
              defaultValue={"placeholder"}
              placeholder="Select Table"
              onChange={(e) => setSelectTable(e.target.value)}
            >
              <option selected disabled value={null}>
                Select Table
              </option>
              {tableList}
            </select>
          </div>
        </div>

        <div className="order-details-container">
          <div className="dont-delete-this-for-testing">Order's Summary</div>
        </div>
        <div className="order-side-slide">
          <div className={"order-side-detail-container"}>{selMenuItemList}</div>
        </div>
        <div className="price-cont">
          <div className="total-price-left">
            <p className="total-price-label-total" id="service">
              Service Charge (0%)
            </p>
            <p className="total-price-label-total" id="tax">
              Tax (0%)
            </p>
            <p className="total-price-label-total" id="total">
              Total
            </p>
          </div>
          <div className="total-price-right">
            <p className="total-price-label-total" id="service">
              0 Baht
            </p>
            <p className="total-price-label-total" id="tax">
              0 Baht
            </p>
            <p className="total-price-label-total" id="total">
              {totalPrice} Baht
            </p>
          </div>
        </div>
      </div>
      <div className="order-side-confirm-btn-cont">
        <div className="order-side-confirm-btn" onClick={confirmOrder}>
          Confirm
        </div>
      </div>
    </div>
  );
};

export default OrderSide;
