import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { translate, getConfig } from '../helpers/Helpers';
import Axios from "axios";

const ContactForm = (props) => {
    const [name, setName] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    async function handleSend(e) {
        try {
            e.preventDefault();
            let email = props.user.email
            await Axios.post(`http://localhost:3001/users/sendEmail`, { name, email, subject, message }, getConfig(props.user.token))
            console.log(name + " " + subject + " " + message)
        } catch (error) {
            console.error(error)
        }
    }

    let inputClass = "px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none w-100"
    return (
        <form onSubmit={handleSend} className='text-center'>
            <h5>{translate("help_page.contactFormTitle")}</h5>
            <div className="mb-3 pt-0">
                <input type="text" placeholder={translate("help_page.nameLabel")} name="name" onChange={(e) => setName(e)} className={inputClass} required />
            </div>
            <div className="mb-3 pt-0">
                <input type="text" placeholder={translate("help_page.topicLabel")} name="subject" onChange={(e) => setSubject(e)} className={inputClass} required />
            </div>
            <div className="mb-3 pt-0">
                <textarea placeholder={translate("help_page.messageLabel")} name="message" onChange={(e) => setMessage(e)} rows={5} className={inputClass} required />
            </div>
            <div className="mb-3 pt-0">
                <button className="btn btn-primary text-white text-sm shadow-none" onClick={handleSend} type="submit"> {translate("help_page.sendMessage")} </button>
            </div>
        </form>
    );
}

const HelpUser = props => {
    const current_user = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            <h2 className="page-header">
                {translate("titles.help")}
            </h2>
            <div>
                <p> {translate("help_page.friSite")}: &nbsp;
                    <Link to={{ pathname: "//fri.uni-lj.si/sl/studij" }} className="text-primary">https://fri.uni-lj.si/sl/studij</Link>
                </p>
                <p>{translate("help_page.questions")}</p>
                <div className='contactForm'>
                    <ContactForm user={current_user} />
                </div>
            </div>
        </div>
    );

}

export default HelpUser;