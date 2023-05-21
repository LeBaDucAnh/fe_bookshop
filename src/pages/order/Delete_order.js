import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../config';

const DeleteOrderModal = (props) => {
  const handleDeleteOrder = () => {
    axios.delete(`${BASE_URL}/api/transaction/transaction/${props.transId}/`)
      .then(response => {
        console.log(response);
        props.handleClose();
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xóa đơn hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc muốn xóa đơn hàng này?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDeleteOrder}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteOrderModal;
