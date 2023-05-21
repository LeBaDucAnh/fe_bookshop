
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { BASE_URL } from "../../config";


export default function DetailBook({ match }) {
    const { id } = match.params;
    const [bookDetail, setBookDetail] = useState();
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    console.log(id);

    useEffect(() => {
        
        // Gọi API hoặc lấy dữ liệu từ database để lấy thông tin chi tiết của sách
        const fetchBookDetail = async () => {
          const book = await axios.get(BASE_URL + "/api/book/books/"+ id + '/');
          setBookDetail(book.data);
        };
        fetchBookDetail();
      }, []);
      console.log(bookDetail);
    
      if (!bookDetail) {
        return <div>Loading...</div>;
      }


    return (
        <>
            <Table striped bordered hover size="lg">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td colSpan={2}>{bookDetail.id}</td>

                    </tr>
                    <tr>
                        <th>Tên sách</th>
                        <td>{bookDetail.book_name}</td>
                    </tr>
                    <tr>
                        <th>Kích thước</th>
                        <td>{bookDetail.dimensions}</td>
                    </tr>
                    <tr>
                        <th>Số trang</th>
                        <td>{bookDetail.pages}</td>
                    </tr>
                    <tr>
                        <th>Ngày xuất bản</th>
                        <td>{bookDetail.publication_date}</td>
                    </tr>
                    <tr>
                        <th>Nhà xuất bản</th>
                        <td>{bookDetail.publisher}</td>
                    </tr>
                    <tr>
                        <th>Ngôn ngữ</th>
                        <td>{bookDetail.language}</td>
                    </tr>
                    <tr>
                        <th>Đơn giá</th>
                        <td>{bookDetail.unit_price} VNĐ</td>
                    </tr>
                    <tr>
                        <th>Trạng thái</th>
                        <td>{bookDetail.status}</td>
                    </tr>
                    <tr>
                        <th>Số lượng tồn</th>
                        <td>{bookDetail.qty}</td>
                    </tr>
                    <tr>
                        <th>Tổng số lượng</th>
                        <td>{bookDetail.total_qty}</td>
                    </tr>
                    <tr>
                        <th>Thể loại</th>
                        <td>{bookDetail.category ? bookDetail.category.category_name:''}</td>
                    </tr>
                    <tr>
                        <th>Tác giả</th>
                        <td>{bookDetail.author ? bookDetail.author.author_name:''}</td>
                    </tr>
                    <tr>
                        <th>Hình ảnh</th>
                        <td><img src={BASE_URL + bookDetail.image} alt={bookDetail.book_name} style={{ width: 100 }}/></td>
                    </tr>
                    <tr>
                        <th>Mô tả</th>
                        <td>{bookDetail.description}</td>
                    </tr>
                    <tr>
                        <th>Ngày tạo</th>
                        <td>{bookDetail.created_at}</td>
                    </tr>
                    <tr>
                        <th>Ngày cập nhật</th>
                        <td>{bookDetail.updated_at}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}
