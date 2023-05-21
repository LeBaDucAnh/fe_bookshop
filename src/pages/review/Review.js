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
import DeleteReviewModal from "./Delete_review";

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function Reviews() {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [reviewList, setReviewList] = useState([]);
    const [reviewSelected, setReviewSeleted] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const reviews = await axios.get(BASE_URL + "/api/review/reviews/");
            setReviewList(reviews.data);
        };
        fetchData();
    }, []);
    console.log(reviewList);
    console.log();

    const handleDelete = (reviewId) =>{
        setReviewSeleted(reviewId);
        setShow(true);
    }

    return (
        <>
            <PageTitle title="Bình luận" />
            {/* <Link to="/app/category/addcategory"><Button
                variant="primary"
                onClick={() => console.log("Add")}>
                Thêm thể loại mới
            </Button></Link> */}
            <Grid container spacing={4} style={{ marginTop: "20px" }}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Danh sách bình luận"
                        data={reviewList}
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
                                name: "fullname",
                                label: "Họ tên",
                                options: {
                                  filter: false,
                                  sort: true,
                                },
                              },
                              {
                                name: "book_name",
                                label: "Tên sách",
                                options: {
                                  filter: false,
                                  sort: true,
                                },
                              },
                              {
                                name: "star",
                                label: "Số sao",
                                options: {
                                  filter: false,
                                  sort: true,
                                },
                              },
                              {
                                name: "comment",
                                label: "Bình luận",
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
                                                    {/* <Link to="/app/author/detailauthor">
                                                    <Button
                                                        variant="success"
                                                        onClick={() => console.log("Detail")}
                                                    >
                                                        Chi tiết
                                                    </Button></Link> */}
                                                    {" "}
                                                    {/* <Link to="/app/review/updatereview">
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => console.log("Update")}
                                                    >
                                                        Sửa
                                                    </Button></Link> */}
                                                    {" "}
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => {handleDelete(tableMeta.rowData[0])}}
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
                    <DeleteReviewModal show={show} handleClose = {handleClose} reviewId={reviewSelected}/>
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
