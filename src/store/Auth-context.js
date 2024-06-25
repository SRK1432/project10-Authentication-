import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      autoLogoutHandler(); // Start auto-logout timer when token is loaded
    }
    
  }, []);
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    autoLogoutHandler(); // Restart auto-logout timer on login

  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };
  const autoLogoutHandler=()=>{
    setTimeout(()=>{
        logoutHandler()
    },5000)
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
