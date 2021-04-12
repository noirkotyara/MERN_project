import "./App.scss";
import "materialize-css";
import { useRoutes } from "./hooks/routes";
import { useAuth } from "./hooks/auth";
import AuthContext from "./context/AuthContext";
import { Navbar } from "./components/common/Navbar";
import Header from "./components/common/Header";

function App() {
  const {token, userId, login, logout, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
    
    return (
  <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
    <div className="container">
      {(isAuthenticated) ? <Navbar /> : <Header/>}
      <div className="container center-align">{routes}</div>
    </div>
  </AuthContext.Provider>
  );
  
  
}

export default App;
