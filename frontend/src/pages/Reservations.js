import React, { useState } from 'react';
import ReservationTable from '../components/ReservationTable';
import { translate } from '../helpers/Helpers';


const Reservations = () => {
    const [searchString, SetSearchString] = useState("");

    return (
        <div>
            <h2 className="page-header">
                {translate("titles.reservations")}
            </h2>
            <div className="container">
                <div className="customSearch mb-4" style={{ width: "40%" }}>
                    <input type="text" placeholder={translate("reservations_page.search")} onChange={(e) => {
                        SetSearchString(e.target.value.toLowerCase());
                    }} />
                </div>
                <ReservationTable searchString={searchString} />
            </div>
        </div>
    );
}

export default Reservations;