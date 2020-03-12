import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { UserContext } from "./components/contexts"
import Header from "./components/header"
import * as pages from "./pages"
import firebase from "./utils/firebase"
import { LOGIN_URL, FETCH_OPTIONS, setBodyToOption } from "./utils/options"

const App: React.FC<{}> = () => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [isAuth, setIsAuth] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      return
    } else {
      fetch(LOGIN_URL + "/_session", FETCH_OPTIONS)
        .then(res => res.json())
        .then((json: firebase.User | null) => {
          if (json) {
            setIsLoaded(true)
            setUser(json)
            setIsAuth(true)
          } else {
            firebase.auth().getRedirectResult()
              .then(result => {
                if (result.user) {
                  fetch(LOGIN_URL + "/_create", setBodyToOption(JSON.stringify(result.user)))
                    .then(res => res.json())
                    .then(_ => {
                      console.log(result.user)
                      setUser(result.user)
                      setIsAuth(true)
                    })
                    .catch(err => {
                      console.error(err)
                    })
                }
              })
              .catch(err => {
                console.error(err)
              })
              .finally(() => {
                setIsLoaded(true)
              })
            }
          })
          .catch(err => {
            console.error(err)
          })
    }
  }, [isLoaded])

  return (
    <UserContext.Provider value={{ isLoaded: isLoaded, isAuth: isAuth, user: user }}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={ pages.Top } />
          <Route exact path="/login" component={ pages.Login } />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)
