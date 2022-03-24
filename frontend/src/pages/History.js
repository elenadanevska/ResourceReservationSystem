import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Axios from "axios";
import Table from "react-bootstrap/Table";

const History = props => {
    var date = new Date();
    const [fromDate, setFromDate] = useState(date);
    const [toDate, setToDate] = useState(date);
    const [showHistory, setShowHistory] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [resources, setResources] = useState({});
    const current_user = JSON.parse(localStorage.getItem("user"));
    let skipped = 0;

    useEffect(() => {
        Axios.get(`http://localhost:3001/reservations/user/${current_user._id}`).then((response) => {
            let data = response.data;
            setReservations(response.data);
            data.forEach(res => {
                Axios.get(`http://localhost:3001/resources/${res.resource}`).then((r) => {
                    let newResource = {};
                    newResource[r.data._id] = r.data.name;
                    setResources(resources => ({ ...resources, ...newResource }))
                });
            })
        });
    }, []);

    const TableHeader = () => {
        return (
            <thead className="bg-info">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Resource Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                </tr>
            </thead>
        );
    }

    const handleShow = () => {
        setShowHistory(true)
    }

    const onFromDateChange = e => {
        setFromDate(e);
        setShowHistory(false);
    };

    const onToDateChange = e => {
        setToDate(e);
        setShowHistory(false);
    };

    return (
        <div>
            <h2 className="page-header">
                Previous Reservations
            </h2>
            <div className="row containerr">
                <div className="col text-center"></div>
                <div className="col text-center">
                    From Date:
                    <DatePicker
                        selected={fromDate}
                        onSelect={onFromDateChange}
                        dateFormat="dd-MM-yyyy"
                        maxDate={date}
                        className="datepicker"
                    />
                </div>
                <div className="col text-center">
                    To Date:
                    <DatePicker
                        selected={toDate}
                        onSelect={onToDateChange}
                        dateFormat="dd-MM-yyyy"
                        maxDate={date}
                        className="datepicker"
                    />
                </div>
                <div className="col text-center"></div>
            </div>
            <div class="text-center mt-5">
                <button type="button" onClick={handleShow} class="btn btn-primary">Show</button>
            </div>
            <div className={`mt-5 ${showHistory ? "" : "d-none"}`}>
                <div className="container result">
                    <Table striped bordered hover className="bg-light">
                        <TableHeader />
                        {reservations.map((value, index) => {
                            let check_date = new Date(value.date);
                            console.log(check_date);
                            if (check_date >= fromDate && check_date <= toDate) {
                                return <tbody key={value._id}>
                                    <tr>
                                        <td>{index + 1 - skipped}</td>
                                        <td>{resources[value.resource]}</td>
                                        <td>{value.date.slice(0, 10).split('-').reverse().join('/')}</td>
                                        <td>{value.time}</td>
                                    </tr>
                                </tbody>
                            }
                        })}
                    </Table>
                </div>
            </div>
        </div>
    );
}

/*class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromDate: new Date(),
            toDate: new Date(),
            resourceType: '',
            reservations: [],
            skipped: 0,
            showHistory: false
        }
        this.onToDateSelect = this.onToDateSelect.bind(this);
        this.fromDeteSelect = this.fromDeteSelect.bind(this);
    }

    componentDidMount() {
        Axios.get("http://localhost:3001/reservations").then((response) => {
            this.setState({
                reservations: response.data,
            });
            console.log(response.data);
        })
    }

    handleShow = () => {
        this.setState({
            showHistory: true,
        });
        console.log('Click happened');
    }

    onToDateSelect(e) {
        this.setState({ toDate: e })
    };

    fromDeteSelect(e) {
        this.setState({ fromDate: e })
    };

    render() {
        return (
            <div>
                <h2 className="page-header">
                    Previous Reservations
                </h2>
                <div className="row containerr">
                    <div className="col text-center"></div>
                    <div className="col text-center">
                        From Date:
                        <DatePicker
                            selected={this.state.toDate}
                            onSelect={this.fromDeteSelect}
                            dateFormat="dd-MM-yyyy"
                            maxDate={new Date()}
                            className="datepicker"
                        />
                    </div>
                    <div className="col text-center">
                        To Date:
                        <DatePicker
                            selected={this.state.toDate}
                            onSelect={this.onToDateSelect}
                            dateFormat="dd-MM-yyyy"
                            maxDate={new Date()}
                            className="datepicker"
                        />
                    </div>
                    <div className="col text-center"></div>
                </div>
                <div class="text-center mt-5">
                    <button type="button" onClick={this.handleShow} class="btn btn-primary">Show</button>
                </div>
                <div className={`mt-5 ${this.state.showHistory ? "" : "d-none"}`}>
                    <div className="container result">
                        <Table striped bordered hover className="bg-light">
                            <TableHeader />
                            {this.state.reservations.map((value, index) => {
                                //if (new Date(value.date) >= new Date()) {
                                return <tbody key={value._id}>
                                    <tr>
                                        <td>{index + 1 - this.state.skipped}</td>
                                        <td>{value.resource_name}</td>
                                        <td>{value.date.slice(0, 10).split('-').reverse().join('/')}</td>
                                        <td>{value.time}</td>
                                    </tr>
                                </tbody>
                            })}
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
};*/

export default History;