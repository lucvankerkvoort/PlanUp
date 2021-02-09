import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Calendar from "./Pages/Calendar";
import Login from "./Pages/Login";

const App = () => {
  const user;
  return (
    <div className="App">
      <BrowserRouter>
        {user ? (
          <Route path="/calendar" render={(props) => <Calendar {...props} />} />
        ) : (
          <Route exact path="/" render={(props) => <Login {...props} />} />
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
