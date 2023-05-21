  import {Button} from 'react-bootstrap';
  import Col from 'react-bootstrap/Col';
  import Form from 'react-bootstrap/Form';
  import Row from 'react-bootstrap/Row';
  import React, { useState, useEffect } from 'react';
  import { useHistory } from 'react-router-dom';
  import axios from 'axios';
  import { BASE_URL } from '../../config';

  function UpdateBook({match}) {
    const { id } = match.params;
    const [book, setBook] = useState({});
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [inputQty, setInputQty] = useState(0);
    const history = useHistory();
    const [selectedFile, setSelectedFile] = useState(null);
    const [autho, setAuthor] = useState(null);
    const [categor, setCategory] = useState(null);

    useEffect(() => {
      axios.get(`${BASE_URL}/api/book/books/${id}/`)
        .then(res => {
          setBook(res.data);
        })
        .catch(err => console.log(err));
        
    }, []);

  useEffect(() => {
    fetch(BASE_URL + '/api/category/categories/')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    fetch(BASE_URL + '/api/author/authors/')
      .then((response) => response.json())
      .then((data) => {
        setAuthors(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }, []);

    const categoryOptions = categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.category_name}
      </option>
    ));


    const authorOptions = authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.author_name}
      </option>
    ));
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setBook({ ...book, [name]: value });
    };

    const handleCategoryChange = (event) => {
      const categoryId = event.target.value;
      const category = categories.find((c) => c.id === parseInt(categoryId));
      setBook({ ...book, category });
      setCategory(category);
      console.log('gggg', category.id);
    };

    const handleAuthorChange = (event) => {
      const authorId = event.target.value;
      const author = authors.find((a) => a.id === parseInt(authorId));
      setBook({ ...book, author });
      setAuthor(author);
      console.log('aaa',author.id);
    };

    const handleImageChange = (e) => {
      //setBook({ ...book, image: event.target.files[0] });
      setSelectedFile(e.target.files[0]);
    };

    const handleInputQtyChange = (event) => {
      const qty = parseInt(event.target.value);
      console.log(qty);
      const input = 0;
        if (Number.isInteger(qty)) {
          setInputQty(qty);
          setBook({ ...book, input_qty: inputQty })
        }
    };

    const handleQtyUpdate = () => {
      const newTotalQty = parseInt(book.total_qty) + parseInt(inputQty);
      const newQty = parseInt(book.qty) + parseInt(inputQty);
      setBook({ ...book, total_qty: newTotalQty, qty: newQty });
    };

    const handleSubmit = e => {
      e.preventDefault();
      const updatedBook = {
        book_name: book.book_name,
        dimensions:  book.dimensions,
        pages: book.pages,
        publication_date: book.publication_date,
        language: book.language,
        description: book.description,
        status: book.status,
        qty: book.qty,
        total_qty: book.total_qty,
        input_qty: book.input_qty,
        publisher: book.publisher,
        author: book.author ? book.author.id : null,
        category: book.category ? book.category.id : null,
      }
      if (selectedFile) {
        console.log(selectedFile);
        updatedBook['image'] = selectedFile;
      }

      console.log('that ', updatedBook);
      console.log('tac', book.author.id);
      console.log('tg', autho);
      console.log('cat', categor);
      // for (const key in book) {
      //   console.log(key, book[key]);
      //   formData.append(key, book[key]);
      // }
      
        axios
          .put(BASE_URL + '/api/book/book/' + id + '/', updatedBook, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res);
            history.push('/app/books');
          })
          .catch((err) => console.log(err));
      };

    return (
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
          <Form.Label>Tên sách</Form.Label>
          <Form.Control name="book_name" value={book.book_name} onChange={handleChange}/>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Kích thước</Form.Label>
            <Form.Control name="dimensions" value={book.dimensions} onChange={handleChange}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Số trang</Form.Label>
            <Form.Control type="number" name="pages" value={book.pages} onChange={handleChange}/>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Ngày xuất bản</Form.Label>
            <Form.Control type="date" name="publication_date" value={book.publication_date} onChange={handleChange}/>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridAddress2">
          <Form.Label>Nhà xuất bản</Form.Label>
          <Form.Control type="text" name="publisher" value={book.publisher} onChange={handleChange}/>
        </Form.Group>
        </Row>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Chọn file ảnh</Form.Label>
          <Form.Control type="file" name="image" onChange={handleImageChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control as="textarea" value={book.description} onChange={handleChange}/>
        </Form.Group>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridAddress2">
          <Form.Label>Đơn giá</Form.Label>
          <Form.Control type="number" name="unit_price" value={book.unit_price} onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridAddress2">
          <Form.Label>Số lượng tồn</Form.Label>
          <Form.Control type='number' name="qty" value={book.qty} readOnly/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridAddress2">
          <Form.Label>Số lượng nhập thêm</Form.Label>
          <Form.Control type='number' name="input_qty" min={0} value={inputQty} onChange={handleInputQtyChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridAddress2">
          <Form.Label>Tổng số lượng</Form.Label>
          <Form.Control type='number' name="total_qty" value={book.total_qty} onChange={handleChange}/>
        </Form.Group>
        
      </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Thể loại</Form.Label>
            <Form.Select name="category"
            value={book.category ? book.category.id : ''}
            onChange={handleCategoryChange}>
              <option>---Chọn thể loại---</option>
              {categoryOptions}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Tác giả</Form.Label>
            <Form.Select name="author"
            value={book.author ? book.author.id : ''}
            onChange={handleAuthorChange}>
              <option>---Chọn tác giả---</option>
              {authorOptions}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Ngôn ngữ</Form.Label>
            <Form.Control name="language" value={book.language} onChange={handleChange}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select name="status" value={book.status} onChange={handleChange}>
              <option value="IN STOCK">Còn hàng</option>
              <option value="OUT OF STOCK">Hết hàng</option>
            </Form.Select>
          </Form.Group>

        </Row>

        <Button variant="primary" type="submit">
          Lưu
        </Button>
          {" "}
        <Button variant="danger" type="reset">
          Hủy
        </Button>
        {" "}
        <Button variant="primary" type="button" onClick={handleQtyUpdate}>
          Cập nhật số lượng
        </Button>
      </Form>
    );
  }

  export default UpdateBook;