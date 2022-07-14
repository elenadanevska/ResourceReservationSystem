import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/unilj.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHistory, faQuestionCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { translate, getCurrentUser } from '../helpers/Helpers';


const Sidebar = props => {
    const user = getCurrentUser();

    let sidebar_items = [
        {
            "display_name": translate("menu.reservations"),
            "route": "/user/reservations",
            "icon": faList
        },
        {
            "display_name": translate("menu.resources"),
            "route": "/user/resources",
            "icon": faPenToSquare
        },
        {
            "display_name": translate("menu.history"),
            "route": "/user/history",
            "icon": faHistory
        },
        {
            "display_name": translate("menu.help"),
            "route": "/user/help",
            "icon": faQuestionCircle,
            "class": user.isAdmin ? "hideColumn" : ""
        },
    ]

    function sidebarElement() {
        if (props.type === "navbar") {
            return <div className="row smallScreenMenu">
                {
                    sidebar_items.map((item, index) => (
                        (item.route !== "/user/help" || !user.isAdmin) ?
                            (<Link to={item.route} key={index} className="col col-md-3">
                                <div className='navbarItem '>
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span className='menuText'>{item.display_name}</span>
                                </div>
                            </Link>) : null

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
                        (item.route !== "/user/help" || !user.isAdmin) ?
                            (<Link to={item.route} key={index}>
                                <div className="sidebarItem">
                                    <div className={`sidebarItemInner ${props.active}`}>
                                        <FontAwesomeIcon icon={item.icon} />
                                        <span className='sidebarItemInnerTitle'>
                                            {item.display_name}
                                        </span>
                                    </div>
                                </div>
                            </Link>) : null
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