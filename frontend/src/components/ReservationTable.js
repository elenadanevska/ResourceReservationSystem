import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import DeleteButton from './buttons/DeleteButton';
import ShowButton from "./buttons/ShowButton";

let reservations = [
    {
        "id": 1,
        "resourceName": "Smart Board",
        "date": "01.05.2021",
        "time": "14:00-15:00"
    },
    {
        "id": 2,
        "resourceName": "Computer",
        "date": "07.05.2021",
        "time": "12:30-13:00"
    }
]

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

function TableBody() {
    return reservations.map((reservation) => {
        return (
            <tbody key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.resourceName}</td>
                <td>{reservation.date}</td>
                <td>{reservation.time}</td>
                <td>
                    <ShowButton name={reservation.resourceName} date={reservation.date} time={reservation.time} place="R1-FRI" />
                    <DeleteButton type="reservation" />
                </td>
            </tbody>
        );
    })
}

const ReservationTable = props => {
    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="menii2 container">
                    <button className="btn btn-light mb-5">NEW RESERVATION</button>
                    <Table striped bordered hover className="bg-light">
                        {TableHeader()}
                        {TableBody({ reservations: reservations })}
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default ReservationTable