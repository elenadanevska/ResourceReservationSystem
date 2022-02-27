import React, { useState } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                        <p><b>Resource name:</b> {props.name}</p>
                        <p><b>Place:</b> {props.place}</p>
                        <p><b>Date:</b> {props.date}</p>
                        <p><b>Time:</b> {props.time}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ShowButton;