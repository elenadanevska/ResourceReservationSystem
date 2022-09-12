import React, { useState, useEffect } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import DeleteButton from '../components/buttons/DeleteButton';
import ShowButton from "../components/buttons/ShowButton";
import { translate, cmp, cutDate, getConfig, getCurrentUser } from '../helpers/Helpers';

const ReservationTable = (props) => {

    const [reservations, setReservations] = useState([]);
    const [resources, setResources] = useState({});
    const [sortDateUp, setSortDateUp] = useState(true);
    const [sortResourceUp, setSortResourceUp] = useState(true);
    const user = getCurrentUser()
    let skipped = 0;

    useEffect(() => {
        const config = getConfig(user.token);
        if (!user.isAdmin) {
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
        } else {
            Axios.get(`http://localhost:3001/reservations`, config).then((response) => {
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

        }
    }, []);

    function TableHeader() {
        return (
            <thead className="bg-info">
                <tr>
                    <th scope="col"></th>
                    <th scope="col" className={`${user.isAdmin ? "" : "hideColumn"}`}>User ID</th>
                    <th scope="col">{translate("reservations_page.resource_name")}
                        <span className='arrows'>
                            <button className="up-arrow" onClick={() => sortResource()}></button>
                            <button className="down-arrow" onClick={() => sortResource()}></button>
                        </span>
                    </th>
                    <th scope="col">{translate("reservations_page.date")}
                        <span className='arrows'>
                            <button className="up-arrow" onClick={() => sortDate()}></button>
                            <button className="down-arrow" onClick={() => sortDate()}></button>
                        </span>
                    </th>
                    <th scope="col">{translate("reservations_page.time")}</th>
                    <th scope="col" className={`${props.history ? "hideColumn" : ""}`}>{translate("reservations_page.actions")}</th>
                </tr>
            </thead >
        );
    }

    function checkCondition(dateOne, dateTwo = null, check_date = new Date(), hours = null, minutes = null) {
        if (dateTwo) {
            return check_date >= dateOne && check_date <= dateTwo
        } else {
            if (hours && minutes) {
                console.log(hours + " " + minutes)
                return (new Date(dateOne).setHours(hours, minutes, 0) >= new Date(check_date));
            }
            return (new Date(dateOne) >= check_date);
        }
    }

    function RenderTable() {
        let notFound = true;
        let tableBody = reservations.map((value, index) => {
            let checkDate = new Date(value.date);
            let timeMinutesSeconds = value.time.split(" ")[0].split(":");
            if (props.history ? checkCondition(props.fromDate, props.toDate, checkDate) : checkCondition(checkDate, null, new Date(), timeMinutesSeconds[0], timeMinutesSeconds[1])) {
                const reservationDate = cutDate(value.date);
                const resourceName = resources[value.resource];
                const reservationTime = value.time;
                if ((resourceName !== undefined && resourceName.toLowerCase().includes(props.searchString)) ||
                    reservationDate.includes(props.searchString) || reservationTime.includes(props.searchString) || value.user.includes(props.searchString)) {
                    notFound = false;
                    return <tbody key={value._id}>
                        <tr>
                            <td>{index + 1 - skipped}</td>
                            <td className={`${user.isAdmin ? "" : "hideColumn"}`}>{value.user}</td>
                            <td>{resourceName}</td>
                            <td>{reservationDate}</td>
                            <td>{reservationTime}</td>
                            <td className={`${props.history ? "hideColumn" : ""}`}>
                                <ShowButton name={resourceName} date={reservationDate} time={value.time} />
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
            return <div>{translate("reservations_page.not_found")}</div>
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
        <RenderTable />
    );

}

export default ReservationTable;