import "./Login.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = e => {
        e.preventDefault()
        axios.post("http://localhost:3001/auth/login", formData)
            .then(res => {
                console.log(res.data);
                let token = res.data
                localStorage.setItem("jwt", token)
                props.setLogin(true)
                navigate('/order')
            }).catch(err=>{
                console.log(err)
        })

    }


    return (
        <div className={"login-grid"}>
            <img style={{height:"40vh"}} src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}/>
            <form>
                <h2>Username : <input type={"text"} name={"username"} placeholder={"Username"} onChange={handleChange
                }/></h2>
                <br/>
                <h2>Password : <input type={"text"} name={"password"} placeholder={"Password"} onChange={handleChange
                }/></h2>
                <input type={"button"} onClick={handleSubmit} value={"Login"}/>
            </form>
            {/*<div className={"sign-button-grid sign-button"}>*/}
                <button onClick={()=>navigate("/signup")}>SignUp</button>

            {/*</div>*/}
        </div>
    );
}

export default Login;