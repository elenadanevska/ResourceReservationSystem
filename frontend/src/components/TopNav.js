import React from "react";
import { Link } from 'react-router-dom';
import user_image from '../assets/images/userpng1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUserCircle, faKey } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import { useNavigate } from "react-router-dom";
import { translate } from '../helpers/Helpers';
import Sidebar from "./Sidebar";
import Axios from "axios";


export default function Topnav() {

    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem("user"));

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

    let FirstLink = user.isAdmin ? <Link className="dropdown-item" to="/adminpage" ><FontAwesomeIcon icon={faKey} />    API Key</Link> :
        <Link className="dropdown-item" to="/user/profile" ><FontAwesomeIcon icon={faUserCircle} />    {translate("dropdown.profile")}</Link>
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
                                    {user.name + " " + user.surname}
                                </div>
                            </div>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-light text-small shadow" aria-labelledby="dropdown">
                            {FirstLink}
                            <hr className="dropdown-divider" />
                            <button className="dropdown-item" onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} />    {translate("dropdown.signout")}</button>
                        </ul>
                    </li>
                </div>
            </div>
        </div>
    );
}