import "./TableView.css"
import React, {useState} from "react";
const TableView = (props) => {
    
    const [selTable, setSelTable] = useState()

    const inputSelTable =(event) =>{
        console.log(event.target.value)
        setSelTable(event.target.value)
    }

    const handleSelectTable = (event) => {
        event.preventDefault()
        const itemData ={
            selTable:selTable
        }
        console.log(itemData)
        props.onAddTable(itemData)
        setSelTable()
    }
    
    
    
    const allTables = props.tables.map(tables => {
        return (

            <button type={"submit"} value={tables.table_number} >
                <p>Table Number : {tables.table_number}</p>
                <p>Status : {tables.table_status}</p>
            </button>
        )
    })

    return (
        <from onClick={handleSelectTable} >
            <div className={"table-view-grid"}>
                <p>Table View</p>
                <p onClick={
                    inputSelTable}>{allTables}</p>
            </div>
        </from>
    );
}

export default TableView;