import React, { useState, useEffect } from 'react';
import DeleteButton from '../components/buttons/DeleteButton';
import Table from "react-bootstrap/Table";
import ShowButton from "../components/buttons/ShowButton";
import Axios from "axios";

const Reservations = () => {

    const [reservations, setReservations] = useState([]);
    const [skipped, setSkipped] = useState(0);

    useEffect(() => {
        Axios.get("http://localhost:3001/reservations").then((response) => {
            setReservations(response.data);
        })
    }, []);

    function TableHeader() {
        return (
            <thead className="bg-info">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Resource Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
        );
    }

    function cutDate(date) {
        return date.slice(0, 10).split('-').reverse().join('/');
    }

    return (
        <div>
            <h2 className="page-header">
                Reservations
            </h2>
            {console.log(reservations)}
            <div className="container">
                <Table striped bordered hover className="bg-light">
                    {TableHeader()}
                    {reservations.map((value, index) => {
                        //if (new Date(value.date) >= new Date()) {
                        const reservationDate = cutDate(value.date);
                        return <tbody key={value._id}>
                            <tr>
                                <td>{index + 1 - skipped}</td>
                                <td>{value.resource_name}</td>
                                <td>{reservationDate}</td>
                                <td>{value.time}</td>
                                <td>
                                    <ShowButton name={value.resource_name} date={reservationDate} time={value.time} place="R1-FRI" />
                                    <DeleteButton type="reservation" />
                                </td>
                            </tr>
                        </tbody>
                        // } else {
                        //    skipped++;
                        //}
                    })}
                </Table>
            </div>
        </div>
    );
}

export default Reservations;