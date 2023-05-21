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

export default function OrderDetail(props) {
    const [orderDetail, setOrderDetail] = useState({});
    const [order, setOrder] = useState({});
    const [listorder, setListorder] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL + "/api/transaction/transaction/"+ props.transid + '/')
        .then(res=>{
          setOrderDetail(res.data)})
          .catch(err => console.log(err));
      }, [props.transid]);
    console.log(orderDetail);

    useEffect(()=>{
        axios.get(BASE_URL + "/api/order/order-trans/"+ orderDetail.id + '/')
        .then(res=>{
          setOrder(res.data)})
          .catch(err => console.log(err));
      }, [orderDetail.id]);
      console.log(order);

      useEffect(()=>{
        axios.get(BASE_URL + "/api/order/detail/"+ order.id + '/')
        .then(res=>{
            const detailsWithBooks = res.data.map(detail => {
                axios.get(BASE_URL + "/api/book/books/" + detail.book+ '/')
                  .then(book => {
                    detail.book_name = book.data.book_name;
                  })
                  .catch(error => console.log(error));
                return detail;
                
              });
          setListorder(detailsWithBooks)})
          .catch(err => console.log(err));
      }, [order.id]);
    //   console.log(detailsWithBooks);
      console.log(listorder);
      listorder.forEach(element => {
        console.log(element.book_name);
      });
      
    return (
        <>
        <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Chi tiết đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table striped bordered hover size="lg">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td colSpan={2}>{orderDetail.id}</td>
                    </tr>
                    <tr>
                        <th>Tên khách hàng</th>
                        <td>{orderDetail.fullname}</td>
                    </tr>
                    <tr>
                        <th>Tổng tiền</th>
                        <td>{orderDetail.amount}</td>
                    </tr>
                    <tr>
                        <th>Số điện thoại</th>
                        <td>{orderDetail.phone}</td>
                    </tr>
                    <tr>
                        <th>Trạng thái</th>
                        <td>{orderDetail.status}</td>
                    </tr>
                    <tr>
                        <th>Địa chỉ</th>
                        <td>{orderDetail.address}</td>
                    </tr>
                    <tr>
                        <th>Ghi chú</th>
                        <td>{orderDetail.message}</td>
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

            <div>
            <Table striped bordered hover size="lg">
                <thead>
                    <tr>
                        <th>Tên sách</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Tổng giá</th>
                    </tr>
                </thead>
                <tbody>
                    {listorder.map(de =>(
                        <tr>
                            <td style={{width: "200px", textAlign: "center"}}>{de.book_name}</td>
                            <td>{de.qty}</td>
                            <td>{de.unit_price} VNĐ</td>
                            <td>{de.qty * de.unit_price} VNĐ</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            
            </Modal.Body>
            </Modal>
        </>
    );
}
