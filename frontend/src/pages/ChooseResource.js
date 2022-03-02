import React, { Component } from "react";
import ResourceCard from "../components/ResourceCard";
import Select from "react-select";
import Axios from "axios";

const colClass = "col-md-3 mb-3";

class ChooseResource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            label: '',
            options: {},
            resources: [],
            searchString: ""
        }
    }

    componentDidMount() {
        try {
            Axios.get("http://localhost:3001/resources").then((response) => {
                this.setState({ resources: response.data });
                console.log(this.state.resources);
            })
        } catch (error) {
            console.log(error)
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
                        <input type="text" placeholder='Search by name...' onChange={(e) => {
                            this.setState({
                                searchString: e.target.value.toLowerCase(),
                            });
                        }} />
                    </div>
                    <Select
                        className="selectType"
                        placeholder="Select Type"
                        options={this.state.options}
                        defaultValue={{ value: '', label: 'Select resource group' }}
                        onChange={(e) => {
                            this.setState({
                                value: e.value,
                                label: e.label
                            });
                        }}
                    />
                </div>
                <div className="row container">
                    {this.state.resources.map((value) => {
                        if (value.name.toLowerCase().includes(this.state.searchString)) {
                            return (
                                <div className={colClass} key={value.name}>
                                    <ResourceCard note={value.note} description={value.describtion} image={value.image} id={value._id} />
                                    <h2 className="text-center">{value.name}</h2>
                                </div>);
                        }
                    })}
                </div>
            </div>
        );
    }
};

export default ChooseResource;