import React from "react";

const Recommends = (props) => {
  if (!props.show) {
    return null;
  }

  let genre = props.genre;
  let books = props.allBooks;
  let genre1 = genre;
  genre !== "all"
    ? (books = books.filter((x) => x.genres.find((x) => x === genre)))
    : (genre1 = "no genre selected");

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre: </p>{" "}
      <p style={{ fontWeight: "bold" }}>{`${genre1}`}</p>
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

export default Recommends;
