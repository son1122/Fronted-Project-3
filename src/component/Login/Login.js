import "./Login.css"

const Login = () => {
    return (
        <div className={"login-grid"}>
            <img style={{height:"40vh"}} src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}/>
            <form>
                <h2>Username : <input type={"text"} name={"Username"} placeholder={"Username"} /></h2>
                <br/>
                <h2>Password : <input type={"text"} name={"Password"} placeholder={"Password"} /></h2>
            </form>
            <div className={"sign-button-grid sign-button"}>
                <button>SignUp</button>
                <button>Login</button>
            </div>
        </div>
    );
}

export default Login;