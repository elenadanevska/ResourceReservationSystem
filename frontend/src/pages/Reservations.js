import React, { useState, useEffect } from 'react';
import DeleteButton from '../components/buttons/DeleteButton';
import Table from "react-bootstrap/Table";
import ShowButton from "../components/buttons/ShowButton";
import Axios from "axios";
import slo from "../translations/slo.json";
import en from "../translations/en.json";

const Reservations = () => {

    const [reservations, setReservations] = useState([]);
    const [resources, setResources] = useState({});
    const [searchString, SetSearchString] = useState("");
    const [sortDateUp, setSortDateUp] = useState(true);
    const [sortResourceUp, setSortResourceUp] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    let skipped = 0;
    let slovenian = user.slovenian;
    let translationFile = slovenian ? slo : en

    useEffect(() => {
        Axios.get(`http://localhost:3001/reservations/user/${user._id}`).then((response) => {
            let data = response.data;
            setReservations(data);
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
                    <th scope="col">{translationFile.reservations_page.resource_name}
                        <span className='arrows'>
                            <button className="up-arrow" onClick={() => sortResource()}></button>
                            <button className="down-arrow" onClick={() => sortResource()}></button>
                        </span>
                    </th>
                    <th scope="col">{translationFile.reservations_page.date}
                        <span className='arrows'>
                            <button className="up-arrow" onClick={() => sortDate()}></button>
                            <button className="down-arrow" onClick={() => sortDate()}></button>
                        </span>
                    </th>
                    <th scope="col">{translationFile.reservations_page.time}</th>
                    <th scope="col">{translationFile.reservations_page.actions}</th>
                </tr>
            </thead >
        );
    }

    const RederTable = () => {
        let notFound = true;
        let tableBody = reservations.map((value, index) => {
            if (new Date(value.date) >= new Date()) {
                const reservationDate = cutDate(value.date);
                const resourceName = resources[value.resource];
                const reservationTime = value.time;
                /* if (new Date(reservationDate + ' ' + reservationTime.split(" ")[0]) >= new Date()) {*/
                if ((resourceName !== undefined && resourceName.toLowerCase().includes(searchString)) ||
                    reservationDate.includes(searchString) || reservationTime.includes(searchString)) {
                    notFound = false;
                    return <tbody key={value._id}>
                        <tr>
                            <td>{index + 1 - skipped}</td>
                            <td>{resourceName}</td>
                            <td>{reservationDate}</td>
                            <td>{reservationTime}</td>
                            <td>
                                <ShowButton name={resourceName} date={reservationDate} time={value.time} place="R1-FRI" />
                                <DeleteButton id={value._id} name={resourceName} date={reservationDate} time={value.time} setRes={setReservations} />
                            </td>
                        </tr>
                    </tbody>
                }
            } else {
                skipped++;
            }
        });
        if (notFound) {
            return <div>{translationFile.reservations_page.not_found}</div>
        } else {
            return <Table striped bordered hover className="bg-light">
                {TableHeader()}
                {tableBody}
            </Table>
        }
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
            <h2 className="page-header">
                {translationFile.titles.reservations}
            </h2>
            <div className="container">
                <div className="customSearch mb-4" style={{ width: "40%" }}>
                    <input type="text" placeholder={translationFile.reservations_page.search} onChange={(e) => {
                        SetSearchString(e.target.value.toLowerCase());
                    }} />
                </div>
                <RederTable />
            </div>
        </div>
    );
}

export default Reservations;