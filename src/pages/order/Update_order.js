import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../config';

const EditTransactionModal = (props) => {
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}/api/transaction/transaction/${props.transactionID}/`)
      .then(response => {
        setAddress(response.data.address);
        setPhone(response.data.phone);
        setStatus(response.data.status);
      })
      .catch(error => {
        console.error(error);
      });
  }, [props.transactionID]);

  const handleUpdateTransaction = (e) => {
    e.preventDefault();
    const data = {
      address: address,
      status: status,
      phone: phone,
    };
    axios.put(`${BASE_URL}/api/transaction/transaction/${props.transactionID}/`, data,
    {headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
    )
      .then(response => {
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
        <Modal.Title>Cập nhật thông tin đơn hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="PENDING">Chờ xác nhận</option>
              <option value="DELIVERING">Đang giao</option>
              <option value="COMPLETED">Giao thành công</option>
              <option value="CANCELED">Đã hủy</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleUpdateTransaction}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTransactionModal;
