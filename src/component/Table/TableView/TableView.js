import "./TableView.css"
const TableView = ({tables, setSelTable, order}) => {

    const inputSelTable=(event) => {               
        setSelTable(event);
    };

    const allTables = tables.map(tables => {
        return (

            <button value={tables.table_number} onClick={()=>inputSelTable(tables.table_number)}>
                <p>Table Number : {tables.table_number}</p>
                <p>Status : {tables.table_status}</p>
            </button>
        )
    })

    return (
        
            <div className={"table-view-grid"}>
                <p>Table View</p>
                {allTables}
            </div>
        
    );
}

export default TableView;