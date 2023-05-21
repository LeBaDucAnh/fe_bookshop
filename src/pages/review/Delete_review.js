import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../config';

const DeleteReviewModal = (props) => {
  const handleReview = () => {
    axios.delete(`${BASE_URL}/api/review/reviews/${props.reviewId}/`)
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
        <Modal.Title>Xóa bình luận</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc muốn xóa bình luận này?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleReview}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteReviewModal;
