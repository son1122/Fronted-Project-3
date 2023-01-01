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
        console.log(err);
      });
  };

  const allTables = tables.map((tables) => {
    return (
      <button
        value={tables.table_number}
        // onClick={() => inputSelTable(tables.table_number)}
        onClick={() => {
          inputSelTable(tables.table_number);
        }}
      >
        <p>Table Number : {tables.table_number}</p>
        <p>Status : {tables.table_status}</p>
      </button>
    );
  });

  return (
    <div className={"table-view-grid"}>
      <p>Table View</p>
      {allTables}
    </div>
  );
};

export default TableView;
