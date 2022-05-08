import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from '../helpers/Helpers';

const ContactForm = (props) => {
    return (
        <form method="POST" className='text-center'>
            <h5>{translate("help_page.contactFormTitle", props.lang)}</h5>
            <div className="mb-3 pt-0">
                <input
                    type="text"
                    placeholder={translate("help_page.nameLabel", props.lang)}
                    name="name"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none w-100"
                    required
                />
            </div>
            <div className="mb-3 pt-0">
                <input
                    type="email"
                    placeholder={translate("help_page.topicLabel", props.lang)}
                    name="topic"
                    className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none w-100"
                    required
                />
            </div>
            <div className="mb-3 pt-0">
                <textarea
                    placeholder={translate("help_page.messageLabel", props.lang)}
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
                    {translate("help_page.sendMessage", props.lang)}
                </button>
            </div>
        </form>
    );
}

const HelpUser = props => {
    const current_user = JSON.parse(localStorage.getItem("user"));
    const slovenian = current_user.slovenian;
    return (
        <div>
            <h2 className="page-header">
                {translate("titles.help", slovenian)}
            </h2>
            <div>
                <p> {translate("help_page.friSite", slovenian)}: &nbsp;
                    <Link to={"https://fri.uni-lj.si/sl/studij"} className="text-primary">https://fri.uni-lj.si/sl/studij</Link>
                </p>
                <p>{translate("help_page.questions", slovenian)}</p>
                <div className='contactForm'>
                    <ContactForm lang={slovenian} />
                </div>
            </div>
        </div>
    );

}

export default HelpUser;