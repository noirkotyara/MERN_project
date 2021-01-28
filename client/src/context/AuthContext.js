import { createContext } from "react";

const AuthContext = createContext({
    userId: null,
    token: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false
})

export default AuthContext;