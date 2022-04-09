import React, { Component } from "react";
import ResourceCard from "../components/ResourceCard";
import Select from "react-select";
import Axios from "axios";


class ChooseResource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resources: [],
            resouceGroups: [],
            selectedGroup: "",
            searchString: "",
            user: JSON.parse(localStorage.getItem("user"))
        }
    }

    componentDidMount() {
        try {
            Axios.get("http://localhost:3001/resources").then((response) => {
                this.setState({ resources: response.data });
                if (this.state.user.groups.length > 1) {
                    let resourceOption = [{ value: "", label: "Select All" }];
                    let uniqe = [];
                    response.data.map(resource => resource.gropus.forEach(element => {
                        if (!uniqe.includes(element)) {
                            if (this.state.user.groups.includes(element)) {
                                resourceOption.push({ value: element, label: element });
                                uniqe.push(element);
                            }
                        }
                    }))
                    this.setState({ resouceGroups: resourceOption });
                }
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
                    <div className="customSearch mb-2" style={{ width: "40%" }}>
                        <input type="text" placeholder='Search by name...' onChange={(e) => {
                            this.setState({
                                searchString: e.target.value.toLowerCase(),
                            });
                        }} />
                    </div>
                    {this.state.user.groups.length > 1 &&
                        <Select
                            className="selectType"
                            placeholder="Select Type"
                            options={Array.from(this.state.resouceGroups)}
                            defaultValue={{ value: '', label: 'Select resource group' }}
                            onChange={(e) => {
                                this.setState({
                                    selectedGroup: e.value,
                                });
                            }}
                        />
                    }
                </div>
                <div className="row container">
                    {this.state.resources.map((value) => {
                        if (value.gropus.some(item => this.state.user.groups.includes(item))) {     //chang value.gropus to groups
                            if (value.name.toLowerCase().includes(this.state.searchString)) {
                                if (this.state.selectedGroup == "" || value.gropus.includes(this.state.selectedGroup)) {
                                    return (
                                        <div className="col-md-3 mb-3" key={value.name}>
                                            <ResourceCard note={value.note} description={value.describtion} image={value.image} id={value._id} />
                                            <h2 className="text-center">{value.name}</h2>
                                        </div>);
                                }
                            }
                        }
                    })}
                </div>
            </div>
        );
    }
};

export default ChooseResource;