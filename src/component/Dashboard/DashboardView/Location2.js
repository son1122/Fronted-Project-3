
import React, {useEffect, useState} from "react";
import GoogleMapReact from 'google-map-react';
import axios from "axios";

const AnyReactComponent = ({ text }) => <div>
<img style={{width:"50px"}} src={"https://static.thenounproject.com/png/2900961-200.png"}/>
    {text}
</div>;

const Restaurant = ({ text }) => <div>
    <img style={{width:"50px"}} src={"https://thumbs.dreamstime.com/b/simple-restaurant-icon-can-flat-design-restaurant-icon-vector-restaurant-symbol-130849249.jpg"}/>
    {text}
</div>;
const Seller = ({ text }) => <div>
    <img style={{width:"50px"}} src={"https://thumbs.dreamstime.com/b/simple-restaurant-icon-can-flat-design-restaurant-icon-vector-restaurant-symbol-130849249.jpg"}/>
    {text}
    <h3>Type Seller</h3>
</div>;
const Customer = ({ text }) => <div>
    <img style={{width:"50px"}} src={"https://thumbs.dreamstime.com/b/simple-restaurant-icon-can-flat-design-restaurant-icon-vector-restaurant-symbol-130849249.jpg"}/>
    {text}
    <h3>Type Customer</h3>
</div>;

export default function Location(){
    const defaultProps = {
        center: {
            lat: 13.685321440355466,
            lng: 100.61134873568787
            // 13.685321440355466, 100.61134873568787
        },
        zoom: 14
    };
    const [dataSeller,setDataSeller]=useState(<Customer
        lat={13}
        lng={100}
        text={"test1"}
    />)
    const [dataCustomer,setDataCustomer] = useState(                        <Customer
        lat={13}
        lng={100}
        text={"test"}
    />)
    const [tag,setTag]=useState(
        <div style={{ height: '90vh', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCSFKSxVPPBC2iwdNQ58GRCfhdlnDFbgtI" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >

            <Restaurant
                lat={13.685321440355466}
                lng={100.61134873568787}
                text="Restaurant "
            />
            {dataCustomer}
            {dataSeller}
        </GoogleMapReact>
    </div>)
    useEffect(()=>{
        axios.get("http://localhost:3001/dashboard/location/seller", {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
            })
            .then((resSeller) => {
                console.log(resSeller.data)
                let tagSell = resSeller.data.map((dataSell,index)=>{
                    console.log(dataSell)
                    return(
                        <Seller
                            lat={dataSell.Location.lat}
                            lng={dataSell.Location.lng}
                            text={dataSell.name}
                            />
                    )
                })
                console.log(tagSell)
                setDataSeller(tagSell)
            }).catch(e=>{

        })
        axios.get("http://localhost:3001/dashboard/location/customer", {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
            })
            .then((resCustomer) => {
                console.log(resCustomer.data)
                let tagCust = resCustomer.data.map((dataCus,index)=>{
                    console.log(dataCus)
                    return(
                        <Customer
                            lat={dataCus.Location.lat}
                            lng={dataCus.Location.lng}
                            text={dataCus.name}
                        />
                    )
                })
                setDataCustomer(tagCust)
            }).catch(e=>{
        })
        setTag(
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCSFKSxVPPBC2iwdNQ58GRCfhdlnDFbgtI" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <Restaurant
                    lat={13.685321440355466}
                    lng={100.61134873568787}
                    text="Restaurant "
                />
                {dataCustomer}
                {dataSeller}
            </GoogleMapReact>
        )
    },[])


    useEffect(()=>{
        setTag(            <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCSFKSxVPPBC2iwdNQ58GRCfhdlnDFbgtI" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
            <Restaurant
                lat={13.685321440355466}
                lng={100.61134873568787}
                text="Restaurant "
            />
            {dataCustomer}
            {dataSeller}
        </GoogleMapReact>)
    },[dataSeller])
    return (
        <div>
            {tag}
        </div>
    );
}
