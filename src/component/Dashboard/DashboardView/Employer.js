import "./DashboardView.css";
import "../Dashboard.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Employer = () => {
  const [dataChef, setDataChef] = useState();
  const [dataWaiter, setDataWaiter] = useState();
  useEffect(() => {
    axios
      .get(`https://backend-sei-project-3.cyclic.app/dashboard/chef`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((resu) => {
        console.log(resu);
        let dataRes = resu.data.map((name, index) => {
          console.log(name);
          return (
            <div className="employer-list-item">
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">ID: </span> {name.id}{" "}
              </h3>
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">Name: </span>{" "}
                {name.firstName} {name.lastName}
              </h3>
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">Phone: </span>{" "}
                {name.phone}{" "}
              </h3>
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">Email: </span>{" "}
                {name.email}{" "}
              </h3>
              <br />
            </div>
          );
        });
        setDataChef(dataRes);
      });
    axios
      .get(`https://backend-sei-project-3.cyclic.app/dashboard/waiter`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((resu) => {
        console.log(resu);
        let dataRes = resu.data.map((name, index) => {
          console.log(name);
          return (
            <div className="employer-list-item">
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">ID: </span> {name.id}{" "}
              </h3>
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">Name: </span>{" "}
                {name.firstName} {name.lastName}
              </h3>
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">Phone: </span>{" "}
                {name.phone}{" "}
              </h3>
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">Email: </span>{" "}
                {name.email}{" "}
              </h3>
              <br />
            </div>
          );
        });
        setDataWaiter(dataRes);
      });
  }, []);

  return (
    <div className={"dashboard-grid-half"} style={{ overflow: "auto" }}>
      <div>
        <h1>Chef List</h1>
        <div className="employer-list-cont-chef">{dataChef}</div>
      </div>
      <div>
        <h1>Waiter List</h1>
        <div className="employer-list-cont-waiter">{dataWaiter}</div>
      </div>
    </div>
  );
};
export default Employer;
