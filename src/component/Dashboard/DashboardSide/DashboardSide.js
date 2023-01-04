import "./DashboardSide.css";
import { Card } from "antd";
const DashboardSide = (props) => {
  const num = [
    "Summary",
    "Menu",
    "Order",
    "Customer",
    "Employee",
    "Ingredient",
    "Seller",
    "Location",
  ];
  let list = num.map((i, key) => {
    return (
      <div
        key={key}
        onClick={() => {
          props.setSelect(key);
        }}
        className={"dashboard-side-items"}
      >
        <h3>{i}</h3>
      </div>
    );
  });
  return (
    <div className={"dashboard-side-grid"}>
      <h2
        style={{
          backgroundColor: "#ff2531",
          color: "white",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0",
          marginBottom: "25px",
        }}
      >
        Dashboard Category
      </h2>
      {list}
    </div>
  );
};

export default DashboardSide;
