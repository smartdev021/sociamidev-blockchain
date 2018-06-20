import React from 'react';

import { Button, Modal } from 'react-bootstrap';

const ThankYouModal = (props) => {
    return (
        <Modal show={props.isVisible} onHide={() => props.closeSubscribeThankYouModal()} className="modal-thank-you-subscribtion">
            <Modal.Header closeButton>
                <Modal.Title>Subscribe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Thank You for Subscribing!</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.closeSubscribeThankYouModal()}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ThankYouModal;