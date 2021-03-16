import React, { useState } from "react";
import blogService from "../services/blogs";

const CreateBlog = ({ errorMsg, successMsg, setBlogs, blogs, toggle }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addNewBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    };
    if (!newTitle || !newAuthor || !newUrl) {
      errorMsg("fill all fields");
    }
    toggle();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
      successMsg(`new blog ${newTitle} added`);
    });
    event.target.reset();
  };

  return (
    <form onSubmit={addNewBlog}>
      <h3>Create new</h3>
      <div>
        <label>title: </label>
        <input id="title"
          type="text"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        <label>author: </label>
        <input id='author'
          type="text"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        <label>url: </label>
        <input id='url'
        type="url" onChange={({ target }) => setNewUrl(target.value)} />
      </div>
      <pre></pre>
      <button type="submit">submit</button>
    </form>
  );
};
export default CreateBlog;
