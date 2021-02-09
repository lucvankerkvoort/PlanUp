import React from "react";

const LoginForm = () => {
  return (
    <div className="login-form">
      <form onSubmit={() => console.log("submit")}>
        <label forHTML="username">Username</label>
        <input type="text" id="username" onChange />
        <label forHTML="password">Password</label>
        <input type="password" id="password" />
      </form>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          console.log("submit");
        }}
      >
        Submit
      </button>
      <p>
        If you haven't registered, <a href="#">Click Here</a>
      </p>
    </div>
  );
};

export default LoginForm;
