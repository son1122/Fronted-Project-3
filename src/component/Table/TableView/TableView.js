import "./TableView.css"
const TableView = ({tables, selTable, setSelTable}) => {

    const inputSelTable=(event) => {
        setSelTable(event)
      };



    const allTables = tables.map(tables => {
        return (

            <button type={"submit"} value={tables.table_number} onClick={()=>inputSelTable(tables.table_number)}>
                <p>Table Number : {tables.table_number}</p>
                <p>Status : {tables.table_status}</p>
            </button>
        )
    })

    return (
        <from >
            <div className={"table-view-grid"}>
                <p>Table View</p>
                {allTables}
            </div>
        </from>
    );
}

export default TableView;