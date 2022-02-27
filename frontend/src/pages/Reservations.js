import React from 'react';
//import ReservationTable from '../components/ReservationTable.js';
import Table from '../components/Table.js';
import DeleteButton from '../components/buttons/DeleteButton';
import ShowButton from "../components/buttons/ShowButton";


let reservation = [
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

const customerTableHead = [
    '',
    'Resource name',
    'Date',
    'Time',
    'Actions',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.resourceName}</td>
        <td>{item.date}</td>
        <td>{item.time}</td>
        <td>
            <ShowButton name={reservation.resourceName} date={reservation.date} time={reservation.time} place="R1-FRI" />
            <DeleteButton type="reservation" />
        </td>
    </tr>
)

const Reservations = () => {
    return (
        <div>
            <h2 className="page-header">
                Reservations
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={reservation}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reservations;