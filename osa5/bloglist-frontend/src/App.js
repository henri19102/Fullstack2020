import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import CreateBlog from "./components/CreateBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      successMsg(`Welcome ${user.name}!`);
    } catch (exception) {
      errorMsg("wrong username or password!");
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const errorMsg = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
  const successMsg = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const toggle = () => {
    blogFormRef.current.toggleVisibility();
  };

  // const testFunc = (id) =>{
  //   const blog = blogs.find(b=>b.id === id)
  //   blog.likes++
  //   console.log(blog)
  //   blogService
  //   .update(id, blog)
  //   .then(blog => {
  //     setBlogs(blogs.map(b => b.id !== id ? b : blog))
  //   })
  // }

  // const deleteBlog = async (id)=>{
    
  //   const blog = blogs.find(b=>b.id === id)
  //   await blogService.del(blog.id)
  // }



  const blogForm = () => (
    <div>
      <h2>{user.username} logged in</h2>
      <button onClick={logOut}>log out</button>
      <pre></pre>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateBlog
          errorMsg={errorMsg}
          successMsg={successMsg}
          blogs={blogs}
          setBlogs={setBlogs}
          toggle={toggle}
        />
      </Togglable>

      <BlogForm
        blogs={blogs.sort((a, b)=>b.likes-a.likes)
          .map((blog) => (<Blog key={blog.id} blog={blog}/>))}
      />
    </div>
  );

  return (
    <div>
      <h1>Blogs App</h1>
      <Notification errorM={errorMessage} successM={successMessage} />
      <div>
        {user === null ? (
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        ) : (
          blogForm()
        )}
      </div>
    </div>
  );
};

export default App;
