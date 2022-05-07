import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/unilj.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHistory, faQuestionCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import slo from "../translations/slo.json";
import en from "../translations/en.json";

const Sidebar = props => {
    let slovenian = JSON.parse(localStorage.getItem("user")).slovenian;
    let translationFile = slovenian ? slo : en

    let sidebar_items = [
        {
            "display_name": translationFile.menu.reservations,
            "route": "/user/reservations",
            "icon": faList
        },
        {
            "display_name": translationFile.menu.resources,
            "route": "/user/resources",
            "icon": faPenToSquare
        },
        {
            "display_name": translationFile.menu.history,
            "route": "/user/history",

            "icon": faHistory
        },
        {
            "display_name": translationFile.menu.help,
            "route": "/user/help",
            "icon": faQuestionCircle
        },
    ]

    function sidebarElement() {
        if (props.type === "navbar") {
            return <div className="row smallScreenMenu">
                {
                    sidebar_items.map((item, index) => (
                        <Link to={item.route} key={index} className="col">
                            <div className='navbarItem'>
                                <FontAwesomeIcon icon={item.icon} />
                                <span className='menuText'>{item.display_name}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>
        } else {
            return <div className="sidebar">
                <div className="sidebarLogo">
                    <img src={logo} alt="uni logo" />
                </div>
                {
                    sidebar_items.map((item, index) => (
                        <Link to={item.route} key={index}>
                            <div className="sidebarItem">
                                <div className={`sidebarItemInner ${props.active}`}>
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span className='sidebarItemInnerTitle'>
                                        {item.display_name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        }
    }

    return (
        sidebarElement()
    )
}

export default Sidebar