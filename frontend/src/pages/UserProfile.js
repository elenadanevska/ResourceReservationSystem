import React, { useState } from "react";
import user_image from '../assets/images/userpng1.png';
import Select from "react-select";

const UserProfile = () => {
    const current_user = JSON.parse(localStorage.getItem("user"));
    const languageOptions = [
        { value: 'english', label: 'English' },
        { value: 'slovenian', label: 'Slovenian' },
    ]

    return (
        <div>
            <h2 className="page-header">
                Profile
            </h2>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 profileLeft">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src={user_image} />
                            <span className="font-waight-bold mt-3">{current_user.name} {current_user.surname}</span>
                        </div>
                    </div>
                    <div className="col-md-5 profile">
                        <div className="profileText">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Personal Information</h4>
                                </div>
                                <div className="row mt-2 nameSurname">
                                    <div className="col-md-7"><label className="labels proLabels">Name and Surname:&emsp;</label><br />{current_user.name} {current_user.surname}</div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-7"><label className="labels proLabels">Role:&emsp;</label><br />Student</div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6"><label className="labels proLabels">Email:&emsp;</label>{current_user.email}</div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6"><label className="labels proLabels">Language:&emsp;</label>
                                        <Select
                                            options={languageOptions}
                                            defaultValue={{ value: 'english', label: 'English' }}
                                            onChange={(e) => {
                                                console.log(e);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                                    <h4 className="text-right">Groups</h4>
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