import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { DebounceInput } from "react-debounce-input";

function App() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    !search ? "" : getBook();
  }, [search]);

  async function getBook() {
    try {
      const data = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}`
      );
      setBooks(data.data.items);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <DebounceInput
        minLength={2}
        type="text"
        debounceTimeout={500}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {!books ? (
          <p>{error}</p>
        ) : (
          books.map((book, index) => {
            return <li key={index}>{book.volumeInfo.title}</li>;
          })
        )}
      </ul>
    </div>
  );
}

export default App;
