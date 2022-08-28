import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import noimage from '../assets/images/noimage.png';
import { translate } from '../helpers/Helpers';

function ResourceCard(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let imagePath = props.image ? `/images/${props.image}` : noimage
  let cardLink = <Link to={`/user/choose-time/${props.id}`} className="btn btn-primary actionButtonsCard">{translate("resources_page.button.reserve")}</Link>


  return (
    <div className="card">
      <Button variant="secondary" onClick={handleShow}>
        <img className="card-img-top" src={imagePath} style={{ height: "200px" }} alt="resource_image" />
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
              <img className="img-fluid" src={imagePath} alt="G1s" style={{ height: "220px", width: "250px" }} />
            </div>
            <div className="container">
              {props.description}
            </div>
            <div className="container">
              <hr />
              <strong>{translate("resources_page.note")}:</strong> {props.note}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {cardLink}
          <Button variant="secondary actionButtonsCard" onClick={handleClose}>
            {translate("resources_page.button.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ResourceCard;