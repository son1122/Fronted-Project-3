import "./DashboardView.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Ingredient = () => {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`https://backend-sei-project-3.cyclic.app/dashboard/ingredient`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((resu) => {
        console.log(resu);
        let dataRes = resu.data.map((name, index) => {
          console.log(name);
          return (
            <div className="ingredient-item-item">
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">ID: </span> {name.id}
              </h3>
              <h3 className="order-orderlist-item-align">
                <span className="employer-list-item-label">Name: </span>{" "}
                {name.name}
              </h3>
              <p className="order-orderlist-item-align">
                <span className="employer-list-item-label">Description: </span>{" "}
                {name.description}
              </p>
              <br />
            </div>
          );
        });
        setData(dataRes);
      });
  }, []);

  return (
    <div>
      <h1>Ingredient List</h1>
      <div className="ingredient-item-cont">{data}</div>
    </div>
  );
};
export default Ingredient;
