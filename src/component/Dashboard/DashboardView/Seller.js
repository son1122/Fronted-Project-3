import "./DashboardView.css"
import React, { useState, useEffect } from 'react';
import axios from "axios";

const Seller = () => {
    const [data,setData] = useState()
    useEffect(()=>{
        axios.get(`https://backend-sei-project-3.cyclic.app/dashboard/seller`,{
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }).then(resu=>{

            console.log(resu)
            let dataRes = resu.data.map((name,index)=>{
                console.log(name)
                return(
                    <div>

                        <h2>{index+1} ID : {name.id} Name : {name.name}</h2>
                        <h3>Phone : {name.phone} </h3>
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
export default Seller

