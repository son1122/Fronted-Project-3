import "./DashboardView.css"
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { DecompositionTreeGraph } from '@ant-design/graphs';
import axios from "axios";

const Menu = () => {

    const [data,setData] = useState( {
        value: {
            title: 'Fried test Rice',
            items:{
                text : "Price",
                value: "100"
            }
        },
        children: [
            {
                value: {
                    title: 'Rice',
                    items:{
                        text : "gram",
                        value: "100"
                    }
                }}
        ]
    });
    const [config,setConfig] = useState({
        data,
        autoFit: true,
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        nodeCfg:{
            autoWidth:true,
        }
    })
    const select =()=>{
    axios.get("http://localhost:3001/dashboard/menu",{
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    }).then(res=>{
        console.log(res.data)
        // setData(data.value.title= res.data.name)
        const newData = {value: {
                title: res.data[0].name,
                items:{
                    text : "Price",
                    value: "100"
                }
            },
            children: [
                {
                    value: {
                        title: 'Rice',
                        items:{
                            text : "gram",
                            value: "100"
                        }
                    }}
            ]}
        newData.value.title=  res.data[0].name
        newData.value.items.value = res.data[0].price
        newData.children[0].value.title=res.data[0].Ingredients[0].name
        newData.children[0].value.items.value=res.data[0].Ingredients[0].MenuItemIngredient.quantity
        for(let i=1;i<res.data[0].Ingredients.length;i++){
            newData.children.push({
            value: {
                title: res.data[0].Ingredients[i].name,
                items:{
                    text : "gram",
                    value: res.data[0].Ingredients[i].MenuItemIngredient.quantity
                }
            }})}


        setData(newData)
        setConfig ( {
            data,
            autoFit: true,
            behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
            nodeCfg:{
                autoWidth:true,
            }
        })
    })}
    useEffect(() => {

    },[data,config]);

        return(
            <div className={"grid28"}>
                <p onClick={select}>Menu Select</p>
                <DecompositionTreeGraph {...config}/>;
            </div>
        )
    };
export default Menu



