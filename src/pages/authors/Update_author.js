import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../config';

const EditAuthorModal = (props) => {
  const [authorName, setAuthorName] = useState('');
  const [authorImage, setAuthorImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setAuthorImage(file);
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/api/author/authors/${props.authorId}/`)
      .then(response => {
        setAuthorName(response.data.author_name);
        setDescription(response.data.description);
      })
      .catch(error => {
        console.error(error);
      });
  }, [props.authorId]);

  const handleUpdateAuthor = () => {
    const updatedAuthor = {
       author_name: authorName,
       description: description
    };
    if (authorImage) {
      updatedAuthor['author_image'] = authorImage;
    }
    console.log(updatedAuthor);
    axios.put(`${BASE_URL}/api/author/author/${props.authorId}/`, updatedAuthor, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
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
        <Modal.Title>Sửa tác giả</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên tác giả</Form.Label>
            <Form.Control type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
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
        <Button variant="secondary" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleUpdateAuthor}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAuthorModal;