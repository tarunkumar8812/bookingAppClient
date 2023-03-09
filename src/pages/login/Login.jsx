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

    };


    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("https://bookingappserver.vercel.app/api/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });

            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };


    const goToRegister = () => {
        navigate("/register")
        credentials.username = undefined
        credentials.password = undefined
        window.location.reload(false)
    }


    const handleForgotPassword = () => {
        navigate("/register")
        alert("Password reset link is sent to your email!!")
        credentials.username = undefined
        credentials.password = undefined
        window.location.reload(false)

    }


    return (
        <div className="login">
            <div className="lContainer">
                {error && <span>{error.message}</span>}

                <input
                    type="text"
                    placeholder="email"
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
                    I am a new User? Register
                </button>
                {error && <button disabled={loading} onClick={handleForgotPassword} className="lButton">
                    Forgot password
                </button>}
            </div>
            <div className="goBack" onClick={() => {
                navigate(-1)
            }}><img src="https://cdn0.iconfinder.com/data/icons/web-seo-and-advertising-media-1/512/218_Arrow_Arrows_Back-512.png" alt="Go"></img> Back</div>
        </div>
    );
};

export default Login;