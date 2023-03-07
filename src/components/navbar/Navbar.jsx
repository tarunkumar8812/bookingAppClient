
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    // console.log("user");
    // console.log(user);

    const handleLogin = () => {
        navigate("/login")
    }
    const handleRegister = () => {
        navigate("/register")
    }
    const handleLogout = () => {

        localStorage.setItem("user", null)
        navigate("/")
        window.location.reload(true)
    }

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <span className="logo">booking app</span>
                </Link>
                {user ? <> <div>Hi {user.username}<button type="submit" className="navButton" onClick={handleLogout}>Logout</button></div></> : (
                    <div className="navItems">
                        <button className="navButton" onClick={handleRegister}>Register</button>
                        <button className="navButton" onClick={handleLogin}>Login</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;