import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/unilj.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHistory, faQuestionCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


let sidebar_items = [
    {
        "display_name": "Reservations",
        "route": "/user/reservations",
        "icon": faList
    },
    {
        "display_name": "Choose Resource",
        "route": "/user/resources",
        "icon": faPenToSquare
    },
    {
        "display_name": "History",
        "route": "/user/history",
        "icon": faHistory
    },
    {
        "display_name": "Help",
        "route": "/user/help",
        "icon": faQuestionCircle
    },
]

const Sidebar = props => {

    function sidebarElement() {
        if (props.type == "navbar") {
            return <div className="row smallScreenMenu">
                {
                    sidebar_items.map((item, index) => (
                        <Link to={item.route} key={index} className="col">
                            <div className='navbarItem'>
                                <FontAwesomeIcon icon={item.icon} />
                                {item.display_name}
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