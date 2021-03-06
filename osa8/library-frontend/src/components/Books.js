import React from "react";

const Books = (props) => {
  if (!props.show) {
    return null;
  }

  let genre = props.genre;
  let books = props.allBooks;

  if (genre !== "all") {
    books = books.filter((x) => x.genres.find((x) => x === genre));
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
