import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import Axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import slo from "../translations/slo.json";
import en from "../translations/en.json";

const ReserveDayTime = proFps => {
    const [bookingDate, setBookingDate] = useState(new Date());
    const [busy, setBusy] = useState([]);
    const [owned, setOwned] = useState([]);
    const [reserve, setReserve] = useState([]);
    const [selected, setSelected] = useState([]);
    const [resourceName, setResourceName] = useState("")
    const current_user = JSON.parse(localStorage.getItem("user"));
    const { id } = useParams();
    let slovenian = current_user.slovenian;
    let times = [
        "08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30", "09:30 - 10:00", "10:00 - 10:30",
        "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00", "12:00 - 12:30", "12:30 - 13:00",
        "13:30 - 14:00", "14:30 - 15:00", "15:00 - 15:30", "15:30 - 16:00", "16:00 - 16:30", "16:30 - 17:00",
    ];
    let dayOfWeek = bookingDate.getDay()
    let exactDate = eval(bookingDate.getMonth() + 1) + "/" + bookingDate.getDate() + "/" + bookingDate.getFullYear();
    bookingDate.getDate()

    useEffect(() => {
        Axios.get(`http://localhost:3001/reservations/${id}`, {
            params: {
                date: bookingDate,
            }
        }).then((response) => {
            console.log(response.data)
            setOwnedReserved(response.data)
        }).catch(errors => {
            console.error(errors);
        });

        Axios.get(`http://localhost:3001/resources/${id}`).then((response) => {
            console.log(response.data["name"]);
            setResourceName(response.data["name"])
        }).catch(errors => {
            console.error(errors);
        });

    }, [bookingDate]);

    function setOwnedReserved(data) {
        let reserved = [];
        let mine = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].user === current_user._id) {
                mine = mine.concat(data[i].time);
            } else {
                reserved = reserved.concat(data[i].time);
            }
        }
        setBusy(reserved);
        setOwned(mine);
    }

    const onDateChange = e => {
        setBookingDate(e);
        setReserve([]);
        Axios.get(`http://localhost:3001/reservations/${id}`, {
            params: {
                date: e,
            }
        }).then((response) => {
            setOwnedReserved(response.data)
        });
    };

    const handleTimeSelect = (i) => {
        if (reserve.includes(i)) {
            let tempArray = reserve;
            tempArray.splice(reserve.indexOf(i), 1)
            setReserve(tempArray);
            setSelected([...tempArray, i]);
        }
        else {
            setReserve([...reserve, i]);
        }
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
        }
        setOwned(owned.concat(reserve));
        setReserve([]);
    }

    function changeDateTommorow(up) {
        var tommorow = bookingDate;
        if (up) tommorow.setDate(bookingDate.getDate() + 1);
        else tommorow.setDate(bookingDate.getDate() - 1);
        setBookingDate(new Date(tommorow));
        setReserve([]);
    }

    const CalenderTimeSlot = (props) => {
        return <div>
            {props.i}
            <div className="row"><div className="col"></div></div>
            <div className="row"><div className={`col ${props.style}`}>{props.buttonText}</div></div>
        </div>
    }

    return (
        <div className="container mt-5">
            <h3 className="page-header">{slovenian ? slo.titles.reserve : en.titles.reserve}</h3>
            <h5 className='mb-4 mt-2 text-center text-primary'>{resourceName.toUpperCase()}</h5>
            <div className="row">
                <div className='mt-3 col'>
                    <span className='calendarArrow' onClick={e => changeDateTommorow(false)}>{"<- "}
                        {slovenian ? slo.resources_page.yesterday : en.resources_page.yesterday}
                    </span>
                </div>
                <div className='mb-3 text-center col'>
                    {slovenian ? slo.resources_page.pick_date : en.resources_page.pick_date}
                    <DatePicker
                        selected={bookingDate}
                        onSelect={onDateChange}
                        dateFormat="dd-MM-yyyy"
                        minDate={new Date()}
                        disabledDays={[{ daysOfWeek: [0, 6] }]}
                        className="datepicker text-center"
                        popperPlacement="bottom"
                    />
                </div>
                <div className='mt-3 col text-end'>
                    <span className='calendarArrow' onClick={e => changeDateTommorow(true)}>
                        {slovenian ? slo.resources_page.tommorow : en.resources_page.tommorow}
                        {" ->"}
                    </span>
                </div>
            </div>
            <div className='row reservationButtons'>
                {times.map((i, index) => {
                    if (index % 4 === 0) {
                        return <hr className='mb-0 mt-0' />
                    }
                    if (busy.includes(i)) {
                        return <button className={`col btn-danger`} key={i} disabled>
                            <CalenderTimeSlot buttonText={slovenian ? slo.resources_page.button.busy : en.resources_page.button.busy} style="txt-secondary" i={i} />
                        </button>
                    } else if (owned.includes(i)) {
                        return <button className={`col btn-primary`} key={i} disabled>
                            <CalenderTimeSlot buttonText={slovenian ? slo.resources_page.button.owned : en.resources_page.button.owned} style="txt-secondary" i={i} />
                        </button>
                    } else if (reserve.includes(i)) {
                        return <button className={`col btn-info`} key={i}
                            onClick={() => handleTimeSelect(i)}>
                            <CalenderTimeSlot buttonText={slovenian ? slo.resources_page.button.selected : en.resources_page.button.selected} style="" i={i} />
                        </button>
                    } else {
                        return <button className={`col btn-secondary`} key={i}
                            disabled={(new Date() > new Date((exactDate + ' ' + i.split(" ")[0])) || dayOfWeek === 6 || dayOfWeek === 0) ? true : false} onClick={() => handleTimeSelect(i)}>
                            <CalenderTimeSlot buttonText={slovenian ? slo.resources_page.button.free : en.resources_page.button.free} style="txt-secondary" i={i} />
                        </button>
                    }
                })}
            </div>
            <div className='mt-5 row text-center'>
                <div className="col">
                    <button className="btn bg-primary text-white" onClick={() => handleSubmit()} disabled={reserve.length === 0 ? true : false}>
                        {slovenian ? slo.resources_page.button.reserve : en.resources_page.button.reserve}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReserveDayTime;


