import "./DashboardSide.css";
import { Card } from "antd";
const DashboardSide = (props) => {
  const num = [
    "Summary",
    "Menu",
    "Order",
    "Customer",
    "Employer",
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
          height: "100%",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Dashboard Category
      </h2>
      {list}
    </div>
  );
};

export default DashboardSide;
