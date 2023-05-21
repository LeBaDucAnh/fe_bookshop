import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { BASE_URL } from "../../config";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

export default function OrderDetail({ match }) {
    const { id } = match.params;
    console.log(id);
    const [orderDetail, setOrderDetail] = useState({});
    useEffect(() => {
        axios.get(BASE_URL + "/api/transaction/transaction/"+ id + '/')
        .then(res=>{
          setOrderDetail(res.data)})
          .catch(err => console.log(err));
      }, [id]);
    console.log(orderDetail);
    return (
        <>
        <PageTitle title="Chi tiết đơn hàng" />
            <Table striped bordered hover size="lg">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td colSpan={2}>{orderDetail.id}</td>
                    </tr>
                    <tr>
                        <th>Tên khách hàng</th>
                        <td>{orderDetail?.customer.fullname}</td>
                    </tr>
                    <tr>
                        <th>Tổng tiền</th>
                        <td>{orderDetail.amount}</td>
                    </tr>
                    <tr>
                        <th>Số điện thoại</th>
                        <td>{orderDetail.phone}</td>
                    </tr>
                    {/* <tr>
                        <th>Trạng thái</th>
                        <td>{orderDetail.status}</td>
                    </tr> */}
                    <tr>
                        <th>Địa chỉ</th>
                        <td>{orderDetail.address}</td>
                    </tr>
                    <tr>
                        <th>Ngày tạo</th>
                        <td>{orderDetail.created_at}</td>
                    </tr>
                    <tr>
                        <th>Ngày cập nhật</th>
                        <td>{orderDetail.updated_at}</td>
                    </tr>
                </tbody>
            </Table>
            

            {/* <Grid container spacing={4} style={{ marginTop: "20px" }}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Danh sách đơn hàng"
                        data={transactionList}
                        columns={
                            [
                            {
                                name: "id",
                                label: "Mã đơn hàng",
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
                                name: "phone",
                                label: "Số điện thoại",
                                options: {
                                  filter: false,
                                  sort: true,
                                },
                              },
                              {
                                name: "amount",
                                label: "Tổng tiền",
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
                                name: "status",
                                label: "Trạng thái",
                                options:{
                                    customBodyRender: (status)=>{
                                        let color;
                                        let text;
                                        switch(status){
                                            case 'PENDING':
                                                text = "Chờ xác nhận"
                                                color = 'orange';
                                                break;
                                            case 'Completed':
                                                text = "Thành công"
                                                color = 'green';
                                                break;
                                            case 'Cancelled':
                                                text = "Đã hủy"
                                                color = 'red';
                                                break;
                                            default:
                                                text = "Đang giao"
                                                color = 'transparent';
                                                break;
                                        }
                                        return(
                                            <div style={{backgroundColor: color, borderRadius: "15px", padding: "5px", textAlign: "center", color: "black"}}>
                                                {text}
                                            </div>
                                        );
                                    }
                                }
                            },
                                {
                                    name: "",
                                    options: {
                                        filter: false,
                                        sort: false,
                                        customBodyRender: (value, tableMeta, updateValue) => {
                                            return (
                                                <div className={classes.buttonsContainer}>
                                                    <Link to="/app/order/orderdetail">
                                                    <Button
                                                        variant="success"
                                                        onClick={() => console.log("Detail")}
                                                    >
                                                        Chi tiết
                                                    </Button></Link>
                                                    {" "}
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => handleEditOrder(tableMeta.rowData[0])}
                                                    >
                                                        Sửa
                                                    </Button>
                                                    {" "}
                                                    <Button
                                                        variant="danger"
                                                        onClick={handleShow}
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
                </Grid>
            </Grid> */}
        </>
    );
}
