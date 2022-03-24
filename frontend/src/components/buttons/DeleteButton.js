import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Axios from "axios";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DeleteButton(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const deleteReservation = (id) => {
        Axios.delete(`http://localhost:3001/reservations/${id}`).then((response) => {
            if (response.status === 200) {
                /* Axios.get("http://localhost:3001/reservations")
                     .then((response) => {
                         let data = response.data
                         props.reservations = data;
                     });
                 */
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
                    <Modal.Title>Are you sure you want to delete this reservation?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={handleDelete}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer >
            </Modal >
        </div >
    );
}

export default DeleteButton;