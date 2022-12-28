import "./TableView.css"
const TableView = (prop) => {
    const allTables = prop.tables.map(tables => {
        return (
            <button>
                <p>Table Number : {tables.table_number}</p>
                <p>Status : {tables.table_status}</p>
            </button>
        )
    })
    return (
        <div className={"table-view-grid"}>
            <p>Table View</p>
            <p>{allTables}</p>

        </div>
    );
}

export default TableView;