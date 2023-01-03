import axios from "axios";
import "./TableView.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const inputSelTable = async (event) => {
    await setSelTable(event);
    getOrderWithNameAndPrice(event);
  };

  const getOrderWithNameAndPrice = (selTableNumber) => {
    axios
      .get(`http://localhost:3001/orderdetail/${selTableNumber}`,{
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
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
      // <button
      //   value={tables.table_number}
      //   // onClick={() => inputSelTable(tables.table_number)}
      //   onClick={() => {
      //     inputSelTable(tables.table_number);
      //   }}
      // >
      //   <p>Table Number : {tables.table_number}</p>
      //   <p>Status : {tables.table_status}</p>
      // </button>
    );
  });

  return (
    <div className={"table-view-grid"}>
      {/* <p>Table View</p> */}

      <div className="order-view-header-cont">
        <p id="view-header-menulabel">Table View </p>
      </div>
      <div className="table-slide-horizon">{allTables}</div>
      <div></div>
    </div>
  );
};

export default TableView;
