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
        console.log(e.target.value);

    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("http://localhost:5000/api/auth/Register", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };


    const goToLogin = () => {
        navigate("/login")

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
                    Already Register
                </button>
                {/* {error && <span>{error.message}</span>} */}
            </div>
        </div>
    );
};

export default Register;