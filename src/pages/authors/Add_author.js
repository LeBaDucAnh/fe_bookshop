import {Button, Modal} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';

const AddAuthorModal = (props) => {
  const [authorName, setAuthorName] = useState('');
  const [authorImage, setAuthorImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setAuthorImage(file);
  };

  const handleAddAuthor = () => {
    const data = {
      author_name: authorName,
      author_image: authorImage,
      description: description,
    };

    axios.post(BASE_URL+'/api/author/authors/', data, {
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
        <Modal.Title>Thêm tác giả mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tên tác giả</Form.Label>
            <Form.Control type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Chọn file ảnh tác giả</Form.Label>
            <Form.Control type="file" onChange={handleFileInputChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control as="textarea" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddAuthor}>
          Lưu
        </Button>
        {" "}
        <Button variant="danger" onClick={props.handleClose}>
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddAuthorModal;