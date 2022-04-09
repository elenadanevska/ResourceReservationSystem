/*import React, { useState, useEffect } from 'react';
import DeleteButton from '../components/buttons/DeleteButton';
import Table from "react-bootstrap/Table";
import ShowButton from "../components/buttons/ShowButton";
import Axios from "axios";

const ReservationTable = (props) => {
    const [reservations, setReservations] = useState([]);
    const [resources, setResources] = useState({});
    const [sortDateUp, setSortDateUp] = useState(true);
    const [sortResourceUp, setSortResourceUp] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    let skipped = 0;
    let notFound = true

    useEffect(() => {
        Axios.get(`http://localhost:3001/reservations/user/${user._id}`).then((response) => {
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

    function cutDate(date) {
        return date.slice(0, 10).split('-').reverse().join('/');
    }

    function TableHeader() {
        return (
            <thead className="bg-info">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Resource Name
                        <span className='arrows'>
                            <button className="up-arrow" onClick={() => sortResource()}></button>
                            <button className="down-arrow" onClick={() => sortResource()}></button>
                        </span>
                    </th>
                    <th scope="col">Date
                        <span className='arrows'>
                            <button className="up-arrow" onClick={() => sortDate()}></button>
                            <button className="down-arrow" onClick={() => sortDate()}></button>
                        </span>
                    </th>
                    <th scope="col">Time</th>
                    {props.historyTable ? <th scope="col">Actions</th> : null}
                </tr>
            </thead >
        );
    }

    const RederTable = () => {
        let tableBody = reservations.map((value, index) => {
            if (props.historyTable == false) {
                console.log("its false")
                if (new Date(value.date) >= new Date()) {
                    return <MapReservations value={value} index={index} searchString={props.searchString}></MapReservations>
                } else {
                    skipped++;
                }
            } else {
                let check_date = new Date(value.date);
                if (check_date >= props.fromDate && check_date <= props.toDate) {
                    return <MapReservationsHistory value={value} index={index}></MapReservationsHistory>
                } else {
                    skipped++;
                }
            }
        });
        if (notFound) {
            return <div>No results found</div>
        } else {
            return <Table striped bordered hover className="bg-light">
                {TableHeader()}
                {tableBody}
            </Table>
        }
    }

    const MapReservations = (props) => {
        console.log("Hello" + props.value)
        const reservationDate = cutDate(props.value.date);
        const resourceName = resources[props.value.resource];
        const reservationTime = props.value.time;
        if ((resourceName != undefined && resourceName.toLowerCase().includes(props.searchString)) ||
            reservationDate.includes(props.searchString) || reservationTime.includes(props.searchString)) {
            notFound = false;
            return <tbody key={props.value._id}>
                <tr>
                    <td>{props.index + 1 - skipped}</td>
                    <td>{resourceName}</td>
                    <td>{reservationDate}</td>
                    <td>{reservationTime}</td>
                    <td>
                        <ShowButton name={resourceName} date={reservationDate} time={props.value.time} place="R1-FRI" />
                        <DeleteButton id={props.value._id} name={resourceName} date={reservationDate} time={props.value.time} setRes={setReservations} />
                    </td>
                </tr>
            </tbody>
        }
    }

    const MapReservationsHistory = (props) => {
        console.log("here2");
        notFound = false;
        return <tbody key={props.value._id}>
            <tr>
                <td>{props.index + 1 - skipped}</td>
                <td>{resources[props.value.resource]}</td>
                <td>{cutDate(props.value.date)}</td>
                <td>{props.value.time}</td>
            </tr>
        </tbody>
    }

    function cmp(a, b, up) {
        if (a > b) return up ? 1 : -1;
        if (a < b) return up ? -1 : 1;
        return 0;
    }

    function sortDate() {
        let r = reservations.sort((a, b) => cmp(a.date, b.date, sortDateUp) || cmp(a.time, b.time, sortDateUp));
        setReservations(r);
        setSortDateUp(!sortDateUp);
    }

    function sortResource() {
        let r;
        r = reservations.sort((a, b) => cmp(resources[a.resource], resources[b.resource], sortResourceUp));
        setReservations(r);
        setSortResourceUp(!sortResourceUp);
    }

    return (
        <div>
            <RederTable />
        </div>
    );
}

export default ReservationTable;
*/
