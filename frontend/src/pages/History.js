import React, { Component } from "react";
import DatePicker from "react-datepicker";

class ChooseResource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromDate: new Date(),
            toDate: new Date(),
            resourceType: '',
        }
    }

    render() {
        return (
            <div>
                <h2 className="page-header">
                    Previous Reservations
                </h2>
                <div className="row containerr">
                    <div className="col text-center"></div>
                    <div className="col text-center">
                            From Date:
                            <DatePicker
                                selected={this.state.toDate}
                                onSelect={this.selectDate}
                                dateFormat="dd-MM-yyyy"
                                minDate={new Date()}
                                className="datepicker"
                            />
                        </div>
                        <div className="col text-center">
                            To Date:
                            <DatePicker
                                selected={this.state.toDate}
                                onSelect={this.selectDate}
                                dateFormat="dd-MM-yyyy"
                                minDate={new Date()}
                                className="datepicker"
                            />
                        </div>
                        <div className="col text-center"></div>
                    </div>
                    <div class="text-center mt-5">
                        <button type="button" class="btn btn-primary">Show</button>
                    </div>
            </div>
        );
    }
};

export default ChooseResource;