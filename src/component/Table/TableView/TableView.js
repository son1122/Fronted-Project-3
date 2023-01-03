import axios from "axios";
import "./TableView.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GridLoader from "react-spinners/GridLoader";
import React, { useState, useEffect } from "react";
const TableView = ({
  setSelTable,
  order,
  tables,
  setTables,
  setOrder,
  orderDetail,
  setOrderDetail,
  selTable,
  tableOrderDetailState,
  setTableOrderDetail,
}) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const inputSelTable = async (event) => {
    await setSelTable(event);
    getOrderWithNameAndPrice(event);
  };

  const getOrderWithNameAndPrice = (selTableNumber) => {
    axios
      .get(
        `https://backend-sei-project-3.cyclic.app/orderdetail/${selTableNumber}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((res) => {
        setTableOrderDetail(res.data.menuItems);
      })
      .catch((err) => {
        setTableOrderDetail([]);
        //This will response in Developer Mode > Network > Response, showing that there is no order for the selected table. [GET 404 (Not Found)], is expected to be shown in console)
      });
  };

  const allTables = tables.map((tables) => {
    return (
      <div
        key={tables.id}
        className="table-view-item-cont"
        value={tables.table_number}
        onClick={() => {
          inputSelTable(tables.table_number);
        }}
      >
        <p id="table-view-table-label">{tables.table_number}</p>
      </div>
    );
  });

  return (
    <div className={"table-view-grid"}>
      <div className="order-view-header-cont">
        <p id="view-header-menulabel">Table View </p>
      </div>

      <div
        className={
          isLoading ? "table-slide-horizon-loading" : "table-slide-horizon"
        }
      >
        {isLoading ? (
          <GridLoader
            color={"#ff2531"}
            loading={isLoading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          [allTables]
        )}
      </div>
      <div></div>
    </div>
  );
};

export default TableView;
