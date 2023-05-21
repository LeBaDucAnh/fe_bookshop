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
import axios from "axios";
import { BASE_URL } from "../../config";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import AddAuthorModal from "./Add_author";
import DeleteAuthorModal from "./Delete_author";
import EditAuthorModal from "./Update_author";

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function Authors() {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [authorList, setAuthorList] = useState([]);
    const [del, setDel] = useState(false);
    const [selectedAuthorId, setSelectedAuthorId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const authors = await axios.get(BASE_URL + "/api/author/authors/");
            setAuthorList(authors.data);
        };
        fetchData();
    }, []);

    const handleCloseUpdate = () => {
        setUpdate(false);
      };

    const handleAddAuthor = () => {
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };
      const handleCloseDelte = () =>{
        setDel(false);
      }

      const handleEditAuthor = (authorId) => {
        setSelectedAuthorId(authorId);
        setUpdate(true);
      };
  
      const handleDeleteAuthor = (authorId) => {
        setSelectedAuthorId(authorId);
        setDel(true);
      }
    return (
        <>
            <PageTitle title="Tác giả" />
            <Button
                variant="primary"
                onClick={handleAddAuthor}>
                Thêm tác giả mới
            </Button>
            <Grid container spacing={4} style={{ marginTop: "20px" }}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Danh sách tác giả"
                        data={authorList}
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
                                name: "author_name",
                                label: "Tên tác giả",
                                options: {
                                  filter: false,
                                  sort: true,
                                },
                              },
                              {
                                name: "author_image",
                                label: "Hình ảnh",
                                options: {
                                    filter: false,
                                    sort: false,
                                    customBodyRender: (value, tableMeta, updateValue) => {
                                      return (
                                        <img src={BASE_URL + value} alt={tableMeta.rowData[0]} style={{ width: 100 }} />
                                      );
                                    },
                                  },
                              },
                              {
                                name: "description",
                                label: "Mô tả",
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
                                                        onClick={() => handleEditAuthor(tableMeta.rowData[0])}
                                                    >
                                                        Sửa
                                                    </Button>
                                                    {" "}
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDeleteAuthor(tableMeta.rowData[0])}
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

                    <AddAuthorModal show={showModal} handleClose={handleCloseModal}/>
                    <EditAuthorModal show={update} handleClose={handleCloseUpdate} authorId={selectedAuthorId}/>
                    <DeleteAuthorModal show={del} handleClose={handleCloseDelte} authorId={selectedAuthorId}/>
                </Grid>
            </Grid>
        </>
    );
}
