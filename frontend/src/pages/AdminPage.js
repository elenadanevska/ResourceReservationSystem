import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { getConfig, getCurrentUser } from '../helpers/Helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

const AdminPage = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [icon, setIcon] = useState(faCopy)
    const admin_user = getCurrentUser();
    let copyText = "Copy api key"

    useEffect(() => {
        let user_id = admin_user._id;
        Axios.get(`http://localhost:3001/users/${user_id}`, getConfig(admin_user.token)).then((response) => {
            setName(response.data.name);
            setSurname(response.data.surname);
            setEmail(response.data.email);
            let aKey = response.data['apiKey']

            if (aKey) {
                setApiKey(aKey.publicPart + "." + "{secret part}");
            }
        }).catch(errors => {
            console.error(errors);
        });
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await Axios.get(`http://localhost:3001/admins/generateApiKey/${admin_user._id}`, getConfig(admin_user.token)).then((result) => {
                setApiKey(result.data);
                Axios.put(`http://localhost:3001/admins/generateApiKey/${admin_user._id}`, {
                    params: {
                        apiKey: result.data
                    }
                }, getConfig(admin_user.token)).then((res) => {
                    console.log(res);
                });
            });
            setIcon(faCopy);
        } catch (error) {
            console.log(error);
        };

    }

    return (
        <div className="">
            <div className="">
                <form method="POST" className='text-center' onSubmit={handleSubmit}>
                    <h5>GENERATE API KEY</h5>
                    <div className="mb-3 pt-0">
                        <input type="text" value={name + " " + surname} name="name" required className="px-3 py-3 relative rounded text-sm border-0 shadow w-100" />
                    </div>
                    <div className="mb-3 pt-0">
                        <input type="email" value={email} name="email" className="px-3 py-3 relative rounded text-sm border-0 shadow w-100" required />
                    </div>
                    <div className="mb-3 pt-0">
                        <textarea disabled placeholder="You don't have an api key. Click the button bellow to generate one" value={apiKey !== "" ? apiKey : ""} name="apikey" rows={3}
                            className="px-3 py-3 relative rounded text-sm border-0 shadow focus:outline-none focus:ring w-100 adminTextArea"
                            required
                        />
                        <FontAwesomeIcon icon={icon} className="copyIcon" title={copyText} onClick={() => {
                            navigator.clipboard.writeText(apiKey);
                            setIcon(faCheck);
                        }} />
                    </div>
                    <div className="mb-3 pt-0">
                        <button className="btn btn-primary text-white text-sm shadow-none" type="submit">{apiKey ? "Regenerate API key" : "Generate api key"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminPage;