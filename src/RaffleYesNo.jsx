import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function RaffleYesNo(props) {

    const handleClose = () => props.closeDialog();

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Sorteo "{props.name}"</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Confirme que desea procesar el sorteo</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={() => props.sortear()}>Sortear</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RaffleYesNo;