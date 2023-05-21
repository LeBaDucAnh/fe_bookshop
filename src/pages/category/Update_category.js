import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../config';

const EditCategoryModal = (props) => {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}/api/category/categories/${props.categoryID}/`)
      .then(response => {
        setCategoryName(response.data.category_name);
      })
      .catch(error => {
        console.error(error);
      });
  }, [props.categoryID]);

  const handleUpdateCategory = () => {
    const updatedCategory = { category_name: categoryName};
    axios.put(`${BASE_URL}/api/category/categories/${props.categoryID}/`, updatedCategory, {
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
        <Modal.Title>Sửa thể loại</Modal.Title>
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
        <Button variant="primary" onClick={handleUpdateCategory}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCategoryModal;
