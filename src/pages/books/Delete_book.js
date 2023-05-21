import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BASE_URL } from "../../config";
import axios from "axios";

const ModalConfirmDeleteBook = (props) => {

  const handleDelete = () => {
    axios.delete(`${BASE_URL}/api/book/book/${props.bookID}/`)
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
        <Modal.Title>Xác nhận xóa sách</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc chắn muốn xóa sách này không?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmDeleteBook;
