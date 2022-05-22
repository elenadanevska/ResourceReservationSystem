import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import user_image from '../assets/images/userpng1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import { useNavigate } from "react-router-dom";
import { translate } from '../helpers/Helpers';
import Sidebar from "./Sidebar";
import Axios from "axios";


export default function Topnav() {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const navigate = useNavigate();
    let slovenian = ""

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            console.log(user);
            slovenian = user.slovenian;
            setName(user.name);
            setSurname(user.surname);
        } else {
            navigate("/");
        }
    }, []);

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

    return (
        <div className='topnav'>
            <div className="customSearch"></div>
            <Sidebar type="navbar" classes="smallScreenMenu" />
            <div className="topnavRight">
                <div className="ml-30px">
                    <li className="dropdown show list-unstyled">
                        <Link to="" className="" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="topnavRightUser">
                                <div className="topnavUserImg">
                                    <img src={user_image} alt="" />
                                </div>
                                <div className="topnavUsername">
                                    {name + " " + surname}
                                </div>
                            </div>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-light text-small shadow" aria-labelledby="dropdown">
                            <Link className="dropdown-item" to="/user/profile" ><FontAwesomeIcon icon={faUserCircle} />    {translate("dropdown.profile", slovenian)}</Link>
                            <hr className="dropdown-divider" />
                            <button className="dropdown-item" onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} />    {translate("dropdown.signout", slovenian)}</button>
                        </ul>
                    </li>
                </div>
            </div>
        </div>
    );
}