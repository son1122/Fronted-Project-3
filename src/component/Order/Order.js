import "./Order.css";
import OrderView from "./OrderView/OrderView";
import OrderSide from "./OrderSide/OrderSide";
import { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  //Get all menu items and by category.
  const [menuItems, setMenuItems] = useState([]);
  const [menuItemsCategory, setMenuItemsCategory] = useState("food");
  //Searchbar queries.
  const [itemsSearchQuery, setItemsSearchQuery] = useState("");
  const [selectMenuItems, setSelectMenuItems] = useState([]);

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
        setMenuItems={setMenuItems}
        setMenuItemsCategory={setMenuItemsCategory}
        itemsSearchQuery={itemsSearchQuery}
        setItemsSearchQuery={setItemsSearchQuery}
      />
      <OrderSide />
    </div>
  );
};

export default Order;
