
import React, {useEffect} from "react";
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

export default function Location(){
    useEffect(()=>{
        axios.get("http://localhost:3001/location/seller", {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
            })
            .then((resSeller) => {

            }).catch(e=>{

        })
        axios.get("http://localhost:3001/location/customer", {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
            })
            .then((resCustomer) => {

            }).catch(e=>{

        })
    },[])
    const defaultProps = {
        center: {
            lat: 13.685321440355466,
            lng: 100.61134873568787
            // 13.685321440355466, 100.61134873568787
        },
        zoom: 14
    };

    return (
        // Important! Always set the container height explicitly
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

            </GoogleMapReact>
        </div>
    );
}
