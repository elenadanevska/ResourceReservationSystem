import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import { translate, cmp, cutDate, getConfig } from '../helpers/Helpers';

const History = () => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showHistory, setShowHistory] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [resources, setResources] = useState({});
    const [sortDateUp, setSortDateUp] = useState(true);
    const [sortResourceUp, setSortResourceUp] = useState(true);
    const current_user = JSON.parse(localStorage.getItem("user"));
    let skipped = 0;

    useEffect(() => {
        Axios.get(`http://localhost:3001/reservations/user/${current_user._id}`, getConfig(current_user.token)).then((response) => {
            let data = response.data;
            setReservations(response.data);
            data.forEach(res => {
                Axios.get(`http://localhost:3001/resources/${res.resource}`, getConfig(current_user.token)).then((r) => {
                    let newResource = {};
                    newResource[r.data._id] = r.data.name;
                    setResources(resources => ({ ...resources, ...newResource }))
                });
            })
            var prevDate = fromDate;
            prevDate.setDate(fromDate.getDate() - 30);
            setFromDate(new Date(prevDate));
        });
    }, []);

    const TableHeader = () => {
        return (
            <thead className="bg-info">
                <tr>
                    <th scope="col"></th>
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
                </tr>
            </thead>
        );
    }

    const DatePickers = () => {
        return (
            <div className="row containerr">
                <div className="col text-center"></div>
                <div className="col text-center">
                    {translate("history_page.from_date")}
                    <DatePicker
                        selected={fromDate}
                        onSelect={onFromDateChange}
                        dateFormat="dd-MM-yyyy"
                        maxDate={new Date()}
                        className="datepicker"
                    />
                </div>
                <div className="col text-center">
                    {translate("history_page.to_date")}
                    <DatePicker
                        selected={toDate}
                        onSelect={onToDateChange}
                        dateFormat="dd-MM-yyyy"
                        maxDate={new Date()}
                        className="datepicker"
                    />
                </div>
                <div className="col text-center"></div>
            </div>
        )
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

    const RenderTable = () => {
        let notFound = true;
        let tableBody = reservations.map((value, index) => {
            let check_date = new Date(value.date);
            if (check_date >= fromDate && check_date <= toDate) {
                notFound = false;
                return <tbody key={value._id}>
                    <tr>
                        <td>{index + 1 - skipped}</td>
                        <td>{resources[value.resource]}</td>
                        <td>{cutDate(value.date)}</td>
                        <td>{value.time}</td>
                    </tr>
                </tbody>
            } else {
                skipped++;
            }
        })
        if (notFound) {
            return <div>{translate("reservations_page.not_found")}</div>
        } else {
            return <Table striped bordered hover className="bg-light">
                {TableHeader()}
                {tableBody}
            </Table>
        }
    }

    return (
        <div>
            <h2 className="page-header">
                {translate("titles.history")}
            </h2>
            <DatePickers />
            <div className="text-center mt-5">
                <button type="button" onClick={handleShow} className="btn btn-primary">
                    {translate("history_page.show_button")}
                </button>
            </div>
            <div className={`mt-5 ${showHistory ? "" : "d-none"}`}>
                <div className="container result">
                    <RenderTable />
                </div>
            </div>
        </div>
    );
}

export default History;