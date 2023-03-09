import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
    const [credentials, setCredentials] = useState({
        name: undefined,
        email: undefined,
        phone: undefined,
        password: undefined,
    });


    const { loading, dispatch } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("https://bookingappserver.vercel.app/api/auth/Register", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/login")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };


    const goToLogin = () => {
        navigate("/login")
        window.location.reload(false)
    }


    return (
        <div className="register">
            <div className="lContainer">
                <input
                    type="text"
                    placeholder="name"
                    id="name"
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="email"
                    placeholder="email"
                    id="email"
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="number"
                    placeholder="phone"
                    id="phone"
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
                    Register
                </button>
                <button disabled={loading} onClick={goToLogin} className="lButton">
                    Already have an account? Register
                </button>
                {/* {error && <span>{error.message}</span>} */}
            </div>

            <div className="goBack" onClick={() => {
                navigate(-1)
            }}><img src="https://cdn0.iconfinder.com/data/icons/web-seo-and-advertising-media-1/512/218_Arrow_Arrows_Back-512.png" alt="Go"></img> Back</div>
        </div>
    );
};

export default Register;