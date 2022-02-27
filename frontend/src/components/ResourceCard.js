import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import projector from '../assets/images/projector.jpg';

function ResourceCard(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let cardLink = <Link to={`/user/choose-time`} className="btn btn-primary actionButtonsCard">Reserve</Link>


  return (
    <div className="card">
      <Button variant="secondary" onClick={handleShow}>
        <img className="card-img-top" src={projector} style={{ height: "200px" }} alt="resource_image" />
        <h4 className="card-title">{props.name}</h4>
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-120w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="text-center bg-secondary mb-3">
              <img className="img-fluid" src={projector} alt="G1s" style={{ height: "220px", width: "250px" }} />
            </div>
            <div className="container">
              The best computer ever mede in history. You can play all of the videogames. New generation with microprocessor.
            </div>
            <div className="container">
              <hr />
              <strong>Note:</strong> It is not avaliable from March/April.{props.note}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {cardLink}
          <Button variant="secondary actionButtonsCard" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ResourceCard;