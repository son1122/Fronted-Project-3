import "./Dashboard.css"
import DashboardView from "./DashboardView/DashboardView";
import DashboardSide from "./DashboardSide/DashboardSide";
import {useState} from "react";

const Dashboard = () => {
    const [select,setSelect]=useState(0)
    return (
        <div className={"dashboard-grid"}>
            <DashboardView/>
            <DashboardSide setSelect={setSelect}/>
        </div>
    );
}

export default Dashboard;