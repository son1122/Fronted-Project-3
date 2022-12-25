import "./Signup.css"
const Signup = () => {
    // function validateEmail() {
    //     const email = document.getElementById('email').value;
    //     const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     if (regex.test(email)) {
    //         return true;
    //     } else {
    //         alert('Please enter a valid email');
    //         return false;
    //     }
    // }
    //
    // //make sure entered password is correct regex
    // function validatePassword() {
    //     const regex = /^(?=.*\d)(?=.*[a-z])(?=.* [A-Z]).{6,20}$/;
    //     if (regex.test(password)) {
    //         return true;
    //     } else {
    //         alert('Password must have at least: 1 lowercase, 1 uppercase, 1 number and be between 6 and 20 characters');
    //         return false;
    //     }
    // }
    //
    // //don't let the user submitting their password if it is not valid
    //
    // function validateForm() {
    //     if (validateEmail() && validatePassword()) {
    //         document.getElementById('submit').disabled = false;
    //         alert('Please enter a valid email or password');
    //     }
    // }

    return (
        <div>
            <h2>Signup</h2>
        </div>
    );
}

export default Signup;