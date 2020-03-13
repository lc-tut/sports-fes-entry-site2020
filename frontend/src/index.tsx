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
    let ignore = false // See: L.27
    ;(async () => {
      let user: firebase.User | null
      try {
        user = await (await fetch(LOGIN_URL + "/_session", FETCH_OPTIONS)).json()
      } catch (e) {
        console.error(e)
        throw new Error("Failed to load session data")
      }
      if (user) {
        if (!ignore) {
          // 一番始めの Component かつ一回限りの実行なので Unmount 時のフラグ処理はなくてもいいかもだけど, 一応
          setUser(user)
          setIsAuth(true)
        }
      } else {
        const result = await firebase.auth().getRedirectResult()
        if (result.user) {
          try {
            await fetch(LOGIN_URL + "/_create", setBodyToOption(JSON.stringify(result.user)))
          } catch (e) {
            console.error(e)
            throw new Error("Failed to create session data")
          }
          if (!ignore) {
            // See: L.27
            setUser(result.user)
            setIsAuth(true)
          }
        }
      }
    })()
      .catch(err => { console.error(err) })
      .finally(() => {
        if (!ignore) {
          // See: L.27
          setIsLoaded(true)
        }
      })
    return () => { ignore = true } // See: L.27
  }, [])

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
