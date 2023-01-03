
import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>
<img style={{width:"50px"}} src={"https://static.thenounproject.com/png/2900961-200.png"}/>
    {text}
</div>;

export default function Location(){
    const defaultProps = {
        center: {
            lat: 59.99835602,
            lng: 30.01502627
        },
        zoom: 11
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '90vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCSFKSxVPPBC2iwdNQ58GRCfhdlnDFbgtI" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
                
            </GoogleMapReact>
        </div>
    );
}
