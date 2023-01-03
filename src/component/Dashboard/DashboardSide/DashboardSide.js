import "./DashboardSide.css";
import { Card } from "antd";
const DashboardSide = () => {
  const num = [
    "summary",
    "Menu",
    "Order",
    "Customer",
    "Employer",
    "Ingredient",
    "Seller",
  ];
  let list = num.map((i, key) => {
    return (
      <div key={key}>
        <h2>{i}</h2>
      </div>
    );
  });
  return (
    <div className={"dashboard-side-grid"}>
      <h2>Dashboard Category</h2>
      {list}
    </div>
  );
};

export default DashboardSide;
