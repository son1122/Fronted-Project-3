import "./DashboardView.css"
import "../Dashboard.css"
import React, { useState, useEffect } from 'react';
import axios from "axios";

const Employer = () => {
    const [dataChef,setDataChef] = useState()
    const [dataWaiter,setDataWaiter] = useState()
    useEffect(()=>{
        axios.get(`https://backend-sei-project-3.cyclic.app/dashboard/chef`,{
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }).then(resu=>{

            console.log(resu)
            let dataRes = resu.data.map((name,index)=>{
                console.log(name)
                return(
                    <div>

                        <h2>{index+1} ID : {name.id} Name : {name.firstName} {name.lastName}</h2>
                        <h3>Phone : {name.phone} Email : {name.email} </h3>
                        <br/>
                    </div>
                )
            })
            setDataChef(dataRes)
        })
        axios.get(`https://backend-sei-project-3.cyclic.app/dashboard/waiter`,{
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }).then(resu=>{

            console.log(resu)
            let dataRes = resu.data.map((name,index)=>{
                console.log(name)
                return(
                    <div>

                        <h2>{index+1} ID : {name.id} Name : {name.firstName} {name.lastName}</h2>
                        <h3>Phone : {name.phone} Email : {name.email} </h3>
                        <br/>
                    </div>
                )
            })
            setDataWaiter(dataRes)
        })
    },[])

    return(
        <div className={"dashboard-grid-half"} style={{overflow:"auto"}}>
            <div>
                <h1>Chef List</h1>
                {dataChef}
            </div>
            <div>
                <h1>Waiter List</h1>
                {dataWaiter}
            </div>
        </div>
    )
}
export default Employer
