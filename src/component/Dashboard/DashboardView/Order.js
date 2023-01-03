import "./DashboardView.css"
import React, { useState, useEffect } from 'react';
import axios from "axios";

const Order = () => {
    const [data,setData] = useState()
    useEffect(()=>{
        axios.get(`https://backend-sei-project-3.cyclic.app/dashboard/order`,{
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }).then(resu=>{

            console.log(resu)
            let dataRes = resu.data.map((name,index)=>{
                console.log(name)
                return(
                    <div>
                        <h2>{index+1} ID : {name.id} Customer ID :  {name.customer_id} Name: {name.Customer.firstname} {name.Customer.lastname} <br/>{name.order_date} {name.table_number}</h2>
                        <br/>
                    </div>
                )
            })
            setData(dataRes)
        })
    },[])

    return(
        <div style={{overflow:"auto"}}>
            <h1>Order List</h1>
            {data}
        </div>
    )
}
export default Order
