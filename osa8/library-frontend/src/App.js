import React, { useState } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommends from "./components/Recommends";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const FilterGenres = (props) => {
  if (!props.show) {
    return null;
  }
  let books = props.allBooks;
  const allGenres = [...new Set(books.map((x) => x.genres).flat(1))];
  return (
    <div>
      {allGenres.map((x) => (
        <button key={x} onClick={() => props.setGenre(x)}>
          {x}
        </button>
      ))}
      <button onClick={() => props.setGenre("all")}>all genres</button>
    </div>
  );
};

const App = () => {
  const [genre, setGenre] = useState("all");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const resultBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  });
  const resultAuthors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });

  const [page, setPage] = useState("authors");
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      updateCacheWith(addedBook);
      window.alert(`new book ${addedBook.title} added`)
    },
  });

  if (resultAuthors.loading) {
    return <div>loading...</div>;
  }
  if (resultBooks.loading) {
    return <div>loading...</div>;
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={logout}>logout</button>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommends")}>recommends</button>
      </div>

      <Authors
        show={page === "authors"}
        allAuthors={resultAuthors.data.allAuthors}
      />

      <Books
        show={page === "books"}
        allBooks={resultBooks.data.allBooks}
        genre={genre}
      />
      <FilterGenres
        show={page === "books"}
        allBooks={resultBooks.data.allBooks}
        genre={genre}
        setGenre={setGenre}
      />
      <Recommends
        show={page === "recommends"}
        allBooks={resultBooks.data.allBooks}
        genre={genre}
      />

      <NewBook show={page === "add"} updateCacheWith={updateCacheWith} setError={notify} />
    </div>
  );
};

export default App;
