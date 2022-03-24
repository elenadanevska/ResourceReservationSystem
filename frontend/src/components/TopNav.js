import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import user_image from '../assets/images/userpng1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import { useNavigate } from "react-router-dom";
import Axios from "axios";


export default function Topnav(props) {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.token) {
            console.log(user);
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
            navigate("/");
            window.location.reload()
        } catch (error) {
            console.log(error);
        };

    }

    return (
        <div className='topnav'>
            <div className="topnav__search"></div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    <li className="dropdown show list-unstyled">
                        <Link to="" className="" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="topnav__right-user">
                                <div className="topnav__right-user__image">
                                    <img src={user_image} alt="" />
                                </div>
                                <div className="topnav__right-user__name">
                                    {name + " " + surname}
                                </div>
                            </div>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-light text-small shadow" aria-labelledby="dropdown">
                            <Link className="dropdown-item" to="" ><FontAwesomeIcon icon={faUserCircle} />    Profile</Link>
                            <hr className="dropdown-divider" />
                            <button className="dropdown-item" onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} />    Sign out</button>
                        </ul>
                    </li>
                </div>
            </div>
        </div>
    );
}