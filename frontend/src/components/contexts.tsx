import React from "react"
import { UserState } from "../utils/types";

const UserContext = React.createContext<UserState>({ isLoaded: false, isAuth: false, user: null })

export { UserContext }
