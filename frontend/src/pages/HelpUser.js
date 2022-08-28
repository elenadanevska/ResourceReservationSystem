import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { translate, getCurrentUser } from '../helpers/Helpers';
import emailjs from '@emailjs/browser';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import checkmark from '../assets/images/checmark.png';

const ContactForm = (props) => {
    const form = useRef();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    async function handleSend(e) {
        try {
            e.preventDefault();
            emailjs.sendForm('service_e39bnph', 'template_275yx69', e.target, '77DcNBN3o-UmPvOD5')
                .then(() => {
                    setShow(true);
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
        <div>
            <div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body className="model_view_res">
                        <div style={{ textAlign: "center", marginBottom: "10px" }}>
                            <img className="card-img-top" src={checkmark} style={{ width: "150px" }} alt="checkmark" />
                        </div>
                        <div className="container">
                            Your message had been sent successfully. You will receve a response on your email address as soon as possible!
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
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
        </div>
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