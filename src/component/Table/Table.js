import "./Table.css"
import TableView from "./DashboardView/TableView";
import TableSide from "./DashboardSide/TableSide";

const Table = () => {
    return (
        <div className={"table-grid"}>
            <TableView/>
            <TableSide/>
        </div>
    );
}

export default Table;