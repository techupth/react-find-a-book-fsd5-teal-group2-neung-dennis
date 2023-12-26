import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // เก็บค่าการค้นหา
  const [books, setBooks] = useState([]);

  const baseURL = "https://www.googleapis.com/books/v1/volumes?q=";

  // ฟังก์ชันสำหรับการค้นหาหนังสือ
  const handleSearch = () => {
    axios.get(`${baseURL}${searchTerm}`).then((response) => {
      setBooks(response.data.items); // ตั้งค่าหนังสือที่ค้นพบใน state
    });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="App">
      <h1>Find a Book </h1>
      {/* Input field เพื่อกรอกคำค้นหา */}
      <input
        type="text"
        placeholder="Search for a book"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)} // อัพเดทค่าของการค้นหาเมื่อมีการเปลี่ยนแปลงใน input
      />
      {/* ปุ่มสำหรับเริ่มการค้นหา */}
      <button onClick={handleSearch}>Search</button>

      {/* แสดงหนังสือที่ค้นพบ */}
      <div className="books">
        {books.map((book) => (
          <div key={book.id}>
            <h2>{book.volumeInfo.title}</h2>
            {/* แสดงรายละเอียดเพิ่มเติมของหนังสือที่ค้นพบ */}
            {/* เช่น ผู้เขียน, สำนักพิมพ์, วันที่เผยแพร่, คำอธิบาย, ภาพ */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
