import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../config';

const DeleteAuthorModal = (props) => {
  const handleDeleteAuthor = () => {
    axios.delete(`${BASE_URL}/api/author/author/${props.authorId}/`)
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
        <Modal.Title>Xóa tác giả</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc muốn xóa tác giả này?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDeleteAuthor}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAuthorModal;
