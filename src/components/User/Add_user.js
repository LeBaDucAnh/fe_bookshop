import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUserModal = (props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleAddUser = () => {
    const data = { 
        fullname: fullName,
        email: email,
        password: password,
    };
    console.log(data);
    axios.post(BASE_URL+'/customers/', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response);
        props.handleClose();
        toast.success('Thêm thành công!');
        window.location.reload();

      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thêm người dùng mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Họ tên khách hàng</Form.Label>
            <Form.Control type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleAddUser}>
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
