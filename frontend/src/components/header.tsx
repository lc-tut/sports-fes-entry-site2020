import React, { useContext } from "react"
import { UserContext } from "./contexts"
import { Link } from "react-router-dom"

const Header: React.FC<{}> = () => {
  const authState = useContext(UserContext)

  if (!authState.isLoaded) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      authState.isAuth ?
      <div>Logging in as { authState.user!.email }</div> :
      <div>
        <Link to="/login">Login!</Link>
      </div>
    )
  }
}

export default Header
