import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../config';

const EditCustomerModal = (props) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}/customer/${props.customerID}/`)
      .then(response => {
        setFullName(response.data.fullname);
        setEmail(response.data.email);
      })
      .catch(error => {
        console.error(error);
      });
  }, [props.customerID]);

  const handleUpdateCustomer = () => {
    const data = { 
        fullname: fullName,
        email: email,
    };
    axios.put(`${BASE_URL}/customer/${props.customerID}/`, data, {
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
        <Modal.Title>Sửa thông tin khách hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Họ tên khách hàng</Form.Label>
            <Form.Control type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleUpdateCustomer}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCustomerModal;
