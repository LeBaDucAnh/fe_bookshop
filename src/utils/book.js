import axios from 'axios';

const BASE_URL = ' http://127.0.0.1:8000/api/';

export const getBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}book/books/`);
      console.log(`${BASE_URL}book/books/`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const deleteBookById = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}book/books/${id}/`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };