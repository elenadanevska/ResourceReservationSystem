import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Axios from "axios";
import Table from "react-bootstrap/Table";

const TableHeader = (props) => {
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

class History extends Component {

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
                            onSelect={this.selectDate}
                            dateFormat="dd-MM-yyyy"
                            minDate={new Date()}
                            className="datepicker"
                        />
                    </div>
                    <div className="col text-center">
                        To Date:
                        <DatePicker
                            selected={this.state.toDate}
                            onSelect={this.selectDate}
                            dateFormat="dd-MM-yyyy"
                            minDate={new Date()}
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
};

export default History;