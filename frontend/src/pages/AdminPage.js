import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { getConfig } from '../helpers/Helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const AdminPage = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [apiKey, setApiKey] = useState("");
    const admin_user = JSON.parse(localStorage.getItem("user"));
    let copyText = "Copy api key"

    useEffect(() => {
        let user_id = admin_user._id;
        Axios.get(`http://localhost:3001/users/${user_id}`, getConfig(admin_user)).then((response) => {
            setName(response.data.name);
            setSurname(response.data.surname);
            setEmail(response.data.email);
            let aKey = response.data['apiKey']
            if (aKey) {
                setApiKey(aKey);
            }
        }).catch(errors => {
            console.error(errors);
        });
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await Axios.get(`http://localhost:3001/admins/generateApiKey`, getConfig(admin_user)).then((result) => {
                setApiKey(result.data);
                Axios.put(`http://localhost:3001/admins/generateApiKey/${admin_user._id}`, {
                    params: {
                        apiKey: result.data
                    }
                }, getConfig(admin_user)).then((res) => {
                    console.log(res);
                });
            });
        } catch (error) {
            console.log(error);
        };

    }

    async function handleLogout() {
        try {
            await Axios.post(`http://localhost:3001/users/signout`).then((res) => {
                console.log("signing out...")
            });
            localStorage.removeItem("user");
            navigate("/login");
        } catch (error) {
            console.log(error);
        };
        window.location.reload()
    }

    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <div className="logInWrapper fadeInDown position-absolute bgImage">
            <div className="formContent position-absolute p-4">
                <form method="POST" className='text-center' onSubmit={handleSubmit}>
                    <h5>GENERATE API KEY</h5>
                    <div className="mb-3 pt-0">
                        <input type="text" value={name + " " + surname} name="name" required className="px-3 py-3 relative rounded text-sm border-0 shadow w-100" />
                    </div>
                    <div className="mb-3 pt-0">
                        <input type="email" value={email} name="email" className="px-3 py-3 relative rounded text-sm border-0 shadow w-100" required />
                    </div>
                    <div className="mb-3 pt-0">
                        <textarea disabled placeholder="You don't have an api key. Click the button bellow to generate one" value={apiKey != "" ? apiKey : ""} name="apikey" rows={3}
                            className="px-3 py-3 relative rounded text-sm border-0 shadow focus:outline-none focus:ring w-100 adminTextArea"
                            required
                        />
                        <FontAwesomeIcon icon={faCopy} className="copyIcon" title={copyText} onClick={() => {
                            navigator.clipboard.writeText(apiKey);
                        }} />
                    </div>
                    <div className="mb-3 pt-0">
                        <button className="btn btn-primary text-white text-sm shadow-none" type="submit">{apiKey ? "Regenerate API key" : "Generate api key"}</button>
                    </div>
                </form>
            </div>
            <button className='mt-4 adminSignOutButton btn btn-secondary' onClick={handleLogout}>Sign Out</button>
        </div>
    );
}

export default AdminPage;