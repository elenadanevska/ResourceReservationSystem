import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import Axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

let times = [
    "08:00 - 08:30",
    "08:30 - 09:00",
    "09:00 - 09:30",
    "09:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "11:30 - 12:00",
    "12:00 - 12:30",
    "12:30 - 13:00",
    "13:30 - 14:00",
    "14:30 - 15:00",
    "15:00 - 15:30",
    "15:30 - 16:00",
    "16:00 - 16:30",
    "16:30 - 17:00",
];

const TableButton = (props) => {
    return <div>
        {props.content}
        <div className="row"><div className="col"></div></div>
        <div className="row"><div className={process.txtClasses}>{props.buttonText}</div></div>
    </div>
}

const RenderButton = (props) => {
    let index = [];
    for (let i = props.min; i < props.max; i++) {
        index.push(times[i]);
    }
    let result = index.map(i => {
        if (props.busy.includes(i))
            return <button className={`col btn-danger`} key={i} disabled>
                <TableButton content={i} buttonText="Busy" txtClasses="col txt-secondary" />
            </button>
        else if (props.owned.includes(i))
            return <button className={`col btn/primary`} key={i} disabled>
                <TableButton content={i} buttonText="Owned" txtClasses="col txt-secondary" />
            </button>
        else if (props.reserve.includes(i))
            return <button className={`col btn-info`} key={i}
                onClick={() => props.handleTimeSelect(i)}>
                <TableButton content={i} buttonText="Selected" txtClasses="col" />
            </button>
        else
            return <button className={`col btn-secondary`} key={i}
                onClick={() => props.handleTimeSelect(i)}>
                <TableButton content={i} buttonText="Free" txtClasses="col  text-secondary" />
            </button>
    }
    )
    return <div className="row">{result}</div>
}


export default class ReserveDayTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            busy: ["08:30 - 09:00"],
            owned: ["10:00 - 10:30"],
            reserve: [],
        }
        this.selectDate = this.selectDate.bind(this);
        this.handleTimeSelect = this.handleTimeSelect.bind(this)
    }

    selectDate(e) {
        this.setState({ date: e })
    }

    handleTimeSelect(i) {
        if (this.state.reserve.includes(i)) {
            let tempArray = this.state.reserve;
            tempArray.splice(this.state.reserve.indexOf(i), 1)
            this.setState({ reserve: tempArray })
        }
        else
            this.setState({ reserve: [...this.state.reserve, i] })
    }
    handleSubmit() {
        console.log("submitted");
    }
    render() {
        let pass = (({ busy, owned, reserve }) => ({ busy, owned, reserve }))(this.state);
        return (
            <>
                <div className="container mt-5">
                    <h3 className="page-header">Book time</h3>
                    <div className="row">
                        <table style={{ textAlign: "left", borderSpacing: "20px", borderCollapse: "separate" }}>
                            <tbody>
                                <tr>
                                    <td className="">Date:
                                        <DatePicker
                                            selected={this.state.date}
                                            onSelect={this.selectDate}
                                            dateFormat="dd-MM-yyyy"
                                            minDate={new Date()}
                                            disabledDays={[{ daysOfWeek: [0, 6] }]}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="">
                        <RenderButton min={0} max={4} {...pass} handleTimeSelect={this.handleTimeSelect} />
                        <RenderButton min={4} max={8} {...pass} handleTimeSelect={this.handleTimeSelect} />
                        <RenderButton min={8} max={12} {...pass} handleTimeSelect={this.handleTimeSelect} />
                        <RenderButton min={12} max={16} {...pass} handleTimeSelect={this.handleTimeSelect} />
                    </div>
                    <div className='mt-5 row text-center'>
                        <div className="col">
                            <button className="btn bg-primary" onClick={() => this.handleSubmit()} disabled={this.state.reserve.length === 0 ? true : false}>Reserve</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


