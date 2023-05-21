import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
// import { Button } from "../../components/Wrappers/Wrappers";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import classnames from "classnames";
// data
import mock from "../dashboard/mock";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import axios from "axios";
import AddCategoryModal from "./Add_category";
import EditCategoryModal from "./Update_category";
import DeleteCategoryModal from "./Delete_category";
import { BASE_URL } from "../../config";

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function Categories() {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false);
    const [del, setDel] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [categoryList, setCategoryList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const categories = await axios.get(BASE_URL + "/api/category/categories/");
            console.log(categories);
            setCategoryList(categories.data);
        };
        fetchData();
    }, []);
    console.log("Thể loại", categoryList);

    const handleAddCategory = () => {
        setShowModal(true);
      };
    
    const handleCloseModal = () => {
        setShowModal(false);
      };
      const handleCloseUpdate = () => {
        setUpdate(false);
      };
    
    const handleEditCategory = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setUpdate(true);
      };

      const handleCloseDelte = () =>{
        setDel(false);
      }
  
      const handleDeleteCategory = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setDel(true);
      }

    console.log("id: ",selectedCategoryId);
    const handleSaveProduct = () => {
        // Tải lại danh sách sản phẩm sau khi thêm thành công
        axios.get(BASE_URL + "/api/category/categories/")
          .then(response => {
            setCategoryList(response.data);
            console.log(response.data);
            handleCloseModal();
            handleCloseUpdate();
          })
          .catch(error => {
            console.error(error);
          });
      };
    
    return (
        <>
            <PageTitle title="Thể loại" />
            <Button
                variant="primary"
                onClick={handleAddCategory}>
                Thêm thể loại mới
            </Button>
            <Grid container spacing={4} style={{ marginTop: "20px" }}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Danh sách thể loại"
                        data={categoryList}
                        columns={
                            [{
                                name: "id",
                                label: "ID",
                                options: {
                                  filter: false,
                                  sort: true,
                                },
                              },
                              {
                                name: "category_name",
                                label: "Tên thể loại",
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
                                                        onClick={() => handleEditCategory(tableMeta.rowData[0])}
                                                    >
                                                        Sửa
                                                    </Button>
                                                    {" "}
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDeleteCategory(tableMeta.rowData[0])}
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

                    <EditCategoryModal show={update} handleClose={handleCloseUpdate} handleSave={handleSaveProduct} categoryID={selectedCategoryId} />
                    <DeleteCategoryModal show={del} handleClose={handleCloseDelte} handleSave={handleSaveProduct} categoryId={selectedCategoryId}/>
                    {/* <Modal show= {show} onHide ={handleClose} centered>
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

                    {/* <Modal show= {add} onHide ={closeAdd} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm thể loại mới</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Tên thể loại</Form.Label>
                                <Form.Control/>
                            </Form.Group>
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Lưu
                            </Button>
                            {" "}
                            <Button variant="secondary" onClick={handleClose}>
                                Hủy
                            </Button>
                        </Modal.Footer>
                    </Modal> */}

                    <AddCategoryModal show={showModal} handleClose={handleCloseModal} handleSave={handleSaveProduct} />

                    {/* <Modal show= {update} onHide ={closeUpdate} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Sửa thể loại</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Tên thể loại</Form.Label>
                                <Form.Control/>
                            </Form.Group>
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Lưu
                            </Button>
                            {" "}
                            <Button variant="secondary" onClick={handleClose}>
                                Hủy
                            </Button>
                        </Modal.Footer>
                    </Modal> */}
                </Grid>
                {/* <Grid item xs={12}>
                    <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                        <Table data={mock.table} />
                    </Widget>
                </Grid> */}
            </Grid>
        </>
    );
}
