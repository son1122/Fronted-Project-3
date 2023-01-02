import "./DashboardView.css"
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { DecompositionTreeGraph } from '@ant-design/graphs';
import axios from "axios";

const Menu = () => {
    const [menuItem,setMenuitem]=useState(<option value="loading">Loading</option>)
    const items = [
        {
            label: '1st menu item',
            key: '1',
        },
        {
            label: '2nd menu item',
            key: '2',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
    const [data,setData] = useState( {
        value: {
            title: 'Please Select Menu',
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
        // behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
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
        const select = axios.get('http://localhost:3001/dashboard/menuitem',{
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }).then(resu=>{

            console.log(resu)
                let data = resu.data.map((name,index)=>{
                    console.log(name)
                    return(
                    <option value={name.name} key={index}>{name.name}</option>
                    )
                })
            console.log(data)
            setMenuitem(data)
        })
    },[]);

        return(
            <div className={"grid28"}>
                <div>
                    <h1>Menu Ingredient View</h1>
                    <form onSubmit>
                    <select name="<menu>" id="menu">
                        {menuItem}
                    </select>
                        <input type={"submit"} name={"Submit"}/>
                    </form>
                </div>
                <DecompositionTreeGraph {...config}/>;
            </div>
        )
    };
export default Menu



