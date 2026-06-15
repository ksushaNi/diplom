import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { check } from './http/userAPI';
import { Context } from "./index";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      user.setUser(data);
      user.setIsAuth(true);
    }).catch(() => {
      user.setIsAuth(false);
    }).finally(() => {
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <BrowserRouter> {/* Оставляем как было */}
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

/*const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
      })
      .catch((e) => {
        console.error("Auth check failed:", e)
        user.setIsAuth(false)
      })
      .finally(() => setLoading(false))
    }, 1000)
  }, [user])
  if (loading) {
    return <Spinner animation={"grow"}/>
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});*/

export default App;
