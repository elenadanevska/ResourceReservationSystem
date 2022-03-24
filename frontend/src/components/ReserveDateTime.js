import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import Axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const ReserveDayTime = props => {
    const [bookingDate, setBookingDate] = useState(new Date());
    const [busy, setBusy] = useState([]);
    const [owned, setOwned] = useState([]);
    const [reserve, setReserve] = useState([]);
    let current_user = JSON.parse(localStorage.getItem("user"));
    const { id } = useParams();
    let times = [
        "08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30", "09:30 - 10:00", "10:00 - 10:30",
        "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00", "12:00 - 12:30", "12:30 - 13:00",
        "13:30 - 14:00", "14:30 - 15:00", "15:00 - 15:30", "15:30 - 16:00", "16:00 - 16:30", "16:30 - 17:00",
    ];

    /*
        constructor(props) {
            super(props);
            this.state = {
                bookingDate: new Date(),
                resourceName: "",
                busy: [],
                owned: [],
                reserve: [],
                //id: this.props.match.params.id
                id: this.props.match.params.id,
                user: null
            }
            this.selectDate = this.selectDate.bind(this);
            this.handleTimeSelect = this.handleTimeSelect.bind(this)
        }
        */

    useEffect(() => {
        Axios.get(`http://localhost:3001/reservations/${id}`, {
            params: {
                date: bookingDate,
            }
        }).then((response) => {
            let reserved = [];
            for (var i = 0; i < response.data.length; i++) {
                reserved = reserved.concat(response.data[i].time);
            }
            setBusy(reserved);
        }).catch(errors => {
            console.error(errors);
        });

    }, [bookingDate]);

    const TableButton = (props) => {
        return <div>
            {props.content}
            <div className="row"><div className="col"></div></div>
            <div className="row"><div className={process.txtClasses}>{props.buttonText}</div></div>
        </div>
    }

    const onDateChange = e => {
        console.log(new Date(e));
        setBookingDate(e);
        setReserve([]);
        Axios.get(`http://localhost:3001/reservations/${id}`, {
            params: {
                date: e,
            }
        }).then((response) => {
            console.log(response.data);
            let reserved = [];
            for (var i = 0; i < response.data.length; i++) {
                reserved = reserved.concat(response.data[i].time);
            }
            setBusy(reserved);
        });
    };

    const handleTimeSelect = (i) => {
        if (reserve.includes(i)) {
            let tempArray = reserve;
            tempArray.splice(reserve.indexOf(i), 1)
            setReserve(tempArray);
        }
        else {
            console.log("setting...");
            setReserve([...reserve, i]);
        }
        console.log(reserve);
    }

    const handleSubmit = e => {
        console.log(current_user);
        if (current_user) {
            Axios.post(`http://localhost:3001/reservations/${id}`, {
                params: {
                    date: bookingDate,
                    selectedTimeSlot: reserve,
                    userId: current_user._id
                }
            }).then((res) => {
                console.log("submitted");
            });
            window.location.reload();
            console.log("submitted");
        }
    }

    return (
        <div className="container mt-5">
            <h3 className="page-header">Make a reservation</h3>
            <div className="row">
                <table style={{ textAlign: "left", borderSpacing: "20px", borderCollapse: "separate" }}>
                    <tbody>
                        <tr>
                            <td className="">Date:
                                <DatePicker
                                    selected={bookingDate}
                                    onSelect={onDateChange}
                                    dateFormat="dd-MM-yyyy"
                                    minDate={new Date()}
                                    disabledDays={[{ daysOfWeek: [0, 6] }]}
                                    className="datepicker"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='row'>
                {times.map((i, index) => {
                    if (index % 4 == 0) {
                        return <hr className='mb-0 mt-0' />
                    }
                    if (busy.includes(i)) {
                        return <button className={`col btn-danger`} key={i} disabled>
                            <div>
                                {i}
                                <div className="row"><div className="col"></div></div>
                                <div className="row"><div className="col txt-secondary">Busy</div></div>
                            </div>
                        </button>
                    } else if (owned.includes(i)) {
                        return <button className={`col btn/primary`} key={i} disabled>
                            <div>
                                {i}
                                <div className="row"><div className="col"></div></div>
                                <div className="row"><div className="col txt-secondary">Owned</div></div>
                            </div>
                        </button>
                    } else if (reserve.includes(i)) {
                        console.log("in reserve");
                        var rArray = reserve;
                        console.log(rArray);
                        return <button className={`col btn-info`} key={i}
                            onClick={() => handleTimeSelect(i)}>
                            <div>
                                {i}
                                <div className="row"><div className="col"></div></div>
                                <div className="row"><div className="col">Selected</div></div>
                            </div>
                        </button>
                    } else {
                        return <button className={`col btn-secondary`} key={i}
                            onClick={() => handleTimeSelect(i)}>
                            <div>
                                {i}
                                <div className="row"><div className="col"></div></div>
                                <div className="row"><div className="col text-secondary">Free</div></div>
                            </div>
                        </button>
                    }
                })}
            </div>
            <div className='mt-5 row text-center'>
                <div className="col">
                    <button className="btn bg-primary" onClick={() => handleSubmit()} disabled={reserve.length === 0 ? true : false}>Reserve</button>
                </div>
            </div>
        </div>
    )
}

export default ReserveDayTime;


