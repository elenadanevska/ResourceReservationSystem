import React, { Component } from "react";
import ResourceCard from "../components/ResourceCard";
import Select from "react-select";


let resources = [
    {
        "id": 1,
        "name": "Smart Board",
        "image": "",
        "description": "description",
        "note": "note",
        "user": "user"
    },
    {
        "id": 2,
        "name": "Computer",
        "image": "",
        "description": "description1",
        "note": "note1",
        "user": "user1"
    },
    {
        "id": 3,
        "name": "AA",
        "image": "",
        "description": "description1",
        "note": "note1",
        "user": "user1"
    },
    {
        "id": 4,
        "name": "Naa",
        "image": "",
        "description": "description1",
        "note": "note1",
        "user": "user1"
    },
    {
        "id": 5,
        "name": "Ninten",
        "image": "",
        "description": "description1",
        "note": "note1",
        "user": "user1"
    }
]

const colClass = "col-md-3 mb-3";

class ChooseResource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            label: '',
            options: {},
        }
    }

    render() {
        return (
            <div>
                <h2 className="page-header">
                    Resources
                </h2>
                <div className="mb-5" style={{ marginLeft: "2%" }}>
                    <div className="topnav__search mb-2" style={{ width: "40%" }}>
                        <input type="text" placeholder='Search by name...' />
                    </div>
                    <Select
                        className="selectType"
                        placeholder="Select Type"
                        options={this.state.options}
                        defaultValue={{ value: '', label: 'Select resource type' }}
                        onChange={(e) => {
                            this.setState({
                                value: e.value,
                                label: e.label
                            });
                        }}
                    />
                </div>
                <div className="row container">
                    {resources.map((value) => {
                        return (
                            <div className={colClass} key={value.name}>
                                <ResourceCard />
                                <h2 className="text-center">{value.name}</h2>
                            </div>);
                    })}
                </div>
            </div>
        );
    }
};

export default ChooseResource;