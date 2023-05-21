import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BASE_URL } from "../../config";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalConfirmDeleteUser = (props) => {
    const history = useHistory();
    const handleDelete = () => {
        axios.delete(`${BASE_URL}/customer/${props.customerId}/`)
            .then(response => {
                console.log(response);
                props.handleClose();
                toast.success('Xóa thành công!');
                window.location.reload();

            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa khách hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn xóa trường này không?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Hủy
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalConfirmDeleteUser;
