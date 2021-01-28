import "./App.scss";
import "materialize-css";
import { useState } from "react";
import { useRoutes } from "./hooks/routes";
import { useAuth } from "./hooks/auth";
import AuthContext from "./context/AuthContext";
import { Navbar } from "./components/common/Navbar";

function App() {

  const {token, userId, login, logout} = useAuth()
  const isAuthenticated = !!token
  return (
  <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
    <div className="container">
      {(isAuthenticated) && <Navbar />}
      <div className="center-align teal accent-2">Creates Links App</div>

      <div className="container center-align">{useRoutes(isAuthenticated)}</div>
    </div>
  </AuthContext.Provider>
  );
}

export default App;
