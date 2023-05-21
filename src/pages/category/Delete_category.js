import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../config';

const DeleteCategoryModal = (props) => {
  const handleDeleteProduct = () => {
    axios.delete(`${BASE_URL}/api/category/categories/${props.categoryId}/`)
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
        <Modal.Title>Xóa thể loại</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc muốn xóa thể loại này?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDeleteProduct}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCategoryModal;
