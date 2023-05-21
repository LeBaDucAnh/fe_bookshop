import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import AddUserModal from "./Add_user";
// components
import PageTitle from "../../components/PageTitle";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config";
import axios from "axios";
import EditCustomerModal from "./Update_user";
import ModalConfirmDeleteUser from "./Delete_user";

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function Users() {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [delet, setDelet] = useState(false);
    const [update, setUpdate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const customers = await axios.get(BASE_URL + "/customers/");
            console.log(customers);
            setCustomers(customers.data);
        };
        fetchData();
    }, []);

    const handleAddUser = () => {
        setShowModal(true);
      };

    const handleCloseModal = () => {
        setShowModal(false);
      };
    
      const handleCloseUpdate = () => {
        setUpdate(false);
      };
    
    const handleEditUser = (userId) => {
        setSelectedUserId(userId);
        console.log(userId);
        setUpdate(true);
      };
    
    const handleCloseDelte = () =>{
      setDelet(false);
    }

    const handleDeleteUser = (userId) => {
      setSelectedUserId(userId);
      setDelet(true);
    }

      const handleSaveProduct = () => {
        // Tải lại danh sách sản phẩm sau khi thêm thành công
        axios.get(BASE_URL + "/customers/")
          .then(response => {
            setCustomers(response.data);
            console.log(response.data);
            handleCloseModal();
            // handleCloseUpdate();
          })
          .catch(error => {
            console.error(error);
          });
      };
    
    return (
        <>
            <PageTitle title="Người dùng" />
            <Button
                variant="primary"
                onClick={handleAddUser}>
                Thêm người dùng mới
            </Button>
            <Grid container spacing={4} style={{ marginTop: "20px" }}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Danh sách người dùng"
                        data={customers}
                        columns={[
                            {
                                name: "id",
                                label: "ID",
                                options: {
                                  filter: false,
                                  sort: true,
                                },
                              },
                              {
                                name: "fullname",
                                label: "Tên khách hàng",
                                options: {
                                  filter: false,
                                  sort: true,
                                },
                              },
                              {
                                name: "email",
                                label: "Email",
                                options: {
                                  filter: false,
                                  sort: true,
                                },
                              },
                              {
                                name: "created_at",
                                label: "Thời gian tạo",
                                options: {
                                  filter: false,
                                  sort: true,
                                },
                              },
                              {
                                name: "updated_at",
                                label: "Thời gian cập nhật",
                                options: {
                                  filter: false,
                                  sort: true,
                                },
                              },
                                {
                                    name: "",
                                    options: {
                                        filter: false,
                                        sort: false,
                                        customBodyRender: (value, tableMeta, updateValue) => {
                                            return (
                                                <div className={classes.buttonsContainer}>
                                                        <Button
                                                            variant="primary"
                                                            onClick={() => handleEditUser(tableMeta.rowData[0])}
                                                        >
                                                            Sửa
                                                        </Button>
                                                    {" "}
                                                    <Button
                                                        variant="danger"
                                                        onClick={()=>handleDeleteUser(tableMeta.rowData[0])}
                                                    >Xóa</Button>
                                                </div>
                                            );
                                        }
                                    }
                                }
                            ]

                        }
                        options={{
                            filterType: "checkbox",
                            selectableRows: "none",
                            responsive: "standard",
                            filter: true,
                            search: true,
                            pagination: true,
                            rowsPerPageOptions: [5, 10, 20],
                        }}
                    />
                    {/* <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Xác nhận xóa</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Bạn chắc chắn xóa trường dữ liệu này?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Đồng ý
                            </Button>
                            {" "}
                            <Button variant="secondary" onClick={handleClose}>
                                Hủy
                            </Button>
                        </Modal.Footer>
                    </Modal> */}

                    <AddUserModal show={showModal} handleClose={handleCloseModal} handleSave={handleSaveProduct} />      
                    <EditCustomerModal show={update} handleClose={handleCloseUpdate} handleSave={handleSaveProduct} customerID={selectedUserId} />
                    <ModalConfirmDeleteUser show={delet} handleClose={handleCloseDelte} handleSave={handleSaveProduct} customerId = {selectedUserId}/>
                </Grid>
            </Grid>
        </>
    );
}
