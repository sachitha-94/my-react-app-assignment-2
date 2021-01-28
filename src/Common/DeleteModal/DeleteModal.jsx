import React from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router";


const deleteModal = (props) => {

    const { show, handleClose, title, body, handleDelete } = props

    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
          </Button>
                <Button variant="primary" onClick={handleDelete}>
                    Delete
          </Button>
            </Modal.Footer>
        </Modal>

    );
}




const DeleteModal = withRouter(deleteModal);

export { DeleteModal };   
