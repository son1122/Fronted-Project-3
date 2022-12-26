import "./Order.css";
import OrderView from "./OrderView/OrderView";
import OrderSide from "./OrderSide/OrderSide";
import { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectMenuItems, setSelectMenuItems] = useState([]);
  const [menuItemsCategory, setMenuItemsCategory] = useState("food");
  useEffect(() => {
    axios
      .get(`http://localhost:3001/menu_items/category/${menuItemsCategory}`)
      .then((res) => {
        console.log("Response Data from Order.js >> ", res.data);
        setMenuItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [menuItemsCategory]);
  return (
    <div className={"order-grid"} style={{ height: "90vh" }}>
      <OrderView
        menuItems={menuItems}
        setMenuItemsCategory={setMenuItemsCategory}
      />
      <OrderSide selectMenuItems={selectMenuItems} />
    </div>
  );
};

export default Order;
