import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import ReservationTable from '../components/ReservationTable';
import { translate } from '../helpers/Helpers';

const History = () => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        var prevDate = fromDate;
        prevDate.setDate(fromDate.getDate() - 30);
        setFromDate(new Date(prevDate));
    }, []);

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
                    <ReservationTable searchString="" fromDate={fromDate} toDate={toDate} history={true} />
                </div>
            </div>
        </div>
    );
}

export default History;