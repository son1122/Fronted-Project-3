import "./Login.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = (props) => {
    const navigate = useNavigate();
    const handleSubmit = e => {
        // e.preventDefault()
        // let formData = "data-that-send"
        // axios.post("http://localhost:3001/auth/login", formData)
        //     .then(res => {
        //         console.log(res.data);
        //         let token = res.data
        //         localStorage.setItem("jwt", token)
        //     }).catch(err=>{
        //
        // })
        if(username=="admin"&&password=="1234"){
            props.setLogin(true)
        }
    }

    let [username,setUsername]= useState()
    let [password,setPassword]= useState()

    return (
        <div className={"login-grid"}>
            <img style={{height:"40vh"}} src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}/>
            <form>
                <h2>Username : <input type={"text"} name={"Username"} placeholder={"Username"} onChange={(e)=>{
                    setUsername(e.target.value)
                }}/></h2>
                <br/>
                <h2>Password : <input type={"text"} name={"Password"} placeholder={"Password"} onChange={(e)=>{
                    setPassword(e.target.value)}
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