import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot, } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import Alert from "../../components/alert/Alert";

const Hotel = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const id = location.pathname.split("/")[2];
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [confirmBooking, setConfirmBooking] = useState(false);


    const { user } = useContext(AuthContext)
    const { date, options } = useContext(SearchContext)
    // console.log("date", "options");
    // console.log(date, options);



    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const dayDifference = function (date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }
;
    const days = dayDifference(date[0].endDate, date[0].startDate);
    // console.log(days);


    const { data, loading } = useFetch(`http://localhost:5000/api/hotels/${id}`);
    // console.log("data");

    const photos = data?.data?.photos.length > 1 ? data?.data?.photos : [
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",

        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",

        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",

    ];

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;
        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }
        setSlideNumber(newSlideNumber)
    };


    const handleClick = () => {
        if (user) {
            setOpenModal(true)
            setConfirmBooking(false)
        } else {
            navigate("/login")
        }
    }

    return (
        <div>
            <Navbar />
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id} setConfirmBooking={setConfirmBooking} />}
            {confirmBooking && <Alert setConfirmBooking={setConfirmBooking} />}

            <Header type="list" />
            {loading ? "loading" : <>
                <div className="hotelContainer">
                    {open && (
                        <div className="slider">
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="close"
                                onClick={() => setOpen(false)}
                            />
                            <FontAwesomeIcon
                                icon={faCircleArrowLeft}
                                className="arrow"
                                onClick={() => handleMove("l")}
                            />
                            <div className="sliderWrapper">
                                <img src={photos[slideNumber]} alt="" className="sliderImg" />
                            </div>
                            <FontAwesomeIcon
                                icon={faCircleArrowRight}
                                className="arrow"
                                onClick={() => handleMove("r")}
                            />
                        </div>
                    )}
                    <div className="hotelWrapper">
                        <button onClick={handleClick} className="bookNow">Reserve or Book Now!</button>
                        <h1 className="hotelTitle">Tower Street Apartments -- {data?.data?.name}</h1>
                        <div className="hotelAddress">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{data?.data?.address}</span>
                        </div>
                        <span className="hotelDistance">
                            Excellent location – {data?.data?.distance}m from center
                        </span>
                        <span className="hotelPriceHighlight">
                            Book a stay over $114 at this property and get a free airport taxi
                        </span>
                        <div className="hotelImages">
                            {photos.map((photo, i) => (
                                <div className="hotelImgWrapper" key={i}>
                                    <img
                                        onClick={() => handleOpen(i)}
                                        src={photo}
                                        alt=""
                                        className="hotelImg"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="hotelDetails">
                            <div className="hotelDetailsTexts">
                                <h1 className="hotelTitle">{data?.data?.title}</h1>
                                <p className="hotelDesc">
                                    {data?.data?.description}
                                </p>
                            </div>
                            <div className="hotelDetailsPrice">
                                <h1>Perfect for a {days}-night stay!</h1>
                                <span>
                                    Located in the real heart of Krakow, this property has an
                                    excellent location score of 9.8!
                                </span>
                                <h2>
                                    <b>${data?.data?.cheapestPrice * days * options.room}</b> ({days} nights)
                                </h2>
                                <button onClick={handleClick}>Reserve or Book Now!</button>
                            </div>
                        </div>
                    </div>
                    <MailList />
                    <Footer />
                </div>
            </>}
        </div>
    );
};

export default Hotel;





