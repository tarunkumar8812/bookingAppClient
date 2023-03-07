import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(e.target.value);

    };


    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });

            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };


    const goToRegister = () => {
        navigate("/register")
    }


    const handleForgotPassword = () => {
        navigate("/register")
        alert("Password reset link is sent to your email!!")
    }


    return (
        <div className="login">
            <div className="lContainer">
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                    className="lInput"
                />
                <button disabled={loading} onClick={handleClick} className="lButton">
                    Login
                </button>
                <button disabled={loading} onClick={goToRegister} className="lButton">
                    Register
                </button>
                {error && <span>{error.message}</span>}
                {error && <button disabled={loading} onClick={handleForgotPassword} className="lButton">
                    Forgot password
                </button>}
            </div>
        </div>
    );
};

export default Login;