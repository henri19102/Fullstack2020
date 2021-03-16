import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Select from "react-select";
import { EDIT_BORN } from "../queries";

const Authors = (props) => {
  const [born, setBorn] = useState("");
  const [editBorn] = useMutation(EDIT_BORN);
  const [selectedOption, setSelectedOption] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    let name = selectedOption.value;
    editBorn({ variables: { name, born } });
    setBorn("");
  };

  if (!props.show) {
    return null;
  }

  const authors = props.allAuthors;

  const options = authors.map((x) => (x = { value: x.name, label: x.name }));

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label>name</label>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          <label>born</label>
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
