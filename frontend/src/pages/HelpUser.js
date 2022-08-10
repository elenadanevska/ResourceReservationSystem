import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { translate, getCurrentUser } from '../helpers/Helpers';
import emailjs from '@emailjs/browser';

const ContactForm = (props) => {
    const form = useRef();

    async function handleSend(e) {
        try {
            e.preventDefault();
            emailjs.sendForm('service_e39bnph', 'template_275yx69', e.target, '77DcNBN3o-UmPvOD5')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            e.target.reset()
        } catch (error) {
            console.error(error)
        }
    }

    let inputClass = "px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none w-100"
    return (
        <form ref={form} onSubmit={handleSend}>
            <div className="mb-3 pt-0">
                <input type="text" placeholder={translate("help_page.nameLabel")} name="from_name" className={inputClass} required />
            </div>
            <div className="mb-3 pt-0">
                <input type="text" placeholder={translate("help_page.topicLabel")} name="subject" className={inputClass} required />
            </div>
            <div className="mb-3 pt-0">
                <textarea placeholder={translate("help_page.messageLabel")} name="message" rows={5} className={inputClass} required />
            </div>
            <div className="mb-3 pt-0">
                <button className="btn btn-primary text-white text-sm shadow-none" type="submit"> {translate("help_page.sendMessage")} </button>
            </div>
            <input type="text" value={props.user.email} name="to_email" className="d-none" required />
        </form>
    );
}

const HelpUser = props => {

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
                    <ContactForm user={getCurrentUser()} />
                </div>
            </div>
        </div>
    );

}

export default HelpUser;