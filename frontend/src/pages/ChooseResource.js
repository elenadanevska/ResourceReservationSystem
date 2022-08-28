import React, { Component } from "react";
import ResourceCard from "../components/ResourceCard";
import Select from "react-select";
import Axios from "axios";
import { translate, getConfig, getCurrentUser } from '../helpers/Helpers';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class ChooseResource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resources: [],
            resouceGroups: [],
            selectedGroup: "",
            searchString: "",
            user: getCurrentUser(),
        }
        this.showResources = this.state.user.groups.length > 1 || this.state.user.isAdmin;
    }

    componentDidMount() {
        try {
            Axios.get("http://localhost:3001/resources", getConfig(this.state.user.token)).then((response) => {
                this.setState({ resources: response.data });
                if (this.showResources) {
                    let resourceOption = [{ value: "", label: translate("resources_page.select_all") }];
                    let uniqe = [];
                    response.data.map(resource => resource.groups.forEach(element => {
                        if (!uniqe.includes(element)) {
                            if (this.showResources || this.state.user.groups.includes(element)) {
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
                    {translate("titles.resources")}
                </h2>
                <div className="mb-5" style={{ marginLeft: "2%" }}>
                    <div className="customSearch mb-2" style={{ width: "40%" }}>
                        <input type="text" placeholder={translate("resources_page.search")} onChange={(e) => {
                            this.setState({
                                searchString: e.target.value.toLowerCase(),
                            });
                        }} />
                    </div>
                    {(this.showResources) &&
                        <Select
                            className="selectType"
                            placeholder="Select Type"
                            options={Array.from(this.state.resouceGroups)}
                            defaultValue={{ value: '', label: translate("resources_page.select_group") }}
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
                        if (this.showResources || value.groups.some(item => this.state.user.groups.includes(item))) {
                            if (value.name.toLowerCase().includes(this.state.searchString)) {
                                if (this.state.selectedGroup === "" || value.groups.includes(this.state.selectedGroup)) {
                                    return (
                                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={value.name}>
                                            <ResourceCard name={value.name} note={value.note} description={value.describtion} image={value.image_name} id={value._id} />
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