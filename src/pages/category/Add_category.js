import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../config';

const AddCategoryModal = (props) => {
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = () => {
    const newCateogry = { category_name: categoryName};
    console.log(newCateogry);
    axios.post(BASE_URL+'/api/category/categories/', newCateogry,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
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
        <Modal.Title>Thêm thể loại mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên thể loại</Form.Label>
            <Form.Control type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleAddCategory}>
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCategoryModal;
