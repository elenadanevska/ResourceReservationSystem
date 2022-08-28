import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Axios from "axios";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getConfig, translate } from '../../helpers/Helpers';

function DeleteButton(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const deleteReservation = (id) => {
        Axios.delete(`http://localhost:3001/reservations/${id}/${props.user._id}`, getConfig(props.user.token)).then((response) => {
            console.log(response);
            if (response.status === 200) {
                if (props.user.isAdmin) {
                    Axios.get("http://localhost:3001/reservations", getConfig(props.user.token))
                        .then((response) => {
                            props.setRes(response.data);
                        });
                } else {
                    Axios.get(`http://localhost:3001/reservations/user/${props.user._id}`, getConfig(props.user.token))
                        .then((response) => {
                            props.setRes(response.data);
                        });
                }
                console.log("reseration deleted")
            }
        });
    }

    const handleDelete = () => {
        deleteReservation(props.id);
        setShow(false);
    };

    const deleteButton = <button type="button" className="btn btn-danger btn-sm mr-1" style={{ width: "35px" }} onClick={handleShow}>
        <FontAwesomeIcon icon={faTrash} />
    </button>

    return (
        <div>
            {deleteButton}
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="overlay-opacity"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {translate("reservations_page.confirm_delete")}
                        <br />
                        <h5 className="mt-2 text-secondary">
                            {props.name} <br /> {props.date} {props.time}
                        </h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={handleDelete}>
                        {translate("reservations_page.confirm_yes")}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        {translate("reservations_page.confirm_no")}
                    </Button>
                </Modal.Footer >
            </Modal >
        </div >
    );
}

export default DeleteButton;