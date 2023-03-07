import React, { useContext, useState } from 'react'
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    const handleOption = (name, operation) => {

        setOptions(prev => {
            return {
                ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    const { dispatch } = useContext(SearchContext)

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } })
        navigate('/hotels', { state: { destination, date, options } })
    }

    return (
        <div className='header' >
            <div className={type === "list" ? 'headerContainer listMode' : "headerContainer"}>
                <div className='headerList'>

                    <div className='headerListItem active'>
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>

                    {/* ---------------------------------------- */}

                    <div className='headerListItem'>
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>

                    {/* ---------------------------------------- */}

                    <div className='headerListItem'>
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>

                    {/* ---------------------------------------- */}

                    <div className='headerListItem'>
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    {/* ---------------------------------------- */}

                    <div className='headerListItem'>
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                    {/* ---------------------------------------- */}


                </div>
                {type !== "list" &&
                    <>
                        <h1 className='headerTitle'>A lifetime of discount? It's genius</h1>
                        <p className='headerDesc' >
                            Get rewarded for your travels - unlock instant saving of 10% or more with a free TarunBooking account
                        </p>
                        {!user && <button className='headerBtn'>Sign in / Register</button>}
                        <div className='headerSearch'>
                            <div className='headerSearchItem'>
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input type="text" placeholder='Where are you going' className='headerSearchInput'
                                    onChange={(e) => { setDestination(e.target.value) }}
                                />
                            </div>
                            {/* -------------------------------------- */}
                            <div className='headerSearchItem'>
                                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                                <span onClick={() => {
                                    setOpenDate(!openDate)
                                    setOpenOptions(false)
                                }} className='headerSearchText'>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    className="date"
                                />}
                            </div>
                            {/* -------------------------------------- */}
                            <div className='headerSearchItem'>
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span onClick={() => {
                                    setOpenOptions(!openOptions)
                                    setOpenDate(false)
                                }} className='headerSearchText'>{`${options.adult} adults ${options.children} children ${options.room} rooms`}</span>
                                {openOptions && <div className='options'>
                                    <div className='optionItem'>
                                        <sapn className="optionText" >Adult</sapn>
                                        <div className='optionCounter'>
                                            <button disabled={options.adult <= 1} className='optionCounterButton' onClick={() => handleOption("adult", "d")}>-</button>
                                            <span className='optionCounterNumber'>{options.adult}</span>
                                            <button className='optionCounterButton' onClick={() => handleOption("adult", "i")}>+</button>
                                        </div>
                                    </div>
                                    {/* --------------------- */}
                                    <div className='optionItem'>
                                        <sapn className="optionText" >Children</sapn>
                                        <div className='optionCounter'>
                                            <button disabled={options.children < 1} className='optionCounterButton' onClick={() => handleOption("children", "d")}>-</button>
                                            <span className='optionCounterNumber'>{options.children}</span>
                                            <button className='optionCounterButton' onClick={() => handleOption("children", "i")}>+</button>
                                        </div>
                                    </div>
                                    {/* --------------------- */}
                                    <div className='optionItem'>
                                        <sapn className="optionText" >Room</sapn>
                                        <div className='optionCounter'>
                                            <button disabled={options.room <= 1} className='optionCounterButton' onClick={() => handleOption("room", "d")}>-</button>
                                            <span className='optionCounterNumber'>{options.room}</span>
                                            <button className='optionCounterButton' onClick={() => handleOption("room", "i")}>+</button>
                                        </div>
                                    </div>
                                    {/* --------------------- */}
                                </div>
                                }

                            </div>
                            {/* -------------------------------------- */}
                            <div className='headerSearchItem'>
                                <button className='headerBtn' onClick={handleSearch}>Search</button>
                            </div>
                            {/* -------------------------------------- */}

                        </div>

                    </>
                }
            </div>
        </div>
    )
}

export default Header