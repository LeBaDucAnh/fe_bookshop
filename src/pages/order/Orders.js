import React, {useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
// import { Button } from "../../components/Wrappers/Wrappers";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import { Link, useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../../config";
import axios from "axios";
import EditTransactionModal from "./Update_order";
import OrderDetail from "./Detailorder";
import DeleteOrderModal from "./Delete_order";

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

const states = {
    completed: "success",
    pending: "warning",
    cancelled: "danger",
};

export default function Order() {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false);
    const [del, setDel] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [transactionList, setTransactionList] = useState([]);
    const [detail, setDetail] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
        const fetchData = async () => {
            const transactions = await axios.get(BASE_URL + "/api/transaction/transactions/");
            console.log(transactions);
            setTransactionList(transactions.data);
        };
        fetchData();
    }, []);
    
    console.log(transactionList);

    const handleCloseUpdate = () => {
        setUpdate(false);
      };
    
    const handleCloseDetail = () => {
        setDetail(false);
      };
    const handleDeleteOrder = (transId) =>{
        setSelectedOrderId(transId);
        setDel(true);
    }
    const handleCloseDelete = () => {
      setDel(false);
    };
    // const handleViewDetail = (rowData) => {
    //     const id = rowData[0];
    //     console.log('detail', id);
    //     history.push(`/app/order/orderdetail/${id}`);
    // };

    const handleEditOrder = (transactionId) => {
        setSelectedOrderId(transactionId);
        console.log(transactionId);
        setUpdate(true);
      };
    const handleDetailOrder = (transid) => {
        setSelectedOrderId(transid);
        console.log(transid);
        setDetail(true);
      };

      const handleSaveProduct = () => {
        // Tải lại danh sách sản phẩm sau khi thêm thành công
        axios.get(BASE_URL + "/api/transaction/transactions/")
          .then(response => {
            setTransactionList(response.data);
            console.log(response.data);
            handleCloseUpdate();
          })
          .catch(error => {
            console.error(error);
          });
      };
    
    return (
        <>
            <PageTitle title="Quản lý đơn hàng" />

            <Grid container spacing={4} style={{ marginTop: "20px" }}>
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
                                            case 'COMPLETED':
                                                text = "Thành công"
                                                color = 'green';
                                                break;
                                            case 'CANCELED':
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
                                                    <Button
                                                        variant="success"
                                                        onClick={() => handleDetailOrder(tableMeta.rowData[0])}
                                                    >
                                                        Chi tiết
                                                    </Button>
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
                                                        onClick={() => handleDeleteOrder(tableMeta.rowData[0])}
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

                    <EditTransactionModal show={update} handleClose={handleCloseUpdate} handleSave={handleSaveProduct} transactionID={selectedOrderId} />
                    <OrderDetail show={detail} handleClose={handleCloseDetail} transid={selectedOrderId}/>
                    <DeleteOrderModal show={del} handleClose={handleCloseDelete} transId = {selectedOrderId}/>
                </Grid>
            </Grid>
        </>
    );
}
