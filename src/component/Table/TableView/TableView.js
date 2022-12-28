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

    const selectTable = () => {
       console.log("button is working")
    }

    return (
        <from>
            <div className={"table-view-grid"}>
                <p>Table View</p>
                <p onClick={() => selectTable()}>{allTables}</p>
            </div>
        </from>
    );
}

export default TableView;