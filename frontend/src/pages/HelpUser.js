import React from 'react';
import slo from "../translations/slo.json";
import en from "../translations/en.json";
import { Link } from 'react-router-dom';

const ContactForm = (props) => {
    return (
        <form method="POST" className='text-center'>
            <h5>{props.fileName.help_page.contactFormTitle}</h5>
            <div className="mb-3 pt-0">
                <input
                    type="text"
                    placeholder={props.fileName.help_page.nameLabel}
                    name="name"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none w-100"
                    required
                />
            </div>
            <div className="mb-3 pt-0">
                <input
                    type="email"
                    placeholder={props.fileName.help_page.topicLabel}
                    name="topic"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none w-100"
                    required
                />
            </div>
            <div className="mb-3 pt-0">
                <textarea
                    placeholder={props.fileName.help_page.messageLabel}
                    name="message"
                    rows={5}
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-100"
                    required
                />
            </div>
            <div className="mb-3 pt-0">
                <button
                    className="btn btn-primary text-white text-sm shadow-none"
                    type="submit">
                    {props.fileName.help_page.sendMessage}
                </button>
            </div>
        </form>
    );
}

const HelpUser = props => {
    const current_user = JSON.parse(localStorage.getItem("user"));
    const slovenian = current_user.slovenian;
    var translationFile = slovenian ? slo : en
    return (
        <div>
            <h2 className="page-header">
                {translationFile.titles.help}
            </h2>
            <div>
                <p> {translationFile.help_page.friSite}: &nbsp;
                    <Link to={"https://fri.uni-lj.si/sl/studij"} className="text-primary">https://fri.uni-lj.si/sl/studij</Link>
                </p>
                <p>{translationFile.help_page.questions}</p>
                <div className='contactForm'>
                    <ContactForm fileName={translationFile} />
                </div>
            </div>
        </div>
    );

}

export default HelpUser;