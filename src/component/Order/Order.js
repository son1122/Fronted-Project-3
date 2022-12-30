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
  const [quantity, setQuantity] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(10);
  const [totalPrice, setTotalPrice] = useState(0);

  const [currentOrder, setCurrentOrder] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/menu_items/category/${menuItemsCategory}`,{
          headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`}
      })
      .then((res) => {
        console.log("Response Data from Order.js >> ", res.data);

        setMenuItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [menuItemsCategory]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/order`,{
          headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`}
      })
      .then((res) => {
        console.log("Order response in Orderview >>>> ", res.data);
        const data = res.data;
        const handleCurrentOrder = () => {
          // this function will get the latest order in the database and add 1 to make it seem like this is the new order we are creating.
          setCurrentOrder(data[data.length - 1].id + 1);
        };

        handleCurrentOrder();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={"order-grid"} style={{ height: "90vh" }}>
      <OrderView
        menuItems={menuItems}
        setMenuItems={setMenuItems}
        setMenuItemsCategory={setMenuItemsCategory}
        itemsSearchQuery={itemsSearchQuery}
        setItemsSearchQuery={setItemsSearchQuery}
        selectMenuItems={selectMenuItems}
        setSelectMenuItems={setSelectMenuItems}
        quantity={quantity}
        setQuantity={setQuantity}
        setTotalPrice={setTotalPrice}
        totalPrice={totalPrice}
        serviceCharge={serviceCharge}
        setServiceCharge={setServiceCharge}
        currentOrder={currentOrder}
      />
      <OrderSide
        selectMenuItems={selectMenuItems}
        setSelectMenuItems={setSelectMenuItems}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        serviceCharge={serviceCharge}
        setServiceCharge={setServiceCharge}
        currentOrder={currentOrder}
      />
    </div>
  );
};

export default Order;
