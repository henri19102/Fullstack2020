import React, { useState } from "react";
const Blog = ({ blog}) => {
  const [visible, setVisible] = useState(true);

  const hideWhenVisible = { display: visible ? "none" : "" };

  let btnLabel = "hide";

  if (visible) {
    btnLabel = "view";
  }

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div id="testing" className="blogStyle">
      <button onClick={toggleVisibility}>{btnLabel}</button>

      <p>
        BLOG: {blog.title} {blog.author}
      </p>
      <div className="testing2" style={hideWhenVisible}>
        <div>
        <p>URL: {blog.url}</p>

        <p>LIKES: {blog.likes}</p>
        <button >like</button>
        <div>
        <button >delete</button>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Blog;
