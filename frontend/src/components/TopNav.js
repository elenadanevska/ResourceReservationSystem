import React from 'react';
import { Link } from 'react-router-dom';
import user_image from '../assets/images/userpng1.png';
import Dropdown from './UserDropdown';


const curr_user = {
    display_name: 'Elena Danevska',
    image: user_image
}
let user_menu = [
    {
        "icon": "bx bx-user",
        "content": "Profile"
    },
    {
        "icon": "bx bx-cog",
        "content": "Settings"
    },
    {
        "icon": "bx bx-log-out-circle bx-rotate-180",
        "content": "Logout"
    }
]

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
)

const renderUserMenu = (item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const Topnav = () => {
    return (
        <div className='topnav'>
            <div className="topnav__search">

            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Topnav