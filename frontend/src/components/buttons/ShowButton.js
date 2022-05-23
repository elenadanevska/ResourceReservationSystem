import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { translate } from '../../helpers/Helpers';

function ShowButton(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <button type="button" className="btn btn-primary btn-sm mr-1 mb-1" style={{ width: "35px" }} onClick={handleShow}>
                <FontAwesomeIcon icon={faEye} />
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Reservation Information</Modal.Title>
                </Modal.Header>
                <Modal.Body className="model_view_res">
                    <div className="container">
                        <p><b>{translate("reservations_page.resource_name")}:</b> {props.name}</p>
                        <p><b>{translate("reservations_page.date")}:</b> {props.date}</p>
                        <p><b>{translate("reservations_page.time")}:</b> {props.time}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {translate("resources_page.button.close")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ShowButton;