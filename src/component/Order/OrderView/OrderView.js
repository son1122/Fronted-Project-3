import "./OrderView.css"
const OrderView = () => {
    let data = [1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    data.map(dat=>{
        return(
            <img style={{width:"300px"}} src={"https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"}/>
        )
    })
    return (
        <div className={"order-view-grid"}>
            <p>Order View</p>
            <p>Search</p>
            <div className={"slide-horizon"}>
                    <img style={{width:"300px"}} src={"https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"}/>
                <img style={{width:"300px"}} src={"https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"}/>
                <img style={{width:"300px"}} src={"https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"}/>
                <img style={{width:"300px"}} src={"https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"}/>
                <img style={{width:"300px"}} src={"https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"}/>
                <img style={{width:"300px"}} src={"https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"}/>
                <img style={{width:"300px"}} src={"https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"}/>
                <img style={{width:"300px"}} src={"https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"}/>
                <img style={{width:"300px"}} src={"https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"}/>
            </div>

            <p>Category</p>
        </div>
    );
}

export default OrderView;