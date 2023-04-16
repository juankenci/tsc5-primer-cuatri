import { BrowserRouter as Router, Switch, Route, Redirect,} from "react-router-dom";
import { useMemo, useEffect, useState } from "react";
import { setToken, getToken, removeToken } from "./api/token";
import jwtDecode from "jwt-decode"

import AuthContext from "./context/AuthContext";
import MapSearchContextProvider from './context/MapSearchContext.jsx'

import Landing from "./pages/Landing";
import NotFound from "./data/carrousel";
import FormInput from "./pages/FormInput";
import Account from "./pages/Account";
import Map from "./pages/Map";

import Header from "./components/Header";

import "./styles/App.css";



const App = () => {
  const [auth, setAuth] = useState(undefined)
  const [reloadUser, setReloadUser] = useState(false)

  useEffect(() => {
    const token = getToken()
    if(token){
      setAuth({
        token,
        idUser: jwtDecode(token).user
      })
    }else{
      setAuth(null)
    }
    setReloadUser(false)
  }, [reloadUser])

 
  const login = (token ) => {
    setToken(token)
    setAuth({
      token,
      idUser: jwtDecode(token).user
    })
  }

  const logout = ()  => {
    if(auth){
      removeToken()
      setAuth(null)
    }
  }
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  )

  if(auth === undefined) return null

  return (
    <div className="app">
      <main>    
      <AuthContext.Provider value={authData}>
      <MapSearchContextProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Redirect to="/main" />
            </Route>
            <Route path="/main" component={Landing} />
            <Route path="/upload" component={FormInput} />
            <Route path="/account" component={Account} />
            <Route path="/map" component={Map} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
       </MapSearchContextProvider>
      </AuthContext.Provider>
      
      </main>
    </div>
  );
};

export default App;
