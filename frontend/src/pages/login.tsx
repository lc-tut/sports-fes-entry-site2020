import React from "react"
import firebase from "../utils/firebase"

const Login: React.FC<{}> = () => {
  const onClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  return (
    <button onClick={ onClick }>Login</button>
  )
}

export default Login
