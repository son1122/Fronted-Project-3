import "./Signup.css"
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const Signup = () => {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const[email,setEmail]=useState("");
    const[phone,setPhone]=useState("");
    const navigate = useNavigate();
    function validateEmail() {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(email)) {
            return true;
        } else {
            alert('Please enter a valid email');
            return false;
        }
    }

    //make sure entered password is correct regex
    function validatePassword() {
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if(password===confirmPassword){
        if (regex.test(password)) {
            return true;
        } else {
            alert('Password must have at least: 1 lowercase, 1 uppercase, 1 number at least 8 character and 1 special character');
            return false;
        }}
        else{
            alert('password not match')
        }
    }

    function validateForm() {
        if (validateEmail() && validatePassword()) {
            axios.post(`http://localhost:3001/auth/signup`, {
                username:username,
                password:password,
                email:email,
                phone:phone,
            })
                .then(function (response) {
                    console.log(response.data.status);
                    if(response.data.status=="signUp"){
                        navigate('/login')
                    }else{
                        if("error SequelizeUniqueConstraintError: Validation error"==response.data){
                            alert("User name is already use")
                        }else{
                        alert("error please try again")
                    }}
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    // admin,password,owner@mail.com,000-000-0000


    const signUp=(e)=>{
        e.preventDefault();
        validateForm()
    }
    return (
        <div>
            <form onSubmit={signUp}>
                <p>Username     : </p><input type="text" name="username" onChange={(e)=>{setUsername(e.target.value)}}/>
                <p>Password     : </p><input type="text" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <p>Confirm Pass : </p><input type="text" name="confirmPassword" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                <p>Email        : </p><input type="text" name="email"onChange={(e)=>{setEmail(e.target.value)}}/>
                <p>Phone Number : </p><input type="text" name="phone" onChange={(e)=>{setPhone(e.target.value)}}/><br></br>
                <input type="submit" value="SignUp"/>
            </form>
        </div>
    );
}

export default Signup;