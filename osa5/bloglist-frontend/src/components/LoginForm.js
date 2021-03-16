import React from "react";

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>Log in to application</h2>
      <label>username </label>
      <input   id='username'
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      <label>password </label>
      <input   id='password'
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button id="login-button" type="submit">login</button>
  </form>
);

export default LoginForm;
