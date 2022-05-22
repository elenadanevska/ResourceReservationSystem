import React, { useState, useEffect } from 'react';
import DeleteButton from '../components/buttons/DeleteButton';
import Table from "react-bootstrap/Table";
import ShowButton from "../components/buttons/ShowButton";
import Axios from "axios";
import { translate, cmp, cutDate, getConfig } from '../helpers/Helpers';


const Reservations = () => {

    const [reservations, setReservations] = useState([]);
    const [resources, setResources] = useState({});
    const [searchString, SetSearchString] = useState("");
    const [sortDateUp, setSortDateUp] = useState(true);
    const [sortResourceUp, setSortResourceUp] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    let skipped = 0;
    let slovenian = user.slovenian;

    useEffect(() => {
        const config = getConfig(user);
        Axios.get(`http://localhost:3001/reservations/user/${user._id}`, config).then((response) => {
            let data = response.data;
            setReservations(data);
            data.forEach(res => {
                Axios.get(`http://localhost:3001/resources/${res.resource}`, config).then((r) => {
                    let newResource = {};
                    newResource[r.data._id] = r.data.name;
                    setResources(resources => ({ ...resources, ...newResource }))
                });
            })
        });
    }, []);

    function TableHeader() {
        return (
            <thead className="bg-info">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">{translate("reservations_page.resource_name", slovenian)}
                        <span className='arrows'>
                            <button className="up-arrow" onClick={() => sortResource()}></button>
                            <button className="down-arrow" onClick={() => sortResource()}></button>
                        </span>
                    </th>
                    <th scope="col">{translate("reservations_page.date", slovenian)}
                        <span className='arrows'>
                            <button className="up-arrow" onClick={() => sortDate()}></button>
                            <button className="down-arrow" onClick={() => sortDate()}></button>
                        </span>
                    </th>
                    <th scope="col">{translate("reservations_page.time", slovenian)}</th>
                    <th scope="col">{translate("reservations_page.actions", slovenian)}</th>
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
                                <DeleteButton user={user} id={value._id} name={resourceName} date={reservationDate} time={value.time} setRes={setReservations} />
                            </td>
                        </tr>
                    </tbody>
                }
            } else {
                skipped++;
            }
        });
        if (notFound) {
            return <div>{translate("reservations_page.not_found", slovenian)}</div>
        } else {
            return <Table striped bordered hover className="bg-light">
                {TableHeader()}
                {tableBody}
            </Table>
        }
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
                {translate("titles.reservations", slovenian)}
            </h2>
            <div className="container">
                <div className="customSearch mb-4" style={{ width: "40%" }}>
                    <input type="text" placeholder={translate("reservations_page.search", slovenian)} onChange={(e) => {
                        SetSearchString(e.target.value.toLowerCase());
                    }} />
                </div>
                <RederTable />
            </div>
        </div>
    );
}

export default Reservations;