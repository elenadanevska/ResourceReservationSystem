import React, { useState } from "react";
import user_image from '../assets/images/userpng1.png';
import Select from "react-select";
import { translate } from '../helpers/Helpers';
import Axios from "axios";

const UserProfile = () => {
    const current_user = JSON.parse(localStorage.getItem("user"));
    const [languageChanged, setLanguageChanged] = useState(false);
    const [slovenian, setSlovenian] = useState(current_user.slovenian);
    const languageOptions = [
        { value: 'english', label: 'English' },
        { value: 'slovenian', label: 'Slovenian' },
    ]

    function changeLanguage(e) {
        let changeUser = false;
        if (e.value === "slovenian") {
            if (!slovenian) {
                changeUser = true;
                setSlovenian(true);
                current_user.slovenian = true;
            }
        } else {
            if (slovenian) {
                changeUser = true;
                setSlovenian(false);
                current_user.slovenian = false;
            }
        }
        if (changeUser) {
            setLanguageChanged(!languageChanged);
            window.location.reload();
            try {
                localStorage.setItem("user", JSON.stringify(current_user));
                console.log(current_user);
                Axios.put(`http://localhost:3001/users/update/${current_user._id}`, { slovenian: current_user.slovenian }).then((response) => {
                    console.log(response);
                }).catch((e) => console.log(e));
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <h2 className="page-header">
                {translate("titles.profile", slovenian)}
            </h2>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 profileLeft">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" alt="user" width="150px" src={user_image} />
                            <span className="font-waight-bold mt-3">{current_user.name} {current_user.surname}</span>
                        </div>
                    </div>
                    <div className="col-md-5 profile">
                        <div className="profileText">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">{translate("profile_page.infoTitle", slovenian)}</h4>
                                </div>
                                <div className="row mt-2 nameSurname">
                                    <div className="col"><label className="labels proLabels">{translate("profile_page.nameSurname", slovenian)}:&emsp;</label><br />
                                        {current_user.name} {current_user.surname}
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col"><label className="labels proLabels">{translate("profile_page.role", slovenian)}:&emsp;</label><br />
                                        {translate("profile_page.student", slovenian)}
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col"><label className="labels proLabels">{translate("profile_page.email", slovenian)}:&emsp;</label>{current_user.email}</div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col"><label className="labels proLabels">{translate("profile_page.language", slovenian)}:&emsp;</label>
                                        <Select
                                            options={languageOptions}
                                            defaultValue={slovenian ? { value: 'slovenian', label: 'Slovenian' } : { value: 'english', label: 'English' }}
                                            onChange={(e) => {
                                                changeLanguage(e);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                                    <h4 className="text-right">{translate("profile_page.groups", slovenian)}</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-6">
                                        {current_user.groups.map((value, index) => {
                                            return (
                                                <div key={index} className="btn btn-primary box">
                                                    {value}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;