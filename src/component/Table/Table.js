import "./Table.css"
import TableView from "./TableView/TableView";
import TableSide from "./TableSide/TableSide";

const Table = () => {
    return (
        <div className={"table-grid"}>
            <TableView/>
            <TableSide/>
        </div>
    );
}

export default Table;