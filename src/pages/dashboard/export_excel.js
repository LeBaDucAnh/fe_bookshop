import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { BASE_URL } from '../../config';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';

function Report() {
  // Khởi tạo state
  const [revenue, setRevenue] = useState(null);
  const [books, setBooks] = useState(null);
  const [orders, setOrders] = useState(null);
  // const date = new Date();
  // const day = date.getDate().toString().padStart(2, '0');
  // const month = (date.getMonth() + 1).toString().padStart(2, '0');
  // const year = date.getFullYear().toString();
  // const formattedDate = `${day}/${month}/${year}`;
  // Hàm xử lý khi click nút xuất Excel
  const handleExportExcel = () => {

    // Tạo workbook mới
    const wb = XLSX.utils.book_new();

    // Tạo worksheet cho doanh thu
    const revenueData = [['Ngày', 'Doanh thu']];
    orders.forEach(order => revenueData.push([order.date, order.reven]));
    // revenueData.push([formattedDate, revenue]);
    const revenueWs = XLSX.utils.aoa_to_sheet(revenueData);
    XLSX.utils.book_append_sheet(wb, revenueWs, 'Doanh thu');

    // Tạo worksheet cho sách
    const booksData = [['Tên sách', 'Số lượng tồn']];
    books.forEach(book => booksData.push([book.title, book.quantity]));
    const booksWs = XLSX.utils.aoa_to_sheet(booksData);
    XLSX.utils.book_append_sheet(wb, booksWs, 'Sách');

    // Xuất file Excel
    XLSX.writeFile(wb, 'report.xlsx');
  };

  // Gọi API để lấy dữ liệu
  useEffect(() => {
    axios.get(BASE_URL + '/api/order/report/')
      .then(response => {
        setRevenue(response.data.revenue);
        setOrders(response.data.order_data);
        setBooks(response.data.books);
      })
      .catch(error => console.error(error));
  }, []);
  console.log(BASE_URL + '/api/order/report/');
  console.log(books);
  console.log(new Date());

  // Hiển thị dữ liệu và nút xuất Excel
  return (
    <div>
      <h3>Tổng doanh thu: {revenue} VNĐ</h3>
      {books && (
        <>
          <h3>Số lượng sách trong kho</h3>
          <Table striped bordered hover size="lg" style={{width: "500px", fontSize: "20px"}}>
                <thead>
                    <tr>
                        <th>Tên sách</th>
                        <th>Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book =>(
                        <tr>
                            <td>{book.title}</td>
                            <td>{book.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
      )}
      <Button variant="primary" onClick={handleExportExcel}>Xuất Excel</Button>
    </div>
  );
}

export default Report;