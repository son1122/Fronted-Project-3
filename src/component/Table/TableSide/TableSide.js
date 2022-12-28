import "./TableSide.css"
import React, {useState} from "react";
import axios from "axios";


const TableSide = (prop) => {
    const OrderDetail = prop
       
 

    return (
        <div className={"table-side-grid"}>
            <p>Table Number</p>

            <p>Table Select
            {OrderDetail}
            </p>

            <div >
                <div className={"table-side-detail-grid"}>   

                    <p>TABLE Number </p>

                </div>
                
            </div>
            <p>Total Price</p>
            <button>Check Button</button>
        </div>
    );
}

export default TableSide;