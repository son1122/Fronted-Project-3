import "./DashboardView.css"
import React, { useState, useEffect } from 'react';
import axios from "axios";

const Customer = () => {
    const [data,setData] = useState()
    useEffect(()=>{
        axios.get(`http://localhost:3001/dashboard/customer`,{
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }).then(resu=>{

            console.log(resu)
            let dataRes = resu.data.map((name,index)=>{
                console.log(name)
                return(
                    <div>

                        <h2>{index+1} ID : {name.id} Name : {name.firstname} {name.lastname}</h2>
                        <h3>Phone : {name.phone} Email : {name.email} </h3>
                        <br/>
                    </div>
                )
            })
            setData(dataRes)
        })
    },[])

    return(
        <div style={{overflow:"auto"}}>
            <h1>Customer List</h1>
            {data}
        </div>
    )
}
export default Customer

