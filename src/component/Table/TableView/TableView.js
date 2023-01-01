import axios from "axios";
import "./TableView.css";
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
      .get(`http://localhost:3001/orderdetail/${selTableNumber}`)
      .then((res) => {
        console.log("Get table Order Id from Selected Number >>>>>", res.data);
        setTableOrderDetail(res.data.menuItems);
      })
      .catch((err) => {
        setTableOrderDetail([]);
        console.log("err", err);
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
    </div>
  );
};

export default TableView;
