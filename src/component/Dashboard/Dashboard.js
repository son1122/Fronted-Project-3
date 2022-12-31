import "./Dashboard.css"
import DashboardView from "./DashboardView/DashboardView";
import DashboardSide from "./DashboardSide/DashboardSide";
import {useState} from "react";
import Summary from "./DashboardView/Summary";
import Menu from "./DashboardView/Menu";
import Order from "./DashboardView/Order";
import Customer from "./DashboardView/Customer";
import Employer from "./DashboardView/Employer";
import Ingredient from "./DashboardView/Ingredient";
import Seller from "./DashboardView/Seller";

const Dashboard = () => {
    const [select,setSelect]=useState(10)
    return (
        <div className={"dashboard-grid"}>
            {select==10&& <DashboardView/>}
            {select==0&&<Summary/>}
            {select==1&&<Menu/>}
            {select==2&&<Order/>}
            {select==3&&<Customer/>}
            {select==4&&<Employer/>}
            {select==5&&<Ingredient/>}
            {select==6&&<Seller/>}
            <DashboardSide setSelect={setSelect}/>
        </div>
    );
}

export default Dashboard;