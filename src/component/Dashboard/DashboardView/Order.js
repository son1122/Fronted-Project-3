import "./DashboardView.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`https://backend-sei-project-3.cyclic.app/dashboard/order`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((resu) => {
        let dataRes = resu.data.map((name, index) => {
          console.log(resu.data);
          return (
            <div className="order-orderlist-item">
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">Order Id: </span>
                {name.id}
              </h3>
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">Customer Id: </span>
                {name.customer_id}
              </h3>
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">Table Number: </span>
                {name.table_number}
              </h3>
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">Name: </span>{" "}
                {name.Customer["firstname"]} {name.Customer["lastname"]}
              </h3>
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">Order Date: </span>
                {name.order_date}
              </h3>
              <br />
            </div>
          );
        });
        setData(dataRes);
      });
  }, []);

  return (
    <div style={{ overflow: "auto" }}>
      <h1>Order List</h1>
      <div className="order-orderlist-cont">{data}</div>
    </div>
  );
};
export default Order;
