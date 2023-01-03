import "./DashboardView.css"
import React, { useState, useEffect } from 'react';
import axios from "axios";

const Ingredient = () => {
    const [data,setData] = useState()
    useEffect(()=>{
        axios.get(`http://localhost:3001/dashboard/ingredient`,{
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }).then(resu=>{

            console.log(resu)
            let dataRes = resu.data.map((name,index)=>{
                console.log(name)
                return(
                    <div>
                        <h2>{index+1} ID : {name.id} Name : {name.name} INFO: {name.description}</h2>
                        <br/>
                    </div>
                )
            })
            setData(dataRes)
        })
    },[])

    return(
        <div style={{overflow:"auto"}}>
            <h1>Ingredient List</h1>
            {data}
        </div>
    )
}
export default Ingredient

