import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/unilj.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHistory, faQuestionCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


let sidebar_items = [
    {
        "display_name": "Reservations",
        "route": "/",
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


const SidebarItem = props => {

    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <FontAwesomeIcon icon={props.icon} />
                <span className='sidebar__itemTitle'>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = props => {

    /*const activeItem = sidebar_items.findIndex(item => item.route === props.location.pathname)*/

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img src={logo} alt="uni logo" />
            </div>
            {
                sidebar_items.map((item, index) => (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                        />
                    </Link>
                ))
            }
        </div>
    )
}

export default Sidebar