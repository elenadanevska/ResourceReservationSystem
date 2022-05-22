import React, { Component } from "react";
import ResourceCard from "../components/ResourceCard";
import Select from "react-select";
import Axios from "axios";
import { translate, getConfig } from '../helpers/Helpers';


class ChooseResource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resources: [],
            resouceGroups: [],
            selectedGroup: "",
            searchString: "",
            user: JSON.parse(localStorage.getItem("user")),
        }
        this.slovenian = this.state.user.slovenian
    }

    componentDidMount() {
        try {
            Axios.get("http://localhost:3001/resources", getConfig(this.state.user)).then((response) => {
                this.setState({ resources: response.data });
                if (this.state.user.groups.length > 1) {
                    let resourceOption = [{ value: "", label: "Select All" }];
                    let uniqe = [];
                    response.data.map(resource => resource.groups.forEach(element => {
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
                    {translate("titles.resources", this.slovenian)}
                </h2>
                <div className="mb-5" style={{ marginLeft: "2%" }}>
                    <div className="customSearch mb-2" style={{ width: "40%" }}>
                        <input type="text" placeholder={translate("resources_page.search", this.slovenian)} onChange={(e) => {
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
                        if (value.groups.some(item => this.state.user.groups.includes(item))) {
                            if (value.name.toLowerCase().includes(this.state.searchString)) {
                                if (this.state.selectedGroup === "" || value.groups.includes(this.state.selectedGroup)) {
                                    return (
                                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={value.name}>
                                            <ResourceCard name={value.name} note={value.note} description={value.describtion} image={value.image} id={value._id} />
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