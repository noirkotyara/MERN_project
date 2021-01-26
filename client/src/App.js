import "./App.scss";
import "materialize-css";
import { useState } from "react";
import { useRoutes } from "./hooks/routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="container">
      <div className="center-align teal accent-2">Creates Links App</div>

      <div className="container center-align">{useRoutes(isAuthenticated)}</div>
    </div>
  );
}

export default App;
