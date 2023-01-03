import "./DashboardSide.css"
import { Card} from 'antd';
const DashboardSide = (props) => {
    const num = ["summary","Menu","Order","Customer","Employer","Ingredient","Seller","Location"]
    let list = num.map((i,index)=>{

        return(
            <div onClick={()=>{props.setSelect(index)}}>
                <h2>{i}</h2>
            </div>
        )
    })
    return (
        <div className={"dashboard-side-grid"}>
            <h2>Dashboard Category</h2>
            {list}
        </div>
    );
}

export default DashboardSide;