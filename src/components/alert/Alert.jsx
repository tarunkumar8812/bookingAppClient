import { useNavigate } from "react-router-dom";
import "./alert.css";

const Alert = ({  setConfirmBooking }) => {
    const navigate = useNavigate();

    const handleBookingAlert = () => {
        setConfirmBooking(false)
        navigate("/")
    }

    return (
        <>

            {<div className="bookingAlert" >
                <h2>Booking Confirm</h2>
                <p>Booking details are sent to your email and mobile number</p>
                <button onClick={handleBookingAlert}> Go to Home Page </button>
            </div>}
        </>


    )
}

export default Alert