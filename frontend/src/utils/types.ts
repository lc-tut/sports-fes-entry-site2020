import firebase from "../utils/firebase"

export type UserState = {
  isLoaded: boolean,
  isAuth: boolean,
  user: firebase.User | null
}
